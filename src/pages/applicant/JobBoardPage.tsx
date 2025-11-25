import { useState, useEffect } from 'react';
import { supabase, Database } from '../../lib/supabase';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { SponsorshipBadge } from '../../components/ui/Badge';
import { OCCUPATION_CATEGORIES, AUSTRALIAN_STATES } from '../../lib/constants';
import { MapPin, DollarSign, Briefcase, Search, Filter } from 'lucide-react';

type Job = Database['public']['Tables']['jobs']['Row'] & {
  employer_profiles: {
    company_name: string;
    company_logo_url: string | null;
  };
};

export const JobBoardPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sponsorshipFilter, setSponsorshipFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    let query = supabase
      .from('jobs')
      .select(`
        *,
        employer_profiles!inner (
          company_name,
          company_logo_url
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (!error && data) {
      setJobs(data as Job[]);
    }
    setLoading(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.occupation_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.employer_profiles.company_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSponsorship = !sponsorshipFilter || job.sponsorship_available === sponsorshipFilter;
    const matchesCategory = !categoryFilter || job.occupation_category === categoryFilter;
    const matchesLocation = !locationFilter || job.location_state === locationFilter;

    return matchesSearch && matchesSponsorship && matchesCategory && matchesLocation;
  });

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Competitive';
    if (min && max) return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
    if (min) return `From $${(min / 1000).toFixed(0)}k`;
    return 'Competitive';
  };

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate mb-2">Find Your Next Opportunity</h1>
          <p className="text-gray-600">Browse {filteredJobs.length} available positions across Australia</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or categories..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eucalyptus"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card padding="md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Sponsorship"
                  options={[
                    { value: '', label: 'All Jobs' },
                    { value: 'yes', label: 'Sponsorship Available' },
                    { value: 'preferred', label: 'Sponsorship Preferred' },
                    { value: 'no', label: 'General Employment' }
                  ]}
                  value={sponsorshipFilter}
                  onChange={(e) => setSponsorshipFilter(e.target.value)}
                />

                <Select
                  label="Category"
                  options={[
                    { value: '', label: 'All Categories' },
                    ...OCCUPATION_CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))
                  ]}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                />

                <Select
                  label="Location"
                  options={[
                    { value: '', label: 'All Locations' },
                    ...AUSTRALIAN_STATES.map(state => ({ value: state, label: state }))
                  ]}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              {(sponsorshipFilter || categoryFilter || locationFilter) && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSponsorshipFilter('');
                      setCategoryFilter('');
                      setLocationFilter('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <Card padding="lg">
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSponsorshipFilter('');
                  setCategoryFilter('');
                  setLocationFilter('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} hoverable padding="none">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => window.location.href = `/jobs/${job.id}`}
                >
                  <div className="flex items-start gap-4">
                    {job.employer_profiles.company_logo_url ? (
                      <img
                        src={job.employer_profiles.company_logo_url}
                        alt={job.employer_profiles.company_name}
                        className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-gray-600">{job.employer_profiles.company_name}</p>
                        </div>
                        <SponsorshipBadge available={job.sponsorship_available} />
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location_city}, {job.location_state}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {formatSalary(job.salary_min, job.salary_max)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.employment_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </div>

                      <p className="text-gray-700 line-clamp-2 mb-3">
                        {job.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Posted {new Date(job.created_at).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
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
