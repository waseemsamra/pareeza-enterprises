import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
}

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      // For now, use sample data (you can connect to API later)
      const sampleEnquiries: Enquiry[] = [
        {
          id: 1,
          name: 'John Farmer',
          email: 'john@farmco.com',
          phone: '+1 (555) 123-4567',
          product: 'Hay Products',
          message: 'I would like to know more about your hay products and pricing.',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Sarah Smith',
          email: 'sarah@dairy.com',
          phone: '+1 (555) 234-5678',
          product: 'Alfalfa Products',
          message: 'Looking for bulk alfalfa pellets for my dairy farm.',
          status: 'contacted',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike@ranch.com',
          phone: '+1 (555) 345-6789',
          product: 'Grain & Silage',
          message: 'Need regular supply of grain mix for my livestock.',
          status: 'completed',
          createdAt: new Date().toISOString()
        }
      ];
      
      setEnquiries(sampleEnquiries);
      toast.success('Enquiries loaded!');
    } catch (error: any) {
      console.error('Error loading enquiries:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id: number, newStatus: 'pending' | 'contacted' | 'completed') => {
    try {
      // Update status in state (you can connect to API later)
      setEnquiries(enquiries.map(e => 
        e.id === id ? { ...e, status: newStatus } : e
      ));
      toast.success(`Status updated to ${newStatus}!`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      setEnquiries(enquiries.filter(e => e.id !== id));
      toast.success('Enquiry deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => e.status === 'pending').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    completed: enquiries.filter(e => e.status === 'completed').length
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Enquiry Management</h2>
        <p className="text-gray-500">Manage customer enquiries and leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-gray-500">Total Enquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{stats.contacted}</div>
            <p className="text-sm text-gray-500">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-sm text-gray-500">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">search</span>
          <Input
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="text-center py-8">
          <p>Loading enquiries...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined w-5 h-5 text-blue-600">person</span>
                    </div>
                    <div>
                      <CardTitle>{enquiry.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined w-5 h-5 text-blue-600">mail</span>
                          {enquiry.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined w-5 h-5 text-blue-600">phone</span>
                          {enquiry.phone}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(enquiry.status)}>
                    {enquiry.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined w-5 h-5 text-blue-600">chat</span>
                  <span className="font-medium">{enquiry.product}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{enquiry.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value as any)}
                      className="px-2 py-1 border rounded text-sm focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(enquiry)}
                    >
                      <span className="material-symbols-outlined">visibility</span>
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(enquiry.id)}
                    >
                      <span className="material-symbols-outlined h-3 w-3 mr-1 text-red-600">delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Enquiry Details</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  <span className="material-symbols-outlined">close</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Customer Information</Label>
                <div className="mt-2 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined w-5 h-5 text-blue-600">person</span>
                    <strong>Name:</strong> {selectedEnquiry.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined w-5 h-5 text-blue-600">mail</span>
                    <strong>Email:</strong> {selectedEnquiry.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined w-5 h-5 text-blue-600">phone</span>
                    <strong>Phone:</strong> {selectedEnquiry.phone}
                  </p>
                </div>
              </div>

              <div>
                <Label>Enquiry Details</Label>
                <div className="mt-2 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined w-5 h-5 text-blue-600">chat</span>
                    <strong>Product:</strong> {selectedEnquiry.product}
                  </p>
                  <p className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedEnquiry.status)}>
                      Status: {selectedEnquiry.status}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <Label>Message</Label>
                <p className="mt-2 p-3 bg-gray-50 rounded-lg">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <Label>Actions</Label>
                <div className="mt-2 flex gap-2">
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-center hover:bg-primary/90"
                  >
                    Send Email
                  </a>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  className="flex-1"
                  onClick={() => {
                    handleStatusChange(selectedEnquiry.id, 'contacted');
                    setIsModalOpen(false);
                  }}
                >
                  Mark as Contacted
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnquiryManagement;
