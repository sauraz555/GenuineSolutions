# Genuine Solutions - Component Documentation

Welcome to the Genuine Solutions component documentation. This documentation provides comprehensive guides for all reusable components in the project.

## 📚 Documentation Structure

- **COMPONENT_TEMPLATE.md** - Template for creating new component documentation
- **components/** - Detailed documentation for each component

## 🎨 Component Library

### UI Components

#### Form Components
- [Button](./components/Button.md) - Primary interactive element for user actions
- Input - Text input fields with validation
- Select - Dropdown selection component
- Textarea - Multi-line text input
- Checkbox - Binary choice input
- Radio - Single choice from multiple options

#### Layout Components
- Card - Content container with consistent styling
- Header - Site-wide navigation header
- Footer - Site-wide footer with links
- Modal - Overlay dialog for focused interactions

#### Feedback Components
- Badge - Status indicators and labels
- Toast - Temporary notification messages
- Alert - Persistent notification messages
- Loading - Loading indicators and skeletons

#### Data Display
- Table - Structured data display
- List - Vertical list of items
- Avatar - User profile images
- Stats - Statistical data display

### Page Components

#### Authentication
- LoginPage - User login interface
- SignupPage - User registration interface

#### Applicant Portal
- JobBoardPage - Browse and search jobs
- CompleteProfilePage - Profile setup for job seekers
- ApplicationsPage - Track job applications

#### Employer Portal
- JobsManagementPage - Manage job listings
- PostJobPage - Create new job listings
- CandidatesPage - View and manage applicants

#### Admin Portal
- AdminDashboard - Overview and analytics
- UsersManagement - User administration
- EmployerVerification - Verify employer accounts
- JobModeration - Moderate job listings
- ContentManagement - Edit site content

## 🎯 Quick Start Guide

### Using Components

1. Import the component:
```tsx
import { Button } from '@/components/ui/Button';
```

2. Use with props:
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

3. Customize with className:
```tsx
<Button className="custom-styles">
  Custom Button
</Button>
```

### Creating New Components

1. Copy `COMPONENT_TEMPLATE.md`
2. Create your component in `src/components/`
3. Document using the template
4. Add to this index

## 🎨 Design System

### Colors

**Primary Colors:**
- Eucalyptus: `#2E8B57` - Primary brand color
- Ocean: `#0077BE` - Secondary brand color
- Wattle: `#FFD700` - Accent color

**Neutral Colors:**
- Slate: `#334155` - Text and UI elements
- Sand: `#F5F2EB` - Background color

**Feedback Colors:**
- Terracotta: `#BF553D` - Error states
- Green: Success states
- Yellow: Warning states

### Typography

- **Headings**: Inter font, 700 weight, -0.02em letter spacing
- **Body**: Inter font, 400-600 weight, 1.6 line height
- **Code**: Monospace font

### Spacing

Based on 8px grid system:
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px

### Border Radius

- SM: 8px
- MD: 12px
- LG: 16px
- XL: 20px
- 2XL: 24px

## ♿ Accessibility Guidelines

All components follow WCAG 2.1 Level AA guidelines:

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **Screen Readers**: Proper ARIA labels and semantic HTML
3. **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
4. **Focus Indicators**: Visible focus states for keyboard navigation
5. **Touch Targets**: Minimum 44x44px for mobile

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

## 📱 Responsive Design

All components are mobile-first and responsive:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 📝 Contributing

When adding new components:

1. Follow the coding standards
2. Use TypeScript for type safety
3. Write comprehensive tests
4. Document using the template
5. Ensure accessibility compliance
6. Test on multiple browsers/devices

## 🔗 Related Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide Icons](https://lucide.dev)

## 📞 Support

For questions or issues:
- Create an issue in the project repository
- Contact the development team
- Check existing documentation

---

**Last Updated**: November 2024
**Version**: 1.0.0
