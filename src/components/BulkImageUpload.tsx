import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import S3Service from '../lib/S3Service';
import HOMEPAGE_IMAGES, { type HomePageImageConfig } from '../data/homepageImages';

interface UploadStatus {
  id: string;
  name: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  s3Key?: string;
  s3Url?: string;
}

interface BulkUploadProps {
  onUploadComplete?: (results: UploadStatus[]) => void;
}

const BulkImageUpload: React.FC<BulkUploadProps> = ({ onUploadComplete }) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  // Initialize upload status
  const initializeStatus = () => {
    return HOMEPAGE_IMAGES.map(img => ({
      id: img.id,
      name: img.name,
      status: 'pending' as const,
      progress: 0
    }));
  };

  // Download image from URL and convert to Blob
  const downloadImage = async (url: string): Promise<Blob> => {
    try {
      // Use a proxy or direct fetch - for Google URLs we need to fetch as blob
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  };

  // Upload single image
  const uploadImage = async (image: HomePageImageConfig): Promise<UploadStatus> => {
    try {
      // Download the image
      const blob = await downloadImage(image.url);
      
      // Create a File object from the blob
      const file = new File([blob], image.name, {
        type: blob.type || 'image/jpeg'
      });

      // Upload to S3 - all in hero folder
      const result = await S3Service.uploadImage(file, 'hero');

      return {
        id: image.id,
        name: image.name,
        status: 'success',
        progress: 100,
        s3Key: result.key,
        s3Url: result.url
      };
    } catch (error: any) {
      console.error(`Upload error for ${image.name}:`, error);
      return {
        id: image.id,
        name: image.name,
        status: 'error',
        progress: 0,
        error: error.message || 'Upload failed'
      };
    }
  };

  // Start bulk upload
  const startBulkUpload = async () => {
    setIsUploading(true);
    setUploadStatus(initializeStatus());
    setOverallProgress(0);

    const results: UploadStatus[] = [];
    let completed = 0;

    // Process images in batches of 3 to avoid overwhelming the browser
    const batchSize = 3;
    for (let i = 0; i < HOMEPAGE_IMAGES.length; i += batchSize) {
      const batch = HOMEPAGE_IMAGES.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (image) => {
        // Update status to uploading
        setUploadStatus(prev => 
          prev.map(s => 
            s.id === image.id 
              ? { ...s, status: 'uploading' as const, progress: 50 }
              : s
          )
        );

        // Upload the image
        const result = await uploadImage(image);
        results.push(result);

        // Update status with result
        setUploadStatus(prev => 
          prev.map(s => s.id === image.id ? result : s)
        );

        completed++;
        setOverallProgress(Math.round((completed / HOMEPAGE_IMAGES.length) * 100));
      });

      await Promise.all(batchPromises);
    }

    setIsUploading(false);
    
    // Count results
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    if (successCount === HOMEPAGE_IMAGES.length) {
      toast.success('All images uploaded successfully!', {
        description: `${successCount} images have been uploaded to S3.`
      });
    } else {
      toast.warning('Bulk upload completed with some errors', {
        description: `${successCount} succeeded, ${errorCount} failed`
      });
    }

    if (onUploadComplete) {
      onUploadComplete(results);
    }
  };

  // Get status counts
  const successCount = uploadStatus.filter(s => s.status === 'success').length;
  const errorCount = uploadStatus.filter(s => s.status === 'error').length;
  const pendingCount = uploadStatus.filter(s => s.status === 'pending').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Bulk Upload Script</CardTitle>
            <CardDescription>
              Automatically download and upload all {HOMEPAGE_IMAGES.length} homepage images to S3
            </CardDescription>
          </div>
          <Button 
            onClick={startBulkUpload} 
            disabled={isUploading}
            className="bg-[#00450d] hover:bg-[#0c5216]"
          >
            {isUploading ? (
              <>
                <span className="material-symbols-outlined mr-2 animate-spin">progress_activity</span>
                Uploading...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined mr-2">cloud_upload</span>
                Start Bulk Upload
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        {isUploading || uploadStatus.length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            
            <div className="flex gap-4 mt-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                ✅ {successCount} Success
              </Badge>
              <Badge variant="destructive" className={errorCount === 0 ? 'opacity-0' : ''}>
                ❌ {errorCount} Failed
              </Badge>
              <Badge variant="secondary">
                ⏳ {pendingCount} Pending
              </Badge>
            </div>
          </div>
        ) : null}

        {/* Individual Status List */}
        {uploadStatus.length > 0 && (
          <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-4">
            {uploadStatus.map((status) => (
              <div 
                key={status.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-3 flex-1">
                  {status.status === 'success' && (
                    <span className="text-green-600">✅</span>
                  )}
                  {status.status === 'error' && (
                    <span className="text-red-600">❌</span>
                  )}
                  {status.status === 'uploading' && (
                    <span className="text-blue-600 animate-spin">🔄</span>
                  )}
                  {status.status === 'pending' && (
                    <span className="text-gray-400">⏳</span>
                  )}
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium">{status.name}</p>
                    {status.error && (
                      <p className="text-xs text-red-600">{status.error}</p>
                    )}
                    {status.s3Key && (
                      <p className="text-xs text-muted-foreground">
                        📁 {status.s3Key}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {status.progress}%
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Note:</strong> This script will download all images from their current URLs 
            and upload them to your S3 bucket under the folder structure: 
            <code className="bg-blue-100 px-2 py-1 rounded ml-2">{'{section}'}/{'{filename}'}</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkImageUpload;
