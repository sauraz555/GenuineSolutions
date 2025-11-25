# Genuine Solutions - Component Documentation

Welcome to the Genuine Solutions component documentation. This documentation provides comprehensive guides for all reusable components in the project.

## 🏢 About Genuine Solutions

**Genuine Solutions** is a premier recruitment service provider in Australia, established in 2024. We specialize in bridging the gap between employers seeking skilled employees and talented job seekers, while ensuring compliance with Australian visa requirements.

**Mission**: To simplify workforce management and recruitment by providing expert, efficient services that connect talent with opportunity while ensuring full compliance with Australian migration law.

**Key Stats**:
- ✅ Trusted by 100+ clients
- ✅ 5+ Years of Combined Expertise
- ✅ 50+ Migrants Placed Successfully
- ✅ Expertise Across Multiple Industries (IT, Healthcare, Construction)

---

## 📚 Documentation Structure

- **COMPONENT_TEMPLATE.md** - Template for creating new component documentation
- **components/** - Detailed documentation for each component

---

## 🎨 Component Library

### UI Components

#### Form Components
- [Button](./components/Button.md) - Primary interactive element for user actions (e.g., "Submit Inquiry" on contact forms)
- Input - Text input fields with validation (e.g., for contact forms and CV uploads)
- Select - Dropdown selection component (e.g., service type selection)
- Textarea - Multi-line text input (e.g., inquiry messages)
- Checkbox - Binary choice input (e.g., consent for fast-track services)
- Radio - Single choice from multiple options (e.g., service turnaround time)

#### Layout Components
- [Card](./components/Card.md) - Content container with consistent styling (e.g., service highlight cards)
- Header - Site-wide navigation header (e.g., simple top nav with Home/Services/Contact)
- Footer - Site-wide footer with links (e.g., copyright and contact info)
- Modal - Overlay dialog for focused interactions (e.g., service details popups)

#### Feedback Components
- Badge - Status indicators and labels (e.g., "Fast Track" badges)
- Toast - Temporary notification messages (e.g., form submission success)
- Alert - Persistent notification messages (e.g., visa requirement warnings)
- Loading - Loading indicators and skeletons (e.g., during form processing)

#### Data Display
- Table - Structured data display (e.g., service comparison tables)
- List - Vertical list of items (e.g., client testimonials list)
- Avatar - User profile images (e.g., team member photos)
- Stats - Statistical data display (e.g., updated client counters)

---

### Page Components

#### Core Pages
- **HomePage** - Welcome and services overview
- **ServicesPage** - Detailed recruitment and visa services
  - Talent Acquisition
  - CV Preparation
  - 407 Visa Training Plan
  - Labour Market Testing
  - Genuine Need of a Position
- **ContactPage** - Inquiry form for consultations
- **AboutPage** - Company history, mission, and team

#### Authentication (Future)
- LoginPage - Client portal login
- SignupPage - Client registration

---

## 💼 Our Services

Each service can be showcased using Cards or Modals in the component library:

### 1. Talent Acquisition
**Icon**: Users
**Description**: We bridge the gap between employers seeking skilled employees and job seekers, aligning needs for a perfect match that benefits both parties.

### 2. CV Preparation
**Icon**: FileText
**Description**: Comprehensive services to create professional, impactful resumes. Our team works closely to highlight skills, experience, and achievements, offering personalized support for new or improved CVs to meet your career goals.

### 3. 407 Visa Training Plan
**Icon**: Award
**Description**: Specialized plans for temporary entry (up to 2 years) for occupational training or professional development. Requires a detailed plan from employers for workplace-based training in eligible occupations.

### 4. Labour Market Testing (LMT)
**Icon**: Search
**Description**: Mandatory process to ensure genuine efforts to hire qualified Australian workers before sponsoring foreign workers under certain visa categories. Prioritizes local job opportunities and maintains labor market integrity.

### 5. Genuine Need of a Position (GNP)
**Icon**: CheckSquare
**Description**: Employers must demonstrate the necessity of hiring a foreign worker for a specific role. Verifies the position's cruciality to operations and prevents misuse of visa programs.

---

## 🎯 Quick Start Guide

### Using Components

1. Import the component:
```tsx
import { Button } from '@/components/ui/Button';
```

2. Use with props:
```tsx
<Button variant="primary" size="lg" onClick={handleSubmit}>
  Get Started
</Button>
```

3. Customize with className:
```tsx
<Button className="shadow-xl">
  Fast Track Service
</Button>
```

### Creating New Components

1. Copy `COMPONENT_TEMPLATE.md`
2. Create your component in `src/components/`
3. Document using the template
4. Add to this index

---

## 🎨 Design System

### Colors

**Primary Colors:**
- **Eucalyptus**: `#2E8B57` - Primary brand color (for CTAs like "Contact Us")
- **Ocean**: `#0077BE` - Secondary brand color (for links and accents)
- **Wattle**: `#FFD700` - Accent color (for highlights like "Trusted by 100+ Clients")

**Neutral Colors:**
- **Slate**: `#334155` - Text and UI elements
- **Sand**: `#F5F2EB` - Background color

**Feedback Colors:**
- **Terracotta**: `#BF553D` - Error states (e.g., form validation)
- **Green**: `#2E8B57` - Success states (e.g., submission confirmation)
- **Yellow**: `#FFD700` - Warning states (e.g., visa deadlines)

### Typography

- **Headings**: Inter font, 700 weight, -0.02em letter spacing (e.g., "Welcome to Genuine Solutions")
- **Body**: Inter font, 400-600 weight, 1.6 line height
- **Code**: Monospace font (for any visa code snippets)

### Spacing

Based on 8px grid system:
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

### Border Radius

- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 20px
- **2XL**: 24px

---

## ♿ Accessibility Guidelines

All components follow WCAG 2.1 Level AA guidelines:

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **Screen Readers**: Proper ARIA labels and semantic HTML (e.g., for contact form fields)
3. **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
4. **Focus Indicators**: Visible focus states for keyboard navigation
5. **Touch Targets**: Minimum 44x44px for mobile

---

## 🧪 Testing

### Component Testing

Run component tests:
```bash
npm test
```

### Accessibility Testing

```bash
npm run test:a11y
```

### Visual Regression Testing

```bash
npm run test:visual
```

---

## 📱 Responsive Design

All components are mobile-first and responsive:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

---

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## 👥 About Our Team

Our in-house team consists of:
- Full-time writers who are native English speakers
- University graduates in Migration Law and Bachelor of Laws
- Real-world experience across various industries (IT, Healthcare, Construction)

Use **Avatar** components to showcase team profiles (e.g., Lead Consultant, Visa Specialist).

---

## 📧 Contact Information

Reach out to us for consultations, inquiries, or service quotes. We respond promptly to help you get started.

### Contact Details
- **Email**: info@genuinesolutions.com.au
- **Phone**: +61 2 8317 3775
- **Location**: Sydney, Australia
- **Business Hours**: Monday - Friday, 9 AM - 5 PM AEST

### Contact Form
Available on the **ContactPage** with fields for:
- Name (Input)
- Email (Input)
- Service Type (Select dropdown)
- Message (Textarea)
- Privacy Consent (Checkbox)
- Submit triggers a Toast notification for success

**For urgent fast-track services**: Select the option in the form and expect a response within 24 hours.

---

## ✨ Unique Selling Points

1. **Expert Knowledge**: Specialized in recruitment and migration law
2. **Customized Services**: Tailored to your specific needs
3. **Integrity & Transparency**: Honest processes, no hidden fees
4. **Ongoing Support**: Free amendments and continued assistance
5. **Fast Turnaround**: Maximum 7 business days; 3-5 day fast track available
6. **Easy Process**: Submit one form, answer questions, provide information

---

## 💬 Testimonials

Integrate a **List** or Carousel of client quotes:
- "Genuine Solutions placed our ideal candidate in under a week!"
- "Professional CV service helped me land my dream job in Australia."
- "The 407 visa training plan was comprehensive and approved quickly."

Use **Stats** components to highlight "100+ Satisfied Clients".

---

## 📝 Contributing

When adding new components:

1. Follow the coding standards
2. Use TypeScript for type safety
3. Write comprehensive tests
4. Document using the template
5. Ensure accessibility compliance
6. Test on multiple browsers/devices

---

## 🔗 Related Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide Icons](https://lucide.dev)
- [Australian Department of Home Affairs](https://immi.homeaffairs.gov.au/)

---

## 🔗 Footer & Additional Links

### Navigation Links
- Home
- Services
- About
- Contact
- Privacy Policy

### Social Media
- **LinkedIn**: [linkedin.com/company/genuinesolutions-au](https://linkedin.com/company/genuinesolutions-au)
- **X/Twitter**: [@GenuineSolAU](https://twitter.com/GenuineSolAU)

### Legal
- © 2025 Genuine Solutions. All rights reserved.
- Terms of Service
- Privacy Policy

### Quick Actions
- **"Get a Free Quote"** Button linking to ContactPage
- **"Fast Track Service"** Badge highlighting expedited options

---

## 📞 Support

For questions or issues:
- Submit an inquiry via the ContactPage form
- Email: info@genuinesolutions.com.au
- Phone: +61 2 8317 3775
- Check existing documentation

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Company**: Genuine Solutions - Premier Recruitment & Visa Services Provider
