import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { COMMON_OCCUPATIONS, AUSTRALIAN_STATES, EMPLOYMENT_TYPES } from '../../lib/constants';

export const PostJobPage = () => {
  const { user } = useAuth();
  const [employerProfile, setEmployerProfile] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [occupationCode, setOccupationCode] = useState('');
  const [occupationCategory, setOccupationCategory] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [sponsorshipAvailable, setSponsorshipAvailable] = useState<'yes' | 'no' | 'preferred'>('no');
  const [locationState, setLocationState] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [employmentType, setEmploymentType] = useState('full_time');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployerProfile();
  }, [user]);

  const fetchEmployerProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setEmployerProfile(data);
    }
  };

  const handleOccupationChange = (code: string) => {
    const selected = COMMON_OCCUPATIONS.find(occ => occ.code === code);
    if (selected) {
      setOccupationCode(selected.code);
      setOccupationCategory(selected.category);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!employerProfile) {
      setError('Employer profile not found');
      setLoading(false);
      return;
    }

    if (employerProfile.verification_status !== 'approved') {
      setError('Your company profile must be approved before posting jobs');
      setLoading(false);
      return;
    }

    if (sponsorshipAvailable !== 'no' && !employerProfile.has_sponsorship_license) {
      setError('You must have a sponsorship license to offer sponsorship');
      setLoading(false);
      return;
    }

    try {
      const { error: jobError } = await supabase
        .from('jobs')
        .insert({
          employer_id: employerProfile.id,
          title,
          occupation_code: occupationCode,
          occupation_category: occupationCategory,
          description,
          requirements,
          sponsorship_available: sponsorshipAvailable,
          location_state: locationState,
          location_city: locationCity,
          salary_min: salaryMin ? parseInt(salaryMin) : null,
          salary_max: salaryMax ? parseInt(salaryMax) : null,
          employment_type: employmentType as any,
          status: 'active'
        });

      if (jobError) throw jobError;

      window.location.href = '/employer/jobs';
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to post job';
      setError(errorMessage);
      setLoading(false);
    }
  };

  if (!employerProfile) {
    return (
      <div className="min-h-screen bg-sand py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (employerProfile.verification_status === 'pending') {
    return (
      <div className="min-h-screen bg-sand py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="text-xl font-semibold mb-2">Profile Pending Approval</h3>
              <p className="text-gray-600">
                Your company profile is currently being reviewed. You'll be able to post jobs once approved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Create a job listing to attract qualified candidates
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Senior Software Engineer"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation (ANZSCO) <span className="text-terracotta">*</span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eucalyptus"
                  value={occupationCode}
                  onChange={(e) => handleOccupationChange(e.target.value)}
                  required
                >
                  <option value="">Select occupation...</option>
                  {COMMON_OCCUPATIONS.map((occ) => (
                    <option key={occ.code} value={occ.code}>
                      {occ.name} ({occ.code})
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-sm text-gray-500">
                  Select the ANZSCO code that matches this position
                </p>
              </div>

              <Textarea
                label="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                rows={6}
              />

              <Textarea
                label="Requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="List the required qualifications, skills, and experience..."
                rows={4}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sponsorship Availability <span className="text-terracotta">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="sponsorship"
                      value="yes"
                      checked={sponsorshipAvailable === 'yes'}
                      onChange={(e) => setSponsorshipAvailable(e.target.value as any)}
                      disabled={!employerProfile.has_sponsorship_license}
                    />
                    <span>Sponsorship Available - We can sponsor eligible candidates</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="sponsorship"
                      value="preferred"
                      checked={sponsorshipAvailable === 'preferred'}
                      onChange={(e) => setSponsorshipAvailable(e.target.value as any)}
                      disabled={!employerProfile.has_sponsorship_license}
                    />
                    <span>Sponsorship Preferred - Priority to candidates needing sponsorship</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="sponsorship"
                      value="no"
                      checked={sponsorshipAvailable === 'no'}
                      onChange={(e) => setSponsorshipAvailable(e.target.value as any)}
                    />
                    <span>General Employment - Candidates must have working rights</span>
                  </label>
                </div>
                {!employerProfile.has_sponsorship_license && (
                  <p className="mt-2 text-sm text-gray-500">
                    Sponsorship options are disabled. Update your profile to add sponsorship capability.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="State"
                  options={AUSTRALIAN_STATES.map(state => ({ value: state, label: state }))}
                  value={locationState}
                  onChange={(e) => setLocationState(e.target.value)}
                  required
                />

                <Input
                  label="City"
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  required
                  placeholder="e.g. Sydney"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Minimum Salary (AUD)"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder="e.g. 80000"
                />

                <Input
                  type="number"
                  label="Maximum Salary (AUD)"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  placeholder="e.g. 120000"
                />
              </div>

              <Select
                label="Employment Type"
                options={EMPLOYMENT_TYPES.map(type => ({ value: type.value, label: type.label }))}
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                required
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = '/employer/jobs'}
                >
                  Cancel
                </Button>
                <Button type="submit" fullWidth isLoading={loading}>
                  Post Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
