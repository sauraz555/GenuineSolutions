import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_type: 'applicant' | 'employer' | 'admin';
          full_name: string;
          email: string;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      applicant_profiles: {
        Row: {
          id: string;
          user_id: string;
          occupation: string;
          occupation_code: string;
          current_visa_status: string;
          location_preferences: string[];
          resume_url: string | null;
          resume_filename: string | null;
          skills: string[];
          experience_years: number;
          profile_complete: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applicant_profiles']['Row'], 'id' | 'created_at' | 'updated_at' | 'skills' | 'experience_years' | 'profile_complete' | 'location_preferences'> & {
          id?: string;
          skills?: string[];
          experience_years?: number;
          profile_complete?: boolean;
          location_preferences?: string[];
        };
        Update: Partial<Database['public']['Tables']['applicant_profiles']['Insert']>;
      };
      employer_profiles: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          abn: string;
          industry: string;
          company_size: string | null;
          has_sponsorship_license: boolean;
          sponsorship_license_verified: boolean;
          company_description: string | null;
          company_logo_url: string | null;
          website: string | null;
          contact_person: string | null;
          contact_phone: string | null;
          address: string | null;
          verification_status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['employer_profiles']['Row'], 'id' | 'created_at' | 'updated_at' | 'has_sponsorship_license' | 'sponsorship_license_verified' | 'verification_status'> & {
          id?: string;
          has_sponsorship_license?: boolean;
          sponsorship_license_verified?: boolean;
          verification_status?: 'pending' | 'approved' | 'rejected';
        };
        Update: Partial<Database['public']['Tables']['employer_profiles']['Insert']>;
      };
      jobs: {
        Row: {
          id: string;
          employer_id: string;
          title: string;
          occupation_code: string;
          occupation_category: string;
          description: string;
          requirements: string | null;
          sponsorship_available: 'yes' | 'no' | 'preferred';
          visa_types: string[];
          location_state: string;
          location_city: string;
          salary_min: number | null;
          salary_max: number | null;
          employment_type: 'full_time' | 'part_time' | 'contract' | 'casual';
          status: 'draft' | 'active' | 'paused' | 'closed';
          view_count: number;
          application_count: number;
          created_at: string;
          updated_at: string;
          closed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at' | 'updated_at' | 'view_count' | 'application_count' | 'visa_types' | 'employment_type' | 'status'> & {
          id?: string;
          visa_types?: string[];
          employment_type?: 'full_time' | 'part_time' | 'contract' | 'casual';
          status?: 'draft' | 'active' | 'paused' | 'closed';
        };
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          applicant_id: string;
          cover_letter: string | null;
          status: 'submitted' | 'under_review' | 'shortlisted' | 'interview' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';
          workflow_stage: 'sampling' | 'review' | 'interview' | 'offer' | 'placement' | null;
          applied_at: string;
          updated_at: string;
          notes: string | null;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'applied_at' | 'updated_at' | 'status'> & {
          id?: string;
          status?: 'submitted' | 'under_review' | 'shortlisted' | 'interview' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';
        };
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          application_id: string | null;
          sender_id: string;
          recipient_id: string;
          subject: string | null;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'is_read'> & {
          id?: string;
          is_read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          link: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at' | 'is_read'> & {
          id?: string;
          is_read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
  };
}
