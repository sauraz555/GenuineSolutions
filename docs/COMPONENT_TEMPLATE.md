# Component Documentation Template

Use this template to document all reusable components in the Genuine Solutions project.

---

## Component Name

### Overview

**Purpose**: Brief description of what this component does and when to use it.

**Location**: `src/components/[category]/ComponentName.tsx`

**Dependencies**: List any external libraries or internal components this relies on.

---

### Props / Parameters

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| propName | string | Yes | - | Description of what this prop does |
| onClick | function | No | undefined | Callback function when clicked |
| variant | 'primary' \| 'secondary' | No | 'primary' | Visual variant of component |
| disabled | boolean | No | false | Whether component is disabled |
| children | ReactNode | Yes | - | Content to render inside |

---

### Usage Examples

#### Basic Usage

```tsx
import { ComponentName } from '@/components/ui/ComponentName';

function MyPage() {
  return (
    <ComponentName>
      Basic content
    </ComponentName>
  );
}
```

#### With Props

```tsx
<ComponentName
  variant="secondary"
  onClick={() => console.log('clicked')}
  disabled={false}
>
  Click me
</ComponentName>
```

#### Advanced Usage

```tsx
// Example showing more complex usage patterns
const [isOpen, setIsOpen] = useState(false);

<ComponentName
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  customProp="value"
>
  <div>Complex content</div>
</ComponentName>
```

---

### Variants / States

#### Visual Variants

- **Primary**: Default appearance, used for main actions
- **Secondary**: Alternative appearance for secondary actions
- **Outline**: Outlined version for less prominent actions
- **Ghost**: Minimal appearance for tertiary actions

#### Interactive States

- **Default**: Normal resting state
- **Hover**: When user hovers over component
- **Active**: When component is being clicked/pressed
- **Disabled**: When component is non-interactive
- **Loading**: When component is processing an action

---

### Styling

#### CSS Classes

- Base classes applied to all variants
- Variant-specific classes
- State-specific classes (hover, active, disabled)

#### Customization

```tsx
// Using className prop to extend styles
<ComponentName className="custom-class additional-class">
  Content
</ComponentName>
```

#### Tailwind Classes

Document key Tailwind classes used and their purpose:
- `rounded-xl`: Component border radius
- `shadow-md`: Drop shadow effect
- `transition-all`: Smooth animations

---

### Accessibility

#### Keyboard Navigation

- **Tab**: Describe tab behavior
- **Enter/Space**: Describe activation behavior
- **Escape**: Describe dismiss/close behavior
- **Arrow keys**: Describe navigation within component

#### Screen Readers

- ARIA labels and their purpose
- ARIA roles applied
- ARIA states (expanded, selected, etc.)
- Screen reader announcements

#### Focus Management

- Focus indicator visibility
- Focus trapping (for modals)
- Return focus behavior

#### Color Contrast

- Meets WCAG 2.1 Level AA (4.5:1 for normal text)
- Meets WCAG 2.1 Level AAA (7:1 for normal text) - if applicable
- State indicators don't rely solely on color

---

### Edge Cases & Error Handling

#### Boundary Conditions

1. **Empty/Null Values**: What happens with empty or null props
2. **Very Long Content**: Behavior with text overflow
3. **Missing Required Props**: How component handles missing data
4. **Rapid Interactions**: Behavior with quick repeated clicks/actions

#### Error States

```tsx
// Error state example
<ComponentName error="Error message">
  Content with error
</ComponentName>
```

#### Loading States

```tsx
// Loading state example
<ComponentName isLoading={true}>
  Loading content...
</ComponentName>
```

#### Validation

- Client-side validation rules
- Error message display
- Validation timing (onBlur, onChange, onSubmit)

---

### Performance Considerations

#### Rendering

- Does component re-render unnecessarily?
- Any memoization applied?
- Virtual scrolling for large lists?

#### Asset Loading

- Image lazy loading
- Code splitting considerations
- Bundle size impact

---

### Testing

#### Unit Tests

```tsx
describe('ComponentName', () => {
  it('renders correctly', () => {
    // Test implementation
  });

  it('handles click events', () => {
    // Test implementation
  });

  it('applies correct variant classes', () => {
    // Test implementation
  });
});
```

#### Accessibility Tests

- Keyboard navigation tests
- Screen reader compatibility
- ARIA attribute validation

---

### Browser Compatibility

- Chrome: ✅ Supported
- Firefox: ✅ Supported
- Safari: ✅ Supported
- Edge: ✅ Supported
- Mobile browsers: ✅ Supported

**Known Issues**: List any browser-specific quirks or limitations

---

### Related Components

- **ComponentA**: Brief description of relationship
- **ComponentB**: When to use this instead
- **ComponentC**: Can be used together for X purpose

---

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-15 | 1.0.0 | Initial component creation | Name |
| 2024-02-01 | 1.1.0 | Added new variant | Name |

---

### Additional Notes

Any other important information, gotchas, or tips for using this component.

### Code Sandbox / Live Examples

Links to CodeSandbox, Storybook, or live examples demonstrating the component.
