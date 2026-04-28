import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import S3Service from '../lib/S3Service';
import BulkImageUpload from '../components/BulkImageUpload';
import HOMEPAGE_IMAGES, { type HomePageImageConfig } from '../data/homepageImages';

// Image data structure
interface HomePageImage {
  id: string;
  section: string;
  description: string;
  currentUrl: string;
  uploadedUrl?: string;
  s3Key?: string;
  isUploaded: boolean;
}

// Convert config to local state format
const convertToState = (config: HomePageImageConfig): HomePageImage => ({
  id: config.id,
  section: config.section,
  description: config.description,
  currentUrl: config.url,
  isUploaded: false
});

const ImageManagement = () => {
  const [images, setImages] = useState<HomePageImage[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  useEffect(() => {
    // Load images from localStorage or use default
    const stored = localStorage.getItem('agrofeed_homepage_images');
    if (stored) {
      setImages(JSON.parse(stored));
    } else {
      const initialImages = HOMEPAGE_IMAGES.map(convertToState);
      setImages(initialImages);
      localStorage.setItem('agrofeed_homepage_images', JSON.stringify(initialImages));
    }
  }, []);

  // Get unique sections
  const sections = ['all', ...Array.from(new Set(images.map(img => img.section)))];

  // Filter images
  const filteredImages = images.filter(img => {
    const matchesSearch = img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'all' || img.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  // Handle file upload
  const handleUpload = async (imageId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload JPEG, PNG, GIF, or WebP images only.'
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: 'Maximum file size is 5MB.'
      });
      return;
    }

    setUploadingId(imageId);

    try {
      // Upload to S3
      const result = await S3Service.uploadImage(file, 'hero');
      
      // Update image record
      const updatedImages = images.map(img => 
        img.id === imageId 
          ? { ...img, uploadedUrl: result.url, s3Key: result.key, isUploaded: true }
          : img
      );
      
      setImages(updatedImages);
      localStorage.setItem('agrofeed_homepage_images', JSON.stringify(updatedImages));
      
      toast.success('Image uploaded successfully!', {
        description: `${file.name} has been uploaded to S3.`
      });
    } catch (error: any) {
      toast.error('Upload failed', {
        description: error.message || 'An error occurred during upload.'
      });
    } finally {
      setUploadingId(null);
      // Reset file input
      event.target.value = '';
    }
  };

  // Handle delete
  const handleDelete = async (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image?.s3Key) return;

    try {
      await S3Service.deleteImage(image.s3Key);
      
      const updatedImages = images.map(img => 
        img.id === imageId 
          ? { ...img, uploadedUrl: undefined, s3Key: undefined, isUploaded: false }
          : img
      );
      
      setImages(updatedImages);
      localStorage.setItem('agrofeed_homepage_images', JSON.stringify(updatedImages));
      
      toast.success('Image deleted', {
        description: 'The image has been removed from S3.'
      });
    } catch (error: any) {
      toast.error('Delete failed', {
        description: error.message || 'An error occurred during deletion.'
      });
    }
  };

  // Handle bulk upload status
  const uploadedCount = images.filter(img => img.isUploaded).length;
  const progress = Math.round((uploadedCount / images.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Homepage Image Management</h2>
          <p className="text-sm text-muted-foreground">
            Upload and manage all images from the homepage to S3
          </p>
        </div>

        {/* Bulk Upload Script */}
        <BulkImageUpload
          onUploadComplete={(results) => {
            console.log('📊 Bulk upload complete:', results.length, 'results');
            
            // Update local state with upload results
            const updatedImages = images.map(img => {
              const result = results.find(r => r.id === img.id);
              if (result && result.status === 'success') {
                return {
                  ...img,
                  uploadedUrl: result.s3Url,
                  s3Key: result.s3Key,
                  isUploaded: true
                };
              }
              return img;
            });
            setImages(updatedImages);
            localStorage.setItem('agrofeed_homepage_images', JSON.stringify(updatedImages));
            
            // ALSO update hero slides for the first image (hero)
            const heroResult = results.find(r => r.id === 'hero-main');
            if (heroResult && heroResult.status === 'success') {
              console.log('🦸 Updating hero slides with uploaded image');
              const existingSlides = JSON.parse(localStorage.getItem('agrofeed_hero_slides') || '[]');
              
              if (existingSlides.length > 0) {
                // Update first slide with uploaded image
                existingSlides[0] = {
                  ...existingSlides[0],
                  imageUrl: heroResult.s3Url,
                  s3Key: heroResult.s3Key,
                  isUploaded: true
                };
              } else {
                // Create first slide
                existingSlides.push({
                  id: 'slide-1',
                  headline: 'Nurturing the Global Harvest.',
                  description: 'We bridge the distance between origin and table through sophisticated logistics and uncompromising standards of agricultural curation.',
                  tagline: 'Established 1984 — Global Curators',
                  button1Text: 'View Portfolios',
                  button1Link: '/products',
                  button2Text: 'Our Reach',
                  button2Link: '/about',
                  imageUrl: heroResult.s3Url,
                  s3Key: heroResult.s3Key,
                  isActive: true,
                  order: 1
                });
              }
              
              localStorage.setItem('agrofeed_hero_slides', JSON.stringify(existingSlides));
              console.log('✅ Hero slides updated!');
            }
            
            toast.success('Images uploaded and saved!', {
              description: 'Refresh homepage to see changes.'
            });
          }}
        />

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Upload Progress</span>
              <span className="text-sm text-muted-foreground">
                {uploadedCount} of {images.length} images uploaded ({progress}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white"
        >
          {sections.map(section => (
            <option key={section} value={section}>
              {section === 'all' ? 'All Sections' : section}
            </option>
          ))}
        </select>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className={`overflow-hidden ${image.isUploaded ? 'border-green-200' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-sm">{image.id}</CardTitle>
                  <CardDescription className="text-xs">
                    {image.section}
                  </CardDescription>
                </div>
                <Badge variant={image.isUploaded ? 'default' : 'secondary'}>
                  {image.isUploaded ? 'Uploaded' : 'Pending'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image.uploadedUrl || image.currentUrl}
                  alt={image.description}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground">{image.description}</p>

              {/* Actions */}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(image.id, e)}
                    disabled={uploadingId === image.id}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={uploadingId === image.id}
                  >
                    {uploadingId === image.id ? (
                      <>
                        <span className="material-symbols-outlined h-4 w-4 mr-2 animate-spin">progress_activity</span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined h-4 w-4 mr-2">upload</span>
                        {image.isUploaded ? 'Replace' : 'Upload'}
                      </>
                    )}
                  </Button>
                </label>
                {image.isUploaded && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined h-4 w-4">delete</span>
                  </Button>
                )}
              </div>

              {/* S3 Key */}
              {image.s3Key && (
                <div className="text-xs text-muted-foreground break-all">
                  <span className="font-medium">S3 Key:</span> {image.s3Key}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No images found matching your search.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageManagement;
