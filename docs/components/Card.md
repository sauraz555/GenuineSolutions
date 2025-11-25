# Card Component

### Overview

**Purpose**: A flexible container component that provides consistent styling, elevation, and structure for grouping related content. Used extensively throughout the platform for displaying information, forms, and interactive elements.

**Location**: `src/components/ui/Card.tsx`

**Dependencies**:
- React
- Tailwind CSS

**Exports**:
- `Card` - Main container component
- `CardHeader` - Header section wrapper
- `CardTitle` - Title element with consistent styling
- `CardContent` - Main content area
- `CardFooter` - Footer section with top border

---

### Props / Parameters

#### Card

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | - | Content to render inside the card |
| className | string | No | '' | Additional CSS classes to apply |
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | No | 'md' | Internal padding size |
| hoverable | boolean | No | false | Enables hover effects (lift + shadow) |

#### CardHeader, CardContent, CardFooter, CardTitle

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | - | Content to render |
| className | string | No | '' | Additional CSS classes |

---

### Usage Examples

#### Basic Card

```tsx
import { Card, CardContent } from '@/components/ui/Card';

function MyComponent() {
  return (
    <Card>
      <CardContent>
        <p>Simple card content</p>
      </CardContent>
    </Card>
  );
}
```

#### Card with Header and Title

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Name: John Smith</p>
    <p>Email: john@example.com</p>
  </CardContent>
</Card>
```

#### Card with Footer

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

<Card>
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Are you sure you want to proceed?</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </CardFooter>
</Card>
```

#### Hoverable Card (Interactive)

```tsx
{/* Perfect for clickable items, job listings, etc. */}
<Card
  hoverable
  className="cursor-pointer"
  onClick={() => navigate('/details')}
>
  <CardContent>
    <h3 className="font-semibold mb-2">Software Engineer</h3>
    <p className="text-gray-600">Sydney, NSW</p>
  </CardContent>
</Card>
```

#### Different Padding Sizes

```tsx
{/* No padding - full control over spacing */}
<Card padding="none">
  <img src="header.jpg" className="w-full" />
  <div className="p-6">
    <h3>Custom Padded Content</h3>
  </div>
</Card>

{/* Small padding - compact cards */}
<Card padding="sm">
  <CardContent>Compact content</CardContent>
</Card>

{/* Large padding - spacious layout */}
<Card padding="lg">
  <CardContent>Spacious content</CardContent>
</Card>
```

#### Form in Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Sign In</CardTitle>
    <p className="text-gray-600 text-sm">Enter your credentials</p>
  </CardHeader>
  <CardContent>
    <form className="space-y-4">
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
    </form>
  </CardContent>
  <CardFooter>
    <Button fullWidth>Sign In</Button>
  </CardFooter>
</Card>
```

#### Grid of Cards

```tsx
<div className="grid md:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} hoverable>
      <CardContent>
        <h3 className="font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

#### Card with Custom Background

```tsx
<Card className="bg-gradient-to-br from-eucalyptus to-ocean text-white">
  <CardHeader>
    <CardTitle className="text-white">Special Offer</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Limited time promotion!</p>
  </CardContent>
</Card>
```

---

### Variants / States

#### Padding Variants

- **None** (`padding="none"`)
  - No internal padding
  - Use when: Full control over spacing needed (images, custom layouts)

- **Small** (`padding="sm"`)
  - Padding: 16px (1rem)
  - Use when: Compact cards, sidebars, mobile layouts

- **Medium** (`padding="md"`) - DEFAULT
  - Padding: 24px (1.5rem)
  - Use when: Standard cards, most use cases

- **Large** (`padding="lg"`)
  - Padding: 32px (2rem)
  - Use when: Forms, feature cards, hero sections

#### Interactive States

- **Default**: White background, subtle shadow, rounded corners
- **Hoverable**: When `hoverable={true}`:
  - Hover: Lifts up (-4px translate), larger shadow
  - Active: Maintains lifted state
  - Transition: Smooth 300ms animation

---

### Styling

#### CSS Classes Applied

**Card Base Classes**:
```
bg-white rounded-2xl shadow-sm border border-gray-100
transition-all duration-300
```

**Hoverable Classes** (when hoverable=true):
```
hover:shadow-xl hover:-translate-y-1
```

**Padding Classes**:
- None: (no class)
- Small: `p-4`
- Medium: `p-6`
- Large: `p-8`

**CardHeader Classes**:
```
mb-4
```

**CardTitle Classes**:
```
text-xl font-semibold text-gray-900
```

**CardFooter Classes**:
```
mt-4 pt-4 border-t border-gray-200
```

#### Customization Examples

```tsx
{/* Custom shadow */}
<Card className="shadow-2xl">
  <CardContent>Heavy shadow card</CardContent>
</Card>

{/* Custom border */}
<Card className="border-2 border-eucalyptus">
  <CardContent>Highlighted border</CardContent>
</Card>

{/* Dark mode card */}
<Card className="bg-slate text-white border-slate">
  <CardContent>Dark themed card</CardContent>
</Card>

{/* Transparent card */}
<Card className="bg-transparent shadow-none">
  <CardContent>No background</CardContent>
</Card>
```

---

### Accessibility

#### Keyboard Navigation

- Cards themselves are not focusable unless interactive
- Interactive cards should use `<button>` or `<a>` wrapper:

```tsx
{/* Good - Semantic button wrapper */}
<button
  onClick={handleClick}
  className="text-left w-full"
>
  <Card hoverable>
    <CardContent>Clickable content</CardContent>
  </Card>
</button>

{/* Good - Link wrapper for navigation */}
<a href="/details">
  <Card hoverable>
    <CardContent>Link content</CardContent>
  </Card>
</a>
```

#### Screen Readers

**ARIA Attributes**:
- Use semantic HTML within cards (`<article>`, `<section>`)
- Add `aria-label` to cards without visible titles
- Use `<h2>`, `<h3>` for CardTitle for proper heading hierarchy

```tsx
{/* Proper heading hierarchy */}
<Card>
  <CardHeader>
    <CardTitle as="h2">Main Section</CardTitle>
  </CardHeader>
  <CardContent>
    <h3>Subsection</h3>
    <p>Content</p>
  </CardContent>
</Card>

{/* Card representing article */}
<Card as="article" aria-labelledby="job-title">
  <CardHeader>
    <CardTitle id="job-title">Software Engineer</CardTitle>
  </CardHeader>
  <CardContent>
    Job description...
  </CardContent>
</Card>
```

#### Focus Management

- Cards don't receive focus unless interactive
- Interactive cards need visible focus indicator:

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-eucalyptus rounded-2xl">
  <Card hoverable>
    <CardContent>Accessible interactive card</CardContent>
  </Card>
</button>
```

#### Color Contrast

✅ **WCAG 2.1 Level AAA Compliant**

- White background with dark text: 21:1 ratio
- Border contrast: 3:1 minimum (gray-100 border)
- CardFooter border: 3:1 minimum (gray-200)

---

### Edge Cases & Error Handling

#### Boundary Conditions

1. **Empty Card**:
   ```tsx
   {/* Valid but not recommended - renders empty box */}
   <Card />

   {/* Better - always provide content */}
   <Card>
     <CardContent>
       <p>No data available</p>
     </CardContent>
   </Card>
   ```

2. **Very Long Content**:
   ```tsx
   {/* Content overflows naturally */}
   <Card>
     <CardContent>
       <p>{veryLongText}</p>
     </CardContent>
   </Card>

   {/* Truncate if needed */}
   <Card>
     <CardContent>
       <p className="line-clamp-3">{veryLongText}</p>
     </CardContent>
   </Card>
   ```

3. **Nested Cards**:
   ```tsx
   {/* Avoid nesting cards - use divs instead */}
   <Card>
     <CardContent>
       <div className="p-4 bg-gray-50 rounded-lg">
         Nested content box
       </div>
     </CardContent>
   </Card>
   ```

4. **Missing Sections**:
   ```tsx
   {/* All sections are optional */}
   <Card>
     {/* Can use just content without header/footer */}
     <CardContent>
       Simple content
     </CardContent>
   </Card>
   ```

#### Loading States

```tsx
{/* Loading skeleton */}
<Card>
  <CardContent>
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </CardContent>
</Card>

{/* Loading spinner */}
<Card>
  <CardContent className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-eucalyptus"></div>
  </CardContent>
</Card>
```

#### Empty States

```tsx
<Card>
  <CardContent className="text-center py-12">
    <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No items found
    </h3>
    <p className="text-gray-600 mb-4">
      Get started by creating your first item
    </p>
    <Button>Create Item</Button>
  </CardContent>
</Card>
```

---

### Performance Considerations

#### Rendering

- ✅ **Lightweight**: Minimal overhead, renders quickly
- ✅ **Memoization**: Not needed unless rendering 100+ cards
- ✅ **Virtualization**: Consider for long lists of cards

```tsx
{/* For large lists, use virtualization */}
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={200}
>
  {({ index, style }) => (
    <div style={style}>
      <Card>
        <CardContent>{items[index].content}</CardContent>
      </Card>
    </div>
  )}
</FixedSizeList>
```

#### Animation Performance

- ✅ Uses GPU-accelerated transforms (translateY)
- ✅ Smooth transitions with `duration-300`
- ✅ No layout reflow - only transform and shadow

---

### Testing

#### Unit Tests

```tsx
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <CardContent>Test Content</CardContent>
      </Card>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies padding classes correctly', () => {
    const { container } = render(
      <Card padding="lg">
        <CardContent>Content</CardContent>
      </Card>
    );

    expect(container.firstChild).toHaveClass('p-8');
  });

  it('applies hoverable classes when prop is true', () => {
    const { container } = render(
      <Card hoverable>
        <CardContent>Content</CardContent>
      </Card>
    );

    expect(container.firstChild).toHaveClass('hover:shadow-xl');
    expect(container.firstChild).toHaveClass('hover:-translate-y-1');
  });

  it('renders all card sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <CardContent>Content</CardContent>
      </Card>
    );

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('bg-white');
  });
});
```

---

### Browser Compatibility

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 90+ | ✅ Fully Supported | All features work |
| Firefox | 88+ | ✅ Fully Supported | All features work |
| Safari | 14+ | ✅ Fully Supported | All features work |
| Edge | 90+ | ✅ Fully Supported | All features work |
| Mobile Safari | iOS 14+ | ✅ Fully Supported | Touch interactions work |
| Chrome Mobile | Latest | ✅ Fully Supported | All features work |

**Known Issues**: None

---

### Related Components

- **Button**: Commonly used in CardFooter for actions
- **Badge**: Often used in CardHeader for status indicators
- **Avatar**: Frequently paired in user profile cards
- **List**: Cards can contain lists of items

#### Common Patterns

```tsx
{/* User Card Pattern */}
<Card hoverable>
  <CardContent className="flex items-center gap-4">
    <Avatar src={user.avatar} />
    <div>
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.role}</p>
    </div>
    <Badge variant="success" className="ml-auto">
      Active
    </Badge>
  </CardContent>
</Card>

{/* Stat Card Pattern */}
<Card>
  <CardContent className="text-center">
    <p className="text-4xl font-bold text-eucalyptus">1,234</p>
    <p className="text-sm text-gray-600 mt-1">Total Users</p>
  </CardContent>
</Card>

{/* Action Card Pattern */}
<Card hoverable>
  <CardHeader>
    <CardTitle>Feature Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-600">Description of the feature</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" fullWidth>
      Learn More
    </Button>
  </CardFooter>
</Card>
```

---

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-15 | 1.0.0 | Initial card component creation | Team |
| 2024-11-24 | 1.1.0 | Updated to rounded-2xl from rounded-lg | Team |
| 2024-11-24 | 1.2.0 | Added border-gray-100 for subtle depth | Team |
| 2024-11-24 | 1.3.0 | Enhanced hover effects with translate | Team |

---

### Additional Notes

**Design Philosophy**: Cards provide visual grouping and hierarchy. Use sparingly - too many cards can fragment the interface.

**When to Use Cards**:
- ✅ Grouping related information
- ✅ Interactive items in a list or grid
- ✅ Forms and data entry
- ✅ Dashboard widgets
- ✅ Product/job listings

**When NOT to Use Cards**:
- ❌ Simple text blocks (use divs)
- ❌ Every piece of content (creates visual noise)
- ❌ Large forms (use one card for entire form)
- ❌ Navigation menus

**Best Practices**:
1. Maintain consistent padding across similar cards
2. Use CardTitle for proper heading hierarchy
3. Keep card content focused on one topic
4. Use CardFooter for actions related to card content
5. Consider hover effects for interactive cards
6. Avoid deeply nested cards (max 1 level)

**Performance Tips**:
- Use virtualization for lists of 50+ cards
- Lazy load images within cards
- Consider pagination for large datasets
- Memoize card content if re-rendering frequently
