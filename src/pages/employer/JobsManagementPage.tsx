import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, SponsorshipBadge } from '../../components/ui/Badge';
import { Plus, Eye, Edit, Pause, Play, X } from 'lucide-react';

type Job = {
  id: string;
  title: string;
  occupation_code: string;
  sponsorship_available: 'yes' | 'no' | 'preferred';
  location_city: string;
  location_state: string;
  status: 'draft' | 'active' | 'paused' | 'closed';
  view_count: number;
  application_count: number;
  created_at: string;
};

export const JobsManagementPage = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'draft' | 'closed'>('all');

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    if (!user) return;

    const { data: employerProfile } = await supabase
      .from('employer_profiles')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!employerProfile) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('employer_id', employerProfile.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const updateJobStatus = async (jobId: string, newStatus: 'active' | 'paused' | 'closed') => {
    const { error } = await supabase
      .from('jobs')
      .update({ status: newStatus })
      .eq('id', jobId);

    if (!error) {
      fetchJobs();
    }
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.status === filter);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
      active: 'success',
      paused: 'warning',
      draft: 'neutral',
      closed: 'error'
    };
    return <Badge variant={variants[status] || 'neutral'}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate mb-2">Job Listings</h1>
            <p className="text-gray-600">Manage your job postings and view applications</p>
          </div>
          <Button onClick={() => window.location.href = '/employer/post-job'}>
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'active', 'paused', 'draft', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-eucalyptus text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'all' && ` (${jobs.length})`}
              {status !== 'all' && ` (${jobs.filter(j => j.status === status).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <Card padding="lg">
            <div className="text-center py-12">
              <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all'
                  ? "You haven't posted any jobs yet"
                  : `No ${filter} jobs found`}
              </p>
              <Button onClick={() => window.location.href = '/employer/post-job'}>
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Job
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} hoverable padding="none">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span>{job.location_city}, {job.location_state}</span>
                        <span>•</span>
                        <span>Code: {job.occupation_code}</span>
                      </div>
                    </div>
                    <SponsorshipBadge available={job.sponsorship_available} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Views</span>
                      </div>
                      <p className="text-2xl font-semibold text-gray-900">{job.view_count}</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <span className="text-sm">Applications</span>
                      </div>
                      <p className="text-2xl font-semibold text-eucalyptus">{job.application_count}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Posted</div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(job.created_at).toLocaleDateString('en-AU', {
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
                      onClick={() => window.location.href = `/employer/jobs/${job.id}`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/employer/jobs/${job.id}/edit`}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {job.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateJobStatus(job.id, 'paused')}
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    )}
                    {job.status === 'paused' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateJobStatus(job.id, 'active')}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                    )}
                    {job.status !== 'closed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateJobStatus(job.id, 'closed')}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
