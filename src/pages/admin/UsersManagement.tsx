import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Database } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Edit, Trash2, UserCog } from 'lucide-react';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const UsersManagement = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'applicant' | 'employer' | 'admin'>('all');

  useEffect(() => {
    if (profile?.user_type === 'admin') {
      fetchUsers();
    }
  }, [profile]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (!error) {
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || user.user_type === filterType;

    return matchesSearch && matchesType;
  });

  if (profile?.user_type !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate mb-2">User Management</h1>
          <p className="text-gray-600">View and manage all platform users</p>
        </div>

        <Card className="mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eucalyptus/20 focus:border-eucalyptus"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                {['all', 'applicant', 'employer', 'admin'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filterType === type
                        ? 'bg-eucalyptus text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredUsers.length} of {users.length} users
            </div>

            {filteredUsers.map((user) => (
              <Card key={user.id} hoverable>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-eucalyptus/10 rounded-full flex items-center justify-center">
                        <UserCog className="w-6 h-6 text-eucalyptus" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-slate">{user.full_name}</h3>
                          <Badge variant={
                            user.user_type === 'admin' ? 'error' :
                            user.user_type === 'employer' ? 'info' : 'success'
                          }>
                            {user.user_type}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Joined {new Date(user.created_at).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/admin/users/${user.id}/edit`}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredUsers.length === 0 && (
              <Card>
                <div className="py-12 text-center">
                  <p className="text-gray-600">No users found matching your criteria</p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
