import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Search, Mail, Calendar, Filter, X, Download, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: any;
  status: 'active' | 'unsubscribed';
  source: string;
}

const NewsletterSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    filterSubscriptions();
  }, [subscriptions, searchTerm, statusFilter, sourceFilter]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const subscriptionsQuery = query(
        collection(db, 'newsletterSubscriptions'), 
        orderBy('subscribedAt', 'desc')
      );
      const querySnapshot = await getDocs(subscriptionsQuery);
      const subscriptionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsletterSubscription[];
      setSubscriptions(subscriptionsData);
    } catch (error) {
      console.error("Error fetching newsletter subscriptions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch newsletter subscriptions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSubscriptions = () => {
    let filtered = [...subscriptions];

    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.source?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter(sub => sub.source === sourceFilter);
    }

    setFilteredSubscriptions(filtered);
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Are you sure you want to delete subscription for ${email}?`)) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'newsletterSubscriptions', id));
      toast({
        title: "Success",
        description: "Newsletter subscription deleted successfully"
      });
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'active' | 'unsubscribed') => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'newsletterSubscriptions', id), {
        status: newStatus
      });
      toast({
        title: "Success",
        description: `Subscription status updated to ${newStatus}`
      });
      fetchSubscriptions();
    } catch (error) {
      console.error("Error updating subscription status:", error);
      toast({
        title: "Error",
        description: "Failed to update subscription status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Status', 'Source', 'Subscribed Date'],
      ...filteredSubscriptions.map(sub => [
        sub.email,
        sub.status,
        sub.source,
        sub.subscribedAt?.toDate ? sub.subscribedAt.toDate().toLocaleDateString() : 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSourceFilter('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (statusFilter !== 'all') count++;
    if (sourceFilter !== 'all') count++;
    return count;
  };

  const formatDate = (date: any) => {
    if (!date?.toDate) return 'N/A';
    return date.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const uniqueSources = [...new Set(subscriptions.map(sub => sub.source))].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Newsletter Subscriptions</h1>
          <p className="text-muted-foreground">Manage newsletter subscribers</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{subscriptions.length}</div>
                <div className="text-sm text-muted-foreground">Total Subscribers</div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {subscriptions.filter(s => s.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {subscriptions.filter(s => s.status === 'unsubscribed').length}
                </div>
                <div className="text-sm text-muted-foreground">Unsubscribed</div>
              </div>
              <X className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </div>
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({subscriptions.length})</SelectItem>
                <SelectItem value="active">
                  Active ({subscriptions.filter(s => s.status === 'active').length})
                </SelectItem>
                <SelectItem value="unsubscribed">
                  Unsubscribed ({subscriptions.filter(s => s.status === 'unsubscribed').length})
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Source Filter */}
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {uniqueSources.map(source => (
                  <SelectItem key={source} value={source}>
                    {source} ({subscriptions.filter(s => s.source === source).length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
        {getActiveFiltersCount() > 0 && <span className="ml-1">(filtered)</span>}
      </div>

      {/* Subscriptions List */}
      {loading && subscriptions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p>Loading newsletter subscriptions...</p>
          </CardContent>
        </Card>
      ) : filteredSubscriptions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                {subscriptions.length === 0 ? 'No subscriptions yet' : 'No subscriptions found'}
              </div>
              <p className="text-muted-foreground">
                {subscriptions.length === 0 
                  ? 'Newsletter subscriptions will appear here when users subscribe'
                  : 'Try adjusting your filters or search terms'
                }
              </p>
              {getActiveFiltersCount() > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Subscribed Date</th>
                  <th className="px-4 py-3 text-center font-medium w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map(subscription => (
                  <tr key={subscription.id} className="border-b hover:bg-muted/25 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{subscription.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={subscription.status === 'active' ? "default" : "secondary"}
                        className={`text-xs ${
                          subscription.status === 'active'
                            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800' 
                            : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800'
                        }`}
                      >
                        {subscription.status === 'active' ? 'Active' : 'Unsubscribed'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">
                        {subscription.source || 'Unknown'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-muted-foreground">
                        {formatDate(subscription.subscribedAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center items-center gap-2">
                        <Select
                          value={subscription.status}
                          onValueChange={(value: 'active' | 'unsubscribed') => 
                            handleStatusChange(subscription.id, value)
                          }
                        >
                          <SelectTrigger className="w-24 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(subscription.id, subscription.email)}
                          className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:border-red-300"
                          title="Delete subscription"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Source Distribution */}
      {subscriptions.length > 0 && uniqueSources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uniqueSources.map(source => {
                const count = subscriptions.filter(s => s.source === source).length;
                const percentage = (count / subscriptions.length) * 100;
                return (
                  <div key={source} className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <span className="text-sm font-medium capitalize">{source}</span>
                    </div>
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <Badge variant="outline" className="text-xs min-w-[2.5rem] text-center">
                        {count}
                      </Badge>
                      <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewsletterSubscriptions;