import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings, 
  Building2, 
  LogOut,
  TrendingUp,
  DollarSign,
  ClipboardList,
  Truck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    toast.success('Logged out', {
      description: 'You have been successfully logged out.',
    });
  };

  const stats = [
    {
      title: 'Total Orders',
      value: '12',
      change: '+2 this month',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Spent',
      value: '$24,500',
      change: '+15% from last month',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Quotes',
      value: '3',
      change: '1 pending review',
      icon: FileText,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Products Saved',
      value: '8',
      change: '+3 this week',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', product: 'Alfalfa Hay Bales', quantity: '500 units', status: 'Delivered', date: 'Mar 15, 2026', amount: '$4,500' },
    { id: 'ORD-002', product: 'Corn Silage', quantity: '200 kg', status: 'In Transit', date: 'Mar 18, 2026', amount: '$1,800' },
    { id: 'ORD-003', product: 'Timothy Hay', quantity: '300 units', status: 'Processing', date: 'Mar 19, 2026', amount: '$3,200' },
    { id: 'ORD-004', product: 'Grain Mix Premium', quantity: '150 kg', status: 'Pending', date: 'Mar 20, 2026', amount: '$950' },
  ];

  const savedProducts = [
    { name: 'Alfalfa Hay Bales', category: 'Hay', price: '$9.00/unit', image: '/product-hay.jpg' },
    { name: 'Corn Silage', category: 'Silage', price: '$9.00/kg', image: '/detail-silage.jpg' },
    { name: 'Timothy Hay Premium', category: 'Hay', price: '$10.67/unit', image: '/detail-timothy.jpg' },
    { name: 'Grain Mix Premium', category: 'Grain', price: '$6.33/kg', image: '/product-grain.jpg' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-amber-100 text-amber-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="section-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-dark">Dashboard</h1>
              <Badge variant="outline" className="hidden sm:flex">
                {user?.company || 'Individual Account'}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-primary">
                Browse Products
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="section-padding py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-muted-foreground">
            Manage your orders, quotes, and account settings from one place.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="saved">Saved Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Your latest order activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Truck className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{order.product}</p>
                            <p className="text-sm text-muted-foreground">{order.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <p className="text-sm font-medium mt-1">{order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/products">View All Orders</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                      <Link to="/products">
                        <span className="material-symbols-outlined">package</span>
                        <span>Browse Products</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                      <Link to="/contact">
                        <span className="material-symbols-outlined w-5 h-5 text-blue-600">mail</span>
                        <span>Request Quote</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                      <Link to="/contact">
                        <FileText className="h-6 w-6" />
                        <span>Submit Inquiry</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                      <Link to="#">
                        <Settings className="h-6 w-6" />
                        <span>Preferences</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track all your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.product}</td>
                          <td className="py-3 px-4">{order.quantity}</td>
                          <td className="py-3 px-4 font-medium">{order.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Products</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {savedProducts.map((product, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <span className="material-symbols-outlined">package</span>
                      </div>
                      <div className="p-4">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-primary font-semibold mt-2">{product.price}</p>
                        <Button className="w-full mt-3" size="sm" asChild>
                          <Link to="/products">Add to Cart</Link>
                        </Button>
                      </div>
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
                  <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined w-5 h-5 text-blue-600">person</span>
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-muted-foreground">{user?.name}</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <p className="text-muted-foreground">{user?.company || 'Not specified'}</p>
                  </div>
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Information
                  </CardTitle>
                  <CardDescription>Manage your business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Business Type</label>
                    <p className="text-muted-foreground">Agricultural Producer</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <p className="text-muted-foreground">Not specified</p>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium">Tax ID</label>
                    <p className="text-muted-foreground">Not provided</p>
                  </div>
                  <Button variant="outline" className="w-full">Update Business Info</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
