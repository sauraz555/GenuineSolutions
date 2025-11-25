import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { CompleteProfilePage } from './pages/applicant/CompleteProfilePage';
import { JobBoardPage } from './pages/applicant/JobBoardPage';
import { EmployerCompleteProfilePage } from './pages/employer/CompleteProfilePage';
import { PostJobPage } from './pages/employer/PostJobPage';
import { JobsManagementPage } from './pages/employer/JobsManagementPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UsersManagement } from './pages/admin/UsersManagement';
import { EmployerVerification } from './pages/admin/EmployerVerification';
import { JobModeration } from './pages/admin/JobModeration';
import { ContentManagement } from './pages/admin/ContentManagement';

const Router = () => {
  const [path, setPath] = useState(window.location.pathname);
  const { profile, loading } = useAuth();

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const routes: Record<string, JSX.Element> = {
    '/': <LandingPage />,
    '/login': <LoginPage />,
    '/signup': <SignupPage />,
    '/applicant/complete-profile': <CompleteProfilePage />,
    '/jobs': <JobBoardPage />,
    '/employer/complete-profile': <EmployerCompleteProfilePage />,
    '/employer/jobs': <JobsManagementPage />,
    '/employer/post-job': <PostJobPage />,
    '/admin': <AdminDashboard />,
    '/admin/users': <UsersManagement />,
    '/admin/employers': <EmployerVerification />,
    '/admin/jobs': <JobModeration />,
    '/admin/content': <ContentManagement />
  };

  const component = routes[path] || <LandingPage />;

  const showHeaderFooter = !['/login', '/signup'].includes(path);

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && profile && <Header />}
      <main className="flex-1">
        {component}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
