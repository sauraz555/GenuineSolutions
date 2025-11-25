import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Users, Briefcase, Building2, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export const AdminDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingVerifications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.user_type === 'admin') {
      fetchStats();
    }
  }, [profile]);

  const fetchStats = async () => {
    try {
      const [users, employers, jobs, applications, pending] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('employer_profiles').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('applications').select('id', { count: 'exact', head: true }),
        supabase.from('employer_profiles').select('id', { count: 'exact', head: true }).eq('verification_status', 'pending')
      ]);

      const activeJobsResult = await supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active');

      setStats({
        totalUsers: users.count || 0,
        totalEmployers: employers.count || 0,
        totalJobs: jobs.count || 0,
        activeJobs: activeJobsResult.count || 0,
        totalApplications: applications.count || 0,
        pendingVerifications: pending.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (profile?.user_type !== 'admin') {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-16 h-16 text-terracotta mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access the admin portal.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your platform and monitor activity</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-eucalyptus"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card hoverable>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">Total Users</p>
                      <p className="text-3xl font-bold text-slate">{stats.totalUsers}</p>
                      <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        All registered users
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-eucalyptus/10 rounded-2xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-eucalyptus" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card hoverable>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">Employers</p>
                      <p className="text-3xl font-bold text-slate">{stats.totalEmployers}</p>
                      <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {stats.pendingVerifications} pending
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-ocean/10 rounded-2xl flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-ocean" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card hoverable>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">Active Jobs</p>
                      <p className="text-3xl font-bold text-slate">{stats.activeJobs}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {stats.totalJobs} total jobs
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-wattle/20 rounded-2xl flex items-center justify-center">
                      <Briefcase className="w-7 h-7 text-wattle-dark" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-eucalyptus to-eucalyptus-dark text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Applications</p>
                      <p className="text-3xl font-bold">{stats.totalApplications}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <button
                onClick={() => window.location.href = '/admin/users'}
                className="text-left transition-transform hover:scale-105"
              >
                <Card className="h-full bg-white hover:shadow-xl">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-eucalyptus mb-3" />
                    <p className="font-semibold text-slate">Manage Users</p>
                    <p className="text-sm text-gray-600">View and edit users</p>
                  </CardContent>
                </Card>
              </button>

              <button
                onClick={() => window.location.href = '/admin/employers'}
                className="text-left transition-transform hover:scale-105"
              >
                <Card className="h-full bg-white hover:shadow-xl">
                  <CardContent className="p-6">
                    <Building2 className="w-8 h-8 text-ocean mb-3" />
                    <p className="font-semibold text-slate">Verify Employers</p>
                    <p className="text-sm text-gray-600">{stats.pendingVerifications} pending</p>
                  </CardContent>
                </Card>
              </button>

              <button
                onClick={() => window.location.href = '/admin/jobs'}
                className="text-left transition-transform hover:scale-105"
              >
                <Card className="h-full bg-white hover:shadow-xl">
                  <CardContent className="p-6">
                    <Briefcase className="w-8 h-8 text-wattle-dark mb-3" />
                    <p className="font-semibold text-slate">Moderate Jobs</p>
                    <p className="text-sm text-gray-600">Review job listings</p>
                  </CardContent>
                </Card>
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <button
                onClick={() => window.location.href = '/admin/content'}
                className="text-left"
              >
                <Card hoverable className="h-full">
                  <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Edit landing page content, statistics, and featured sections
                    </p>
                    <span className="text-eucalyptus font-medium hover:underline">
                      Manage Content →
                    </span>
                  </CardContent>
                </Card>
              </button>

              <button
                onClick={() => window.location.href = '/admin/analytics'}
                className="text-left"
              >
                <Card hoverable className="h-full">
                  <CardHeader>
                    <CardTitle>Analytics & Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      View detailed analytics, reports, and platform insights
                    </p>
                    <span className="text-eucalyptus font-medium hover:underline">
                      View Analytics →
                    </span>
                  </CardContent>
                </Card>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
