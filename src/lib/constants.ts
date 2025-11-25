export const AUSTRALIAN_STATES = [
  'NSW',
  'VIC',
  'QLD',
  'WA',
  'SA',
  'TAS',
  'ACT',
  'NT'
] as const;

export const VISA_STATUSES = [
  { value: '482', label: 'Subclass 482 - TSS' },
  { value: '186', label: 'Subclass 186 - ENS' },
  { value: '189', label: 'Subclass 189 - Skilled Independent' },
  { value: '190', label: 'Subclass 190 - Skilled Nominated' },
  { value: '491', label: 'Subclass 491 - Skilled Work Regional' },
  { value: 'student', label: 'Student Visa' },
  { value: 'working_holiday', label: 'Working Holiday Visa' },
  { value: 'citizen', label: 'Australian Citizen' },
  { value: 'pr', label: 'Permanent Resident' },
  { value: 'other', label: 'Other' }
] as const;

export const OCCUPATION_CATEGORIES = [
  { value: 'ict', label: 'Information & Communication Technology' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'healthcare', label: 'Healthcare & Medicine' },
  { value: 'education', label: 'Education & Training' },
  { value: 'trades', label: 'Trades & Construction' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'finance', label: 'Finance & Accounting' },
  { value: 'management', label: 'Management & Business' },
  { value: 'legal', label: 'Legal & Social Services' },
  { value: 'science', label: 'Science & Research' },
  { value: 'arts', label: 'Arts & Media' },
  { value: 'agriculture', label: 'Agriculture & Environment' }
] as const;

export const COMMON_OCCUPATIONS = [
  { code: '261313', name: 'Software Engineer', category: 'ict' },
  { code: '261111', name: 'ICT Business Analyst', category: 'ict' },
  { code: '261312', name: 'Developer Programmer', category: 'ict' },
  { code: '261314', name: 'Software Tester', category: 'ict' },
  { code: '233914', name: 'Engineering Technologist', category: 'engineering' },
  { code: '233211', name: 'Civil Engineer', category: 'engineering' },
  { code: '233512', name: 'Mechanical Engineer', category: 'engineering' },
  { code: '233513', name: 'Production or Plant Engineer', category: 'engineering' },
  { code: '254111', name: 'Midwife', category: 'healthcare' },
  { code: '254411', name: 'Nurse Practitioner', category: 'healthcare' },
  { code: '254415', name: 'Registered Nurse', category: 'healthcare' },
  { code: '253111', name: 'General Practitioner', category: 'healthcare' },
  { code: '241111', name: 'Early Childhood Teacher', category: 'education' },
  { code: '241213', name: 'Primary School Teacher', category: 'education' },
  { code: '241411', name: 'Secondary School Teacher', category: 'education' },
  { code: '221111', name: 'Accountant', category: 'finance' },
  { code: '221112', name: 'Management Accountant', category: 'finance' },
  { code: '221213', name: 'External Auditor', category: 'finance' },
  { code: '132211', name: 'Finance Manager', category: 'management' },
  { code: '133111', name: 'Construction Project Manager', category: 'management' },
  { code: '133211', name: 'Engineering Manager', category: 'management' },
  { code: '351311', name: 'Chef', category: 'hospitality' },
  { code: '351411', name: 'Cook', category: 'hospitality' },
  { code: '321211', name: 'Motor Mechanic', category: 'trades' },
  { code: '331212', name: 'Carpenter', category: 'trades' },
  { code: '334111', name: 'Plumber', category: 'trades' },
  { code: '341111', name: 'Electrician', category: 'trades' }
] as const;

export const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'casual', label: 'Casual' }
] as const;

export const INDUSTRIES = [
  'Information Technology',
  'Healthcare',
  'Engineering',
  'Construction',
  'Education',
  'Finance',
  'Hospitality',
  'Manufacturing',
  'Retail',
  'Professional Services',
  'Mining',
  'Agriculture',
  'Transport & Logistics',
  'Government',
  'Other'
] as const;

export const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
] as const;
