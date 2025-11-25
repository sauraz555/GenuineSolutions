import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { INDUSTRIES, COMPANY_SIZES } from '../../lib/constants';

export const EmployerCompleteProfilePage = () => {
  const { user, refreshProfile } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [abn, setAbn] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [hasSponsorshipLicense, setHasSponsorshipLicense] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ phone })
        .eq('id', user.id);

      if (profileError) throw profileError;

      const { error: employerError } = await supabase
        .from('employer_profiles')
        .insert({
          user_id: user.id,
          company_name: companyName,
          abn,
          industry,
          company_size: companySize,
          has_sponsorship_license: hasSponsorshipLicense,
          website,
          address,
          company_description: companyDescription,
          verification_status: 'pending'
        });

      if (employerError) throw employerError;

      await refreshProfile();
      window.location.href = '/employer/jobs';
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
            <CardTitle>Complete Company Profile</CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Provide your company details to start posting jobs and finding talent
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                Your company profile will be reviewed by our team. You'll be notified once approved.
              </div>

              <Input
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Your company name"
              />

              <Input
                label="Australian Business Number (ABN)"
                value={abn}
                onChange={(e) => setAbn(e.target.value)}
                required
                placeholder="XX XXX XXX XXX"
                helperText="11-digit ABN registered with ASIC"
              />

              <Select
                label="Industry"
                options={INDUSTRIES.map(ind => ({ value: ind, label: ind }))}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />

              <Select
                label="Company Size"
                options={COMPANY_SIZES.map(size => ({ value: size, label: size }))}
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              />

              <Input
                type="tel"
                label="Contact Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+61 X XXXX XXXX"
                required
              />

              <Input
                type="url"
                label="Company Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.example.com.au"
              />

              <Textarea
                label="Company Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, City, State, Postcode"
                rows={3}
              />

              <Textarea
                label="Company Description"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Tell candidates about your company, culture, and what makes you a great place to work..."
                rows={5}
              />

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-eucalyptus focus:ring-eucalyptus"
                    checked={hasSponsorshipLicense}
                    onChange={(e) => setHasSponsorshipLicense(e.target.checked)}
                  />
                  <div>
                    <span className="font-medium text-gray-900 block mb-1">
                      We have a Standard Business Sponsorship License
                    </span>
                    <span className="text-sm text-gray-600">
                      Check this if your company is approved to sponsor skilled workers for
                      Subclass 482 or 186 visas. Our team will verify this information.
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" fullWidth isLoading={loading}>
                  Complete Profile & Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
