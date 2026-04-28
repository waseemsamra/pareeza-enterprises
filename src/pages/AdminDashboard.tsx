import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import CMSManagement from './CMSManagement';
import ImageManagement from './ImageManagement';

// Product interface
interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  detailImage: string;
  items: string[];
  features: string[];
  category: string;
}

// Initial products data
const initialProducts: Product[] = [
  {
    id: 'hay',
    title: 'Hay Products',
    subtitle: 'Premium Grass Hays',
    description: 'Premium Rhodes Grass, Timothy Hay, and Rye Grass for optimal livestock nutrition.',
    image: '/product-hay.jpg',
    detailImage: '/detail-timothy.jpg',
    items: ['Rhodes Grass', 'Timothy Hay', 'Rye Grass'],
    features: ['High Fiber Content', 'Low NSC', 'Excellent Palatability'],
    category: 'hay',
  },
  {
    id: 'alfalfa',
    title: 'Alfalfa Products',
    subtitle: 'Protein-Rich Feed',
    description: 'High-protein alfalfa hay and pellets, perfect for dairy cattle and horses.',
    image: '/product-alfalfa.jpg',
    detailImage: '/product-alfalfa.jpg',
    items: ['Alfalfa Hay', 'Alfalfa Pellets', 'Alfalfa Meal'],
    features: ['18-22% Protein', 'High Calcium', 'Rich in Vitamins'],
    category: 'alfalfa',
  },
  {
    id: 'straw',
    title: 'Straw Products',
    subtitle: 'Quality Bedding & Feed',
    description: 'Quality wheat and barley straw for bedding and feed supplementation.',
    image: '/product-straw.jpg',
    detailImage: '/product-straw.jpg',
    items: ['Wheat Straw', 'Barley Straw', 'Oat Straw'],
    features: ['Excellent Bedding', 'High Absorption', 'Low Dust'],
    category: 'straw',
  },
  {
    id: 'grain',
    title: 'Grain & Silage',
    subtitle: 'High-Energy Feed',
    description: 'Nutrient-rich grain products and fermented silage for maximum energy.',
    image: '/product-grain.jpg',
    detailImage: '/detail-silage.jpg',
    items: ['Corn Silage', 'Grain Mix', 'Fermented Feed'],
    features: ['High Energy', 'Fermented', 'Year-Round Available'],
    category: 'grain',
  },
  {
    id: 'pellets',
    title: 'Pellets & Capsules',
    subtitle: 'Convenient Nutrition',
    description: 'Convenient compressed feed pellets and nutritional capsules.',
    image: '/product-pellets.jpg',
    detailImage: '/product-pellets.jpg',
    items: ['Feed Pellets', 'Nutritional Capsules', 'Supplement Pellets'],
    features: ['Minimal Waste', 'Easy Storage', 'Consistent Nutrition'],
    category: 'pellets',
  },
];

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Testimonials state
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'John Farmer', role: 'Dairy Farm Owner', content: 'Best quality hay we have ever purchased.', rating: 5, avatar: 'JF' },
    { id: 2, name: 'Sarah Smith', role: 'Horse Trainer', content: 'Reliable delivery and excellent service.', rating: 5, avatar: 'SS' },
    { id: 3, name: 'Mike Johnson', role: 'Livestock Rancher', content: 'Our livestock loves their products.', rating: 5, avatar: 'MJ' },
  ]);
  const [editingTestimonial, setEditingTestimonial] = useState<typeof testimonials[0] | null>(null);

  // Load products from localStorage or use initial
  useEffect(() => {
    const storedProducts = localStorage.getItem('agrofeed_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('agrofeed_products', JSON.stringify(initialProducts));
    }
  }, []);

  // Check admin access
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access Denied', {
        description: 'You do not have admin privileges.',
      });
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out', {
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  // Product CRUD operations
  const handleAddProduct = () => {
    setEditingProduct({
      id: `product-${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      image: '',
      detailImage: '',
      items: [],
      features: [],
      category: '',
    });
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('agrofeed_products', JSON.stringify(updatedProducts));
    toast.success('Product deleted', {
      description: 'The product has been removed successfully.',
    });
  };

  const handleSaveProduct = (product: Product) => {
    const existingIndex = products.findIndex(p => p.id === product.id);
    let updatedProducts;

    if (existingIndex >= 0) {
      updatedProducts = [...products];
      updatedProducts[existingIndex] = product;
    } else {
      updatedProducts = [...products, product];
    }

    setProducts(updatedProducts);
    localStorage.setItem('agrofeed_products', JSON.stringify(updatedProducts));
    toast.success('Product saved', {
      description: 'The product has been updated successfully.',
    });
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Testimonial operations
  const handleSaveTestimonial = (testimonial: typeof testimonials[0]) => {
    const existingIndex = testimonials.findIndex(t => t.id === testimonial.id);
    let updatedTestimonials;

    if (existingIndex >= 0) {
      updatedTestimonials = [...testimonials];
      updatedTestimonials[existingIndex] = testimonial;
    } else {
      updatedTestimonials = [...testimonials, { ...testimonial, id: Date.now(), avatar: testimonial.name.split(' ').map(n => n[0]).join('') }];
    }

    setTestimonials(updatedTestimonials);
    localStorage.setItem('agrofeed_testimonials', JSON.stringify(updatedTestimonials));
    toast.success('Testimonial saved');
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: number) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem('agrofeed_testimonials', JSON.stringify(updated));
    toast.success('Testimonial deleted');
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Total Products', value: products.length, icon: 'package', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Total Orders', value: '12', change: '+2 this month', icon: 'shopping_cart', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Total Revenue', value: '$24,500', change: '+15% from last month', icon: 'payments', color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Active Quotes', value: '3', change: '1 pending review', icon: 'description', color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { title: 'Customer Reviews', value: testimonials.length.toString(), icon: 'star', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { title: 'Total Users', value: '156', change: '+12 this week', icon: 'people', color: 'text-pink-600', bgColor: 'bg-pink-100' },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="section-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <span className="material-symbols-outlined">arrow_back</span>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-dark">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage products, content, and settings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                {user?.company || 'AgroFeed Admin'}
              </Badge>
              <Badge className="bg-primary">Admin</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <span className="material-symbols-outlined mr-2">logout</span>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="section-padding py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <span className={`material-symbols-outlined h-4 w-4 ${stat.color}`}>{stat.icon}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{stat.value}</div>
                {stat.change && <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 mt-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-6">
            <TabsTrigger value="cms">CMS</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="cms" className="space-y-4">
            <CMSManagement />
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <ImageManagement />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Add, edit, or remove products from your catalog</CardDescription>
                  </div>
                  <Button onClick={handleAddProduct}>
                    <span className="material-symbols-outlined mr-2">add</span>
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="relative mb-4">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">search</span>
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium">Items</th>
                        <th className="text-left py-3 px-4 font-medium">Features</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium">{product.title}</p>
                                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{product.category}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{product.items.length} items</td>
                          <td className="py-3 px-4 text-sm">{product.features.length} features</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                <span className="material-symbols-outlined h-4 w-4">edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                                <span className="material-symbols-outlined h-4 w-4 text-red-600">delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Testimonials Management</CardTitle>
                    <CardDescription>Manage customer reviews and testimonials</CardDescription>
                  </div>
                  <Button onClick={() => setEditingTestimonial({ id: Date.now(), name: '', role: '', content: '', rating: 5, avatar: '' })}>
                    <span className="material-symbols-outlined mr-2">add</span>
                    Add Testimonial
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-amber-500">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{testimonial.content}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingTestimonial(testimonial)}>
                          <span className="material-symbols-outlined h-3 w-3 mr-1">edit</span>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                          <span className="material-symbols-outlined h-3 w-3 mr-1 text-red-600">delete</span>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and track customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'ORD-001', customer: 'John Smith', product: 'Alfalfa Hay Bales', quantity: '500 units', status: 'Delivered', amount: '$4,500' },
                    { id: 'ORD-002', customer: 'Sarah Johnson', product: 'Corn Silage', quantity: '200 kg', status: 'In Transit', amount: '$1,800' },
                    { id: 'ORD-003', customer: 'Mike Williams', product: 'Timothy Hay', quantity: '300 units', status: 'Processing', amount: '$3,200' },
                    { id: 'ORD-004', customer: 'Emily Davis', product: 'Grain Mix Premium', quantity: '150 kg', status: 'Pending', amount: '$950' },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="material-symbols-outlined h-5 w-5 text-blue-600">shopping_cart</span>
                        </div>
                        <div>
                          <p className="font-medium">{order.product}</p>
                          <p className="text-sm text-muted-foreground">{order.customer} • {order.quantity}</p>
                        </div>
                      </div>
                      <Badge className={
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }>{order.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Configure your website settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Site Name</Label>
                    <Input defaultValue="AgroFeed" />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input defaultValue="info@agrofeed.com" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button className="w-full">
                    <span className="material-symbols-outlined mr-2">save</span>
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Profile</CardTitle>
                  <CardDescription>Update your admin profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input defaultValue={user?.name} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={user?.email} disabled />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input defaultValue={user?.company} />
                  </div>
                  <Separator />
                  <div>
                    <Label>New Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Leave blank to keep current" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        <span className="material-symbols-outlined h-4 w-4">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                  <Button className="w-full">
                    <span className="material-symbols-outlined mr-2">save</span>
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Modal */}
      {isProductModalOpen && editingProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      {/* Testimonial Modal */}
      {editingTestimonial && (
        <TestimonialModal
          testimonial={editingTestimonial}
          onClose={() => setEditingTestimonial(null)}
          onSave={handleSaveTestimonial}
        />
      )}
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ product, onClose, onSave }: { product: Product; onClose: () => void; onSave: (p: Product) => void }) => {
  const [formData, setFormData] = useState<Product>(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{product.id ? 'Edit Product' : 'Add Product'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Product Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 border rounded-lg"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <span className="material-symbols-outlined mr-2">save</span>
                Save Product
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Testimonial Modal Component
const TestimonialModal = ({ testimonial, onClose, onSave }: { testimonial: any; onClose: () => void; onSave: (t: any) => void }) => {
  const [formData, setFormData] = useState(testimonial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{testimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <Label>Role</Label>
              <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
            </div>
            <div>
              <Label>Content</Label>
              <textarea
                className="w-full min-h-[100px] px-3 py-2 border rounded-lg"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-2xl ${star <= formData.rating ? 'text-amber-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <span className="material-symbols-outlined mr-2">save</span>
                Save Testimonial
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
