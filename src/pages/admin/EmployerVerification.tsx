import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Building2, CheckCircle, XCircle, Eye } from 'lucide-react';

type EmployerProfile = {
  id: string;
  company_name: string;
  abn: string;
  industry: string;
  has_sponsorship_license: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    phone: string | null;
  };
};

export const EmployerVerification = () => {
  const { profile } = useAuth();
  const [employers, setEmployers] = useState<EmployerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  useEffect(() => {
    if (profile?.user_type === 'admin') {
      fetchEmployers();
    }
  }, [profile, filter]);

  const fetchEmployers = async () => {
    let query = supabase
      .from('employer_profiles')
      .select(`
        *,
        profiles!inner (
          full_name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false });

    if (filter === 'pending') {
      query = query.eq('verification_status', 'pending');
    }

    const { data, error } = await query;

    if (!error && data) {
      setEmployers(data as any);
    }
    setLoading(false);
  };

  const updateVerificationStatus = async (employerId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('employer_profiles')
      .update({
        verification_status: status,
        sponsorship_license_verified: status === 'approved'
      })
      .eq('id', employerId);

    if (!error) {
      fetchEmployers();
    }
  };

  if (profile?.user_type !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate mb-2">Employer Verification</h1>
          <p className="text-gray-600">Review and verify employer accounts</p>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === 'pending'
                ? 'bg-eucalyptus text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Pending ({employers.filter(e => e.verification_status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              filter === 'all'
                ? 'bg-eucalyptus text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Employers
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
          </div>
        ) : employers.length === 0 ? (
          <Card>
            <div className="py-12 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No employers found</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {employers.map((employer) => (
              <Card key={employer.id} hoverable>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-ocean/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-7 h-7 text-ocean" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate">{employer.company_name}</h3>
                          <Badge variant={
                            employer.verification_status === 'approved' ? 'success' :
                            employer.verification_status === 'rejected' ? 'error' : 'warning'
                          }>
                            {employer.verification_status}
                          </Badge>
                          {employer.has_sponsorship_license && (
                            <Badge variant="sponsorship">Sponsorship License</Badge>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">ABN:</span> {employer.abn}
                            </p>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Industry:</span> {employer.industry}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Contact:</span> {employer.profiles.full_name}
                            </p>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Email:</span> {employer.profiles.email}
                            </p>
                            {employer.profiles.phone && (
                              <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Phone:</span> {employer.profiles.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-3">
                          Registered {new Date(employer.created_at).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {employer.verification_status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="primary"
                        onClick={() => updateVerificationStatus(employer.id, 'approved')}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => updateVerificationStatus(employer.id, 'rejected')}
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = `/admin/employers/${employer.id}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  )}

                  {employer.verification_status !== 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/admin/employers/${employer.id}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {employer.verification_status === 'rejected' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateVerificationStatus(employer.id, 'approved')}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Now
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
