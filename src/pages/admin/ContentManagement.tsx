import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Save, RotateCcw } from 'lucide-react';

type ContentSettings = {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  stats_active_jobs: number;
  stats_success_rate: number;
  stats_placements: number;
  feature_1_title: string;
  feature_1_description: string;
  feature_2_title: string;
  feature_2_description: string;
  feature_3_title: string;
  feature_3_description: string;
  cta_title: string;
  cta_description: string;
};

export const ContentManagement = () => {
  const { profile } = useAuth();
  const [content, setContent] = useState<ContentSettings>({
    hero_title: 'Launch Your',
    hero_subtitle: 'Australian Career',
    hero_description: 'Connect with verified employers offering genuine visa sponsorship and skilled employment opportunities across Australia.',
    stats_active_jobs: 500,
    stats_success_rate: 98,
    stats_placements: 2000,
    feature_1_title: 'Verified Employers',
    feature_1_description: 'Every employer undergoes rigorous ABN and license verification before posting jobs.',
    feature_2_title: 'Fast Matching',
    feature_2_description: 'Our AI-powered system matches you with relevant opportunities in real-time.',
    feature_3_title: 'High Success Rate',
    feature_3_description: '98% placement success rate with continuous support throughout your journey.',
    cta_title: 'Ready to Transform Your Career?',
    cta_description: 'Join over 2,000 professionals who have successfully landed their dream jobs in Australia through Genuine Solutions.'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile?.user_type === 'admin') {
      loadContent();
    }
  }, [profile]);

  const loadContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .maybeSingle();

    if (!error && data) {
      setContent(data as any);
    }
    setLoading(false);
  };

  const saveContent = async () => {
    setSaving(true);
    setSuccess(false);

    const { data: existing } = await supabase
      .from('site_content')
      .select('id')
      .maybeSingle();

    let error;
    if (existing) {
      const result = await supabase
        .from('site_content')
        .update(content)
        .eq('id', existing.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('site_content')
        .insert([content]);
      error = result.error;
    }

    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      setContent({
        hero_title: 'Launch Your',
        hero_subtitle: 'Australian Career',
        hero_description: 'Connect with verified employers offering genuine visa sponsorship and skilled employment opportunities across Australia.',
        stats_active_jobs: 500,
        stats_success_rate: 98,
        stats_placements: 2000,
        feature_1_title: 'Verified Employers',
        feature_1_description: 'Every employer undergoes rigorous ABN and license verification before posting jobs.',
        feature_2_title: 'Fast Matching',
        feature_2_description: 'Our AI-powered system matches you with relevant opportunities in real-time.',
        feature_3_title: 'High Success Rate',
        feature_3_description: '98% placement success rate with continuous support throughout your journey.',
        cta_title: 'Ready to Transform Your Career?',
        cta_description: 'Join over 2,000 professionals who have successfully landed their dream jobs in Australia through Genuine Solutions.'
      });
    }
  };

  if (profile?.user_type !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-sand py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate mb-2">Content Management</h1>
          <p className="text-gray-600">Edit landing page content and statistics</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-800 flex items-center gap-2">
            <Save className="w-5 h-5" />
            <span className="font-medium">Content saved successfully!</span>
          </div>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Hero Title (Line 1)"
                value={content.hero_title}
                onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                placeholder="Launch Your"
              />
              <Input
                label="Hero Title (Line 2 - Gradient)"
                value={content.hero_subtitle}
                onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
                placeholder="Australian Career"
              />
              <Textarea
                label="Hero Description"
                value={content.hero_description}
                onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  label="Active Jobs"
                  type="number"
                  value={content.stats_active_jobs}
                  onChange={(e) => setContent({ ...content, stats_active_jobs: parseInt(e.target.value) })}
                />
                <Input
                  label="Success Rate (%)"
                  type="number"
                  value={content.stats_success_rate}
                  onChange={(e) => setContent({ ...content, stats_success_rate: parseInt(e.target.value) })}
                />
                <Input
                  label="Total Placements"
                  type="number"
                  value={content.stats_placements}
                  onChange={(e) => setContent({ ...content, stats_placements: parseInt(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate">Feature 1</h3>
                <Input
                  label="Title"
                  value={content.feature_1_title}
                  onChange={(e) => setContent({ ...content, feature_1_title: e.target.value })}
                />
                <Textarea
                  label="Description"
                  value={content.feature_1_description}
                  onChange={(e) => setContent({ ...content, feature_1_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-slate">Feature 2</h3>
                <Input
                  label="Title"
                  value={content.feature_2_title}
                  onChange={(e) => setContent({ ...content, feature_2_title: e.target.value })}
                />
                <Textarea
                  label="Description"
                  value={content.feature_2_description}
                  onChange={(e) => setContent({ ...content, feature_2_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-slate">Feature 3</h3>
                <Input
                  label="Title"
                  value={content.feature_3_title}
                  onChange={(e) => setContent({ ...content, feature_3_title: e.target.value })}
                />
                <Textarea
                  label="Description"
                  value={content.feature_3_description}
                  onChange={(e) => setContent({ ...content, feature_3_description: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="CTA Title"
                value={content.cta_title}
                onChange={(e) => setContent({ ...content, cta_title: e.target.value })}
              />
              <Textarea
                label="CTA Description"
                value={content.cta_description}
                onChange={(e) => setContent({ ...content, cta_description: e.target.value })}
                rows={3}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={saveContent}
              isLoading={saving}
              className="flex-1"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={resetToDefaults}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
