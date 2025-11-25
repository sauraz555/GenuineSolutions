import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, SponsorshipBadge } from '../../components/ui/Badge';
import { Briefcase, Eye, Trash2, CheckCircle, Ban } from 'lucide-react';

type Job = {
  id: string;
  title: string;
  occupation_code: string;
  occupation_category: string;
  description: string;
  sponsorship_available: 'yes' | 'no' | 'preferred';
  location_city: string;
  location_state: string;
  salary_min: number | null;
  salary_max: number | null;
  status: 'draft' | 'active' | 'paused' | 'closed';
  view_count: number;
  application_count: number;
  created_at: string;
  employer_profiles: {
    company_name: string;
    verification_status: string;
  };
};

export const JobModeration = () => {
  const { profile } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'flagged'>('all');

  useEffect(() => {
    if (profile?.user_type === 'admin') {
      fetchJobs();
    }
  }, [profile]);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        employer_profiles!inner (
          company_name,
          verification_status
        )
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data as any);
    }
    setLoading(false);
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (!error) {
      fetchJobs();
    }
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

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'active') return job.status === 'active';
    if (filter === 'flagged') return job.employer_profiles.verification_status === 'pending';
    return true;
  });

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Competitive';
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
    if (min) return `From $${(min / 1000).toFixed(0)}k`;
    return 'Competitive';
  };

  if (profile?.user_type !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate mb-2">Job Moderation</h1>
          <p className="text-gray-600">Review and moderate job listings</p>
        </div>

        <div className="mb-6 flex gap-2">
          {['all', 'active', 'flagged'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                filter === f
                  ? 'bg-eucalyptus text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'flagged' && ` (${jobs.filter(j => j.employer_profiles.verification_status === 'pending').length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <div className="py-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No jobs found</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} hoverable>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate">{job.title}</h3>
                        <Badge variant={
                          job.status === 'active' ? 'success' :
                          job.status === 'paused' ? 'warning' :
                          job.status === 'draft' ? 'neutral' : 'error'
                        }>
                          {job.status}
                        </Badge>
                        <SponsorshipBadge available={job.sponsorship_available} />
                      </div>

                      <p className="text-gray-600 mb-2">{job.employer_profiles.company_name}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span>{job.location_city}, {job.location_state}</span>
                        <span>•</span>
                        <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                        <span>•</span>
                        <span>Code: {job.occupation_code}</span>
                        <span>•</span>
                        <span>{job.view_count} views</span>
                        <span>•</span>
                        <span>{job.application_count} applications</span>
                      </div>

                      <p className="text-gray-700 line-clamp-2 mb-3">{job.description}</p>

                      <p className="text-sm text-gray-500">
                        Posted {new Date(job.created_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/jobs/${job.id}`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>

                    {job.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateJobStatus(job.id, 'paused')}
                      >
                        <Ban className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    )}

                    {job.status === 'paused' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateJobStatus(job.id, 'active')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                    )}

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteJob(job.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
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
