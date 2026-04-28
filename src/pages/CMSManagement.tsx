import { useState } from 'react';
import { useCMS } from '../contexts/CMSContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

const CMSManagement = () => {
  const { cmsData, updateHero, updateAbout, updateTestimonials, updateEnquiry, updateSiteSettings } = useCMS();
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="enquiry">Enquiry</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <HeroEditor data={cmsData.hero} onSave={updateHero} saving={saving} setSaving={setSaving} />
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <AboutEditor data={cmsData.about} onSave={updateAbout} saving={saving} setSaving={setSaving} />
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <TestimonialsEditor data={cmsData.testimonials} onSave={updateTestimonials} saving={saving} setSaving={setSaving} />
        </TabsContent>

        <TabsContent value="enquiry" className="space-y-4">
          <EnquiryEditor data={cmsData.enquiry} onSave={updateEnquiry} saving={saving} setSaving={setSaving} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsEditor data={cmsData.siteSettings} onSave={updateSiteSettings} saving={saving} setSaving={setSaving} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Hero Editor Component with Image Upload
const HeroEditor = ({ data, onSave, saving, setSaving }: { data: any; onSave: any; saving: boolean; setSaving: any }) => {
  const [formData, setFormData] = useState(data);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast.success('Hero section saved to DynamoDB!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Import S3Service dynamically
      const { default: s3Service } = await import('../lib/S3Service');
      
      // Upload to S3
      const result = await s3Service.uploadImage(file, 'hero');
      
      if (result.success && result.url) {
        setFormData({ ...formData, backgroundImage: result.url });
        toast.success('Image uploaded to S3!');
        console.log('✅ Image uploaded:', result.url);
      } else {
        toast.error('Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Edit the main hero section content</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label>Background Image</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="flex-1"
              />
              <Button type="button" disabled={uploading} variant="outline">
                {uploading ? (
                  <>
                    <span className="mr-2">⏳</span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined mr-2">upload</span>
                    Upload
                  </>
                )}
              </Button>
            </div>
            {formData.backgroundImage && (
              <div className="mt-2">
                <Label>Current Image:</Label>
                <div className="mt-2 relative">
                  <img
                    src={formData.backgroundImage}
                    alt="Hero background"
                    className="w-full max-w-md h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                    }}
                  />
                  <a
                    href={formData.backgroundImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs hover:bg-gray-100"
                  >
                    Open in new tab ↗
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Image URL: {formData.backgroundImage}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Badge Text</Label>
              <Input value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Title</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <Label>Subtitle</Label>
            <textarea
              className="w-full min-h-[80px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary Button Text</Label>
              <Input value={formData.primaryButtonText} onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })} />
            </div>
            <div>
              <Label>Secondary Button Text</Label>
              <Input value={formData.secondaryButtonText} onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })} />
            </div>
          </div>
          <Button type="submit" disabled={saving || uploading}>
            {saving ? (
              <>
                <span className="mr-2">⏳</span>
                Saving to DynamoDB...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined mr-2">save</span>
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// About Editor Component
const AboutEditor = ({ data, onSave, saving, setSaving }: { data: any; onSave: any; saving: boolean; setSaving: any }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast.success('About section saved to DynamoDB!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>Edit about section content and features</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Badge</Label>
              <Input value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Title</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <Label>Subtitle</Label>
            <textarea
              className="w-full min-h-[80px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <span className="mr-2">⏳</span>
                Saving to DynamoDB...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined mr-2">save</span>
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Testimonials Editor
const TestimonialsEditor = ({ data, onSave, saving, setSaving }: { data: any; onSave: any; saving: boolean; setSaving: any }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast.success('Testimonials saved to DynamoDB!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials Section</CardTitle>
        <CardDescription>Manage customer testimonials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Badge</Label>
            <Input value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} />
          </div>
          <div>
            <Label>Title</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <span className="mr-2">⏳</span>
                Saving to DynamoDB...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined mr-2">save</span>
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Enquiry Editor
const EnquiryEditor = ({ data, onSave, saving, setSaving }: { data: any; onSave: any; saving: boolean; setSaving: any }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast.success('Enquiry section saved to DynamoDB!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enquiry Section</CardTitle>
        <CardDescription>Edit enquiry form content</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Badge</Label>
              <Input value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} />
            </div>
            <div>
              <Label>Background Image</Label>
              <Input value={formData.backgroundImage} onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Title</Label>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div>
            <Label>Subtitle</Label>
            <textarea
              className="w-full min-h-[80px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <span className="mr-2">⏳</span>
                Saving to DynamoDB...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined mr-2">save</span>
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Settings Editor
const SettingsEditor = ({ data, onSave, saving, setSaving }: { data: any; onSave: any; saving: boolean; setSaving: any }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast.success('Site settings saved to DynamoDB!');
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Manage general site settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Site Name</Label>
            <Input value={formData.siteName} onChange={(e) => setFormData({ ...formData, siteName: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact Email</Label>
              <Input value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} />
            </div>
            <div>
              <Label>Contact Phone</Label>
              <Input value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <textarea
              className="w-full min-h-[80px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <span className="mr-2">⏳</span>
                Saving to DynamoDB...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined mr-2">save</span>
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CMSManagement;
