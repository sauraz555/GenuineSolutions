import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { COMMON_OCCUPATIONS, VISA_STATUSES, AUSTRALIAN_STATES } from '../../lib/constants';
import { Upload } from 'lucide-react';

export const CompleteProfilePage = () => {
  const { user, refreshProfile } = useAuth();
  const [occupation, setOccupation] = useState('');
  const [occupationCode, setOccupationCode] = useState('');
  const [currentVisaStatus, setCurrentVisaStatus] = useState('');
  const [locationPreferences, setLocationPreferences] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('0');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOccupationChange = (code: string) => {
    const selected = COMMON_OCCUPATIONS.find(occ => occ.code === code);
    if (selected) {
      setOccupationCode(selected.code);
      setOccupation(selected.name);
    }
  };

  const handleLocationToggle = (state: string) => {
    setLocationPreferences(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setError('Only PDF and DOC files are allowed');
        return;
      }
      setResumeFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    if (locationPreferences.length === 0) {
      setError('Please select at least one location preference');
      setLoading(false);
      return;
    }

    try {
      let resumeUrl = null;
      let resumeFilename = null;

      if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);

        resumeUrl = publicUrl;
        resumeFilename = resumeFile.name;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ phone })
        .eq('id', user.id);

      if (profileError) throw profileError;

      const { error: applicantError } = await supabase
        .from('applicant_profiles')
        .insert({
          user_id: user.id,
          occupation,
          occupation_code: occupationCode,
          current_visa_status: currentVisaStatus,
          location_preferences: locationPreferences,
          resume_url: resumeUrl,
          resume_filename: resumeFilename,
          experience_years: parseInt(experienceYears),
          profile_complete: true
        });

      if (applicantError) throw applicantError;

      await refreshProfile();
      window.location.href = '/jobs';
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete profile';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Help us match you with the right opportunities by completing your profile
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation <span className="text-terracotta">*</span>
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eucalyptus"
                  value={occupationCode}
                  onChange={(e) => handleOccupationChange(e.target.value)}
                  required
                >
                  <option value="">Select your occupation...</option>
                  {COMMON_OCCUPATIONS.map((occ) => (
                    <option key={occ.code} value={occ.code}>
                      {occ.name} ({occ.code})
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-sm text-gray-500">
                  Select your primary occupation from the ANZSCO list
                </p>
              </div>

              <Select
                label="Current Visa Status"
                options={VISA_STATUSES.map(v => ({ value: v.value, label: v.label }))}
                value={currentVisaStatus}
                onChange={(e) => setCurrentVisaStatus(e.target.value)}
                required
              />

              <Input
                type="tel"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+61 4XX XXX XXX"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience <span className="text-terracotta">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eucalyptus"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Preferences <span className="text-terracotta">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AUSTRALIAN_STATES.map((state) => (
                    <label
                      key={state}
                      className={`flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                        locationPreferences.includes(state)
                          ? 'bg-eucalyptus text-white border-eucalyptus'
                          : 'bg-white border-gray-300 hover:border-eucalyptus'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={locationPreferences.includes(state)}
                        onChange={() => handleLocationToggle(state)}
                      />
                      {state}
                    </label>
                  ))}
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  Select all states where you would consider working
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-eucalyptus transition-colors">
                  <input
                    type="file"
                    id="resume"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="resume"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF or DOC (max 5MB)
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" fullWidth isLoading={loading}>
                  Complete Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
