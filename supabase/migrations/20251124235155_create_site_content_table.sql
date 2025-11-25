/*
  # Create site content management table

  ## Description
  This migration creates a table for storing editable landing page content
  that can be managed through the admin portal.

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `hero_title` (text) - First line of hero title
      - `hero_subtitle` (text) - Second line with gradient
      - `hero_description` (text) - Hero description text
      - `stats_active_jobs` (integer) - Number of active jobs displayed
      - `stats_success_rate` (integer) - Success rate percentage
      - `stats_placements` (integer) - Total placements number
      - `feature_1_title` (text) - First feature title
      - `feature_1_description` (text) - First feature description
      - `feature_2_title` (text) - Second feature title
      - `feature_2_description` (text) - Second feature description
      - `feature_3_title` (text) - Third feature title
      - `feature_3_description` (text) - Third feature description
      - `cta_title` (text) - Call-to-action title
      - `cta_description` (text) - Call-to-action description
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `site_content` table
    - Add policy for public read access
    - Add policy for admin-only write access
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text NOT NULL DEFAULT 'Launch Your',
  hero_subtitle text NOT NULL DEFAULT 'Australian Career',
  hero_description text NOT NULL DEFAULT 'Connect with verified employers offering genuine visa sponsorship and skilled employment opportunities across Australia.',
  stats_active_jobs integer NOT NULL DEFAULT 500,
  stats_success_rate integer NOT NULL DEFAULT 98,
  stats_placements integer NOT NULL DEFAULT 2000,
  feature_1_title text NOT NULL DEFAULT 'Verified Employers',
  feature_1_description text NOT NULL DEFAULT 'Every employer undergoes rigorous ABN and license verification before posting jobs.',
  feature_2_title text NOT NULL DEFAULT 'Fast Matching',
  feature_2_description text NOT NULL DEFAULT 'Our AI-powered system matches you with relevant opportunities in real-time.',
  feature_3_title text NOT NULL DEFAULT 'High Success Rate',
  feature_3_description text NOT NULL DEFAULT '98% placement success rate with continuous support throughout your journey.',
  cta_title text NOT NULL DEFAULT 'Ready to Transform Your Career?',
  cta_description text NOT NULL DEFAULT 'Join over 2,000 professionals who have successfully landed their dream jobs in Australia through Genuine Solutions.',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON site_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can update site content"
  ON site_content
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Only admins can insert site content"
  ON site_content
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

INSERT INTO site_content (id) VALUES (gen_random_uuid())
ON CONFLICT (id) DO NOTHING;
