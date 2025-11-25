import { useState } from 'react';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { Logo } from '../Logo';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <Logo size="sm" showText={true} />

          <div className="hidden md:flex items-center gap-6">
            {profile ? (
              <>
                {profile.user_type === 'applicant' && (
                  <>
                    <a href="/jobs" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Find Jobs
                    </a>
                    <a href="/applications" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      My Applications
                    </a>
                    <a href="/profile" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Profile
                    </a>
                  </>
                )}
                {profile.user_type === 'employer' && (
                  <>
                    <a href="/employer/jobs" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      My Jobs
                    </a>
                    <a href="/employer/candidates" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Candidates
                    </a>
                    <a href="/employer/post-job" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Post Job
                    </a>
                  </>
                )}
                {profile.user_type === 'admin' && (
                  <>
                    <a href="/admin" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Dashboard
                    </a>
                    <a href="/admin/users" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Users
                    </a>
                    <a href="/admin/employers" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Employers
                    </a>
                    <a href="/admin/jobs" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Jobs
                    </a>
                    <a href="/admin/content" className="text-gray-700 hover:text-eucalyptus transition-colors">
                      Content
                    </a>
                  </>
                )}
                <button className="p-2 text-gray-600 hover:text-eucalyptus transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full"></span>
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{profile.full_name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-700 hover:text-eucalyptus transition-colors">
                  Sign In
                </a>
                <Button size="sm" onClick={() => window.location.href = '/signup'}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t">
            {profile ? (
              <>
                <div className="py-3 px-2 border-b mb-2">
                  <p className="text-sm font-medium text-gray-900">{profile.full_name}</p>
                  <p className="text-xs text-gray-500 capitalize">{profile.user_type}</p>
                </div>
                {profile.user_type === 'applicant' && (
                  <>
                    <a href="/jobs" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Find Jobs
                    </a>
                    <a href="/applications" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      My Applications
                    </a>
                    <a href="/profile" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Profile
                    </a>
                  </>
                )}
                {profile.user_type === 'employer' && (
                  <>
                    <a href="/employer/jobs" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      My Jobs
                    </a>
                    <a href="/employer/candidates" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Candidates
                    </a>
                    <a href="/employer/post-job" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Post Job
                    </a>
                  </>
                )}
                {profile.user_type === 'admin' && (
                  <>
                    <a href="/admin" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Dashboard
                    </a>
                    <a href="/admin/users" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Users
                    </a>
                    <a href="/admin/employers" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Employers
                    </a>
                    <a href="/admin/jobs" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Jobs
                    </a>
                    <a href="/admin/content" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                      Content
                    </a>
                  </>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left py-2 px-2 text-gray-700 hover:bg-gray-50 rounded mt-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                  Sign In
                </a>
                <a href="/signup" className="block py-2 px-2 text-gray-700 hover:bg-gray-50 rounded">
                  Get Started
                </a>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
