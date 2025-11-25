import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Logo } from '../../components/Logo';
import { Briefcase, Users } from 'lucide-react';

export const SignupPage = () => {
  const [userType, setUserType] = useState<'applicant' | 'employer' | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userType) {
      setError('Please select an account type');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, {
      full_name: fullName,
      user_type: userType
    });

    if (error) {
      setError(error.message || 'Failed to create account. Please try again.');
      setLoading(false);
    } else {
      if (userType === 'applicant') {
        window.location.href = '/applicant/complete-profile';
      } else {
        window.location.href = '/employer/complete-profile';
      }
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand via-white to-eucalyptus/5 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <Logo size="lg" showText={true} className="justify-center mb-4" />
            <h1 className="text-3xl font-bold text-slate mb-2">Create Your Account</h1>
            <p className="text-gray-600">Choose how you want to use Genuine Solutions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              hoverable
              padding="lg"
              className="cursor-pointer border-2 border-transparent hover:border-eucalyptus"
              onClick={() => setUserType('applicant')}
            >
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-eucalyptus/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-10 h-10 text-eucalyptus" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Job Seeker</h3>
                <p className="text-gray-600 mb-4">
                  I'm looking for employment opportunities in Australia and/or visa sponsorship
                </p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-eucalyptus rounded-full"></div>
                    Browse jobs with sponsorship options
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-eucalyptus rounded-full"></div>
                    Create a professional profile
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-eucalyptus rounded-full"></div>
                    Track your applications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-eucalyptus rounded-full"></div>
                    Get matched with employers
                  </li>
                </ul>
              </div>
            </Card>

            <Card
              hoverable
              padding="lg"
              className="cursor-pointer border-2 border-transparent hover:border-ocean"
              onClick={() => setUserType('employer')}
            >
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-ocean/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-ocean" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Employer</h3>
                <p className="text-gray-600 mb-4">
                  I'm an employer looking to hire skilled workers and/or offer visa sponsorship
                </p>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ocean rounded-full"></div>
                    Post unlimited job listings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ocean rounded-full"></div>
                    Access qualified candidates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ocean rounded-full"></div>
                    Manage applications easily
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ocean rounded-full"></div>
                    Track hiring pipeline
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-eucalyptus hover:text-eucalyptus-dark font-medium">
              Sign in
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-white to-eucalyptus/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <button
            onClick={() => setUserType(null)}
            className="text-eucalyptus hover:text-eucalyptus-dark mb-4 inline-flex items-center gap-1 text-sm"
          >
            ← Change account type
          </button>
          <Logo size="md" showText={true} className="justify-center" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Create {userType === 'applicant' ? 'Job Seeker' : 'Employer'} Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={userType === 'applicant' ? 'Your full name' : 'Contact person name'}
              />

              <Input
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
                autoComplete="email"
              />

              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 8 characters"
                helperText="Must be at least 8 characters long"
                autoComplete="new-password"
              />

              <Input
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />

              <div className="text-xs text-gray-600">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-eucalyptus hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-eucalyptus hover:underline">
                  Privacy Policy
                </a>
              </div>

              <Button type="submit" fullWidth isLoading={loading}>
                Create Account
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-eucalyptus hover:text-eucalyptus-dark font-medium">
                  Sign in
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
