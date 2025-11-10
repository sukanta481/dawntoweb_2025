# Digital Marketing Agency Website Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from modern agency and SaaS leaders:
- **Vercel/Linear**: Clean typography, generous spacing, subtle animations
- **Stripe**: Minimal yet sophisticated, clear hierarchy
- **Agency Standards**: Dribbble/Behance top agencies for portfolio presentation

## Typography System
**Font Families** (Google Fonts):
- Headlines: Inter (700, 800 weights) - bold, modern
- Body: Inter (400, 500 weights) - clean readability
- Accents: Space Grotesk (600) - for special callouts/stats

**Hierarchy**:
- Hero headline: text-6xl/text-7xl lg:text-8xl
- Section headlines: text-4xl lg:text-5xl
- Subsections: text-2xl lg:text-3xl
- Body text: text-base lg:text-lg
- Small text: text-sm

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 to gap-12
- Container: max-w-7xl mx-auto px-6

**Grid Strategy**:
- Services: 3-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Team: 4-column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Portfolio: Masonry-style or 3-column filterable grid
- Tools section: 2-column feature comparison

## Page Structure (7-8 Sections)

### 1. Hero Section (80vh)
Full-width background image with gradient overlay, centered content with headline, subheadline, dual CTA buttons (primary + secondary), trust indicator badges below

### 2. Services Showcase
Grid of 6 service cards with:
- Icon (Heroicons via CDN)
- Service name
- Brief description (2-3 lines)
- "Learn More" link
Cards with subtle shadow, border, hover lift effect (translate-y-1)

### 3. Stats/Impact Bar
Single row, 4-column stat display showing metrics (clients served, projects completed, ROI delivered, years experience)

### 4. Portfolio Gallery
Filterable grid with category tabs (All, Branding, Web Design, Social Media, SEO)
- Project cards with image, title, category tag
- Hover reveals project description overlay
- Modal or detail page for project case studies

### 5. Team Section
4-column grid of team members:
- Professional headshot (circular or square with rounded corners)
- Name, role, specialization
- Social media icons (LinkedIn, Twitter)
- Brief bio (2 sentences)

### 6. Digital Marketing Tools
2-column layout alternating image/content:
- Tool screenshot/mockup on one side
- Features list, benefits, "Start Free Trial" CTA on other
- Showcase 2-3 proprietary tools

### 7. Testimonials/Social Proof
3-column testimonial cards with client photo, quote, name, company
Include company logos strip above or below

### 8. Contact/Lead Generation
2-column split:
- Left: Contact form (Name, Email, Service Interest dropdown, Message, Submit button)
- Right: Contact information (address, phone, email, hours), embedded map placeholder

### 9. Footer
Multi-column footer:
- Company info + newsletter signup (left)
- Quick links navigation (center)
- Social media + contact details (right)
- Copyright bar at bottom

## Component Library

**Navigation Header** (Sticky):
- Logo left, navigation center, "Get Started" CTA right
- Transparent on hero, solid background on scroll
- Mobile hamburger menu

**Buttons**:
- Primary: Solid fill, rounded-lg, px-8 py-3
- Secondary: Outline style with border
- Glass-morphism for hero CTAs (backdrop-blur-md with semi-transparent background)

**Cards**:
- Service cards: Minimal border, p-6 to p-8, hover shadow increase
- Portfolio cards: No border, overflow-hidden for image, overlay on hover
- Team cards: Centered layout, consistent photo aspect ratio

**Form Elements**:
- Input fields: border, rounded-md, px-4 py-3
- Consistent focus states with ring
- Clear error/success states

## Images

**Required Images**:
1. **Hero**: Large hero image (1920x1080) - modern office environment, team collaboration, or abstract digital marketing visualization with gradient overlay
2. **Portfolio Projects**: 6-9 project thumbnails (800x600) showing website mockups, branding work, campaign visuals
3. **Team Members**: 4-6 professional headshots (400x400) on clean background
4. **Tool Screenshots**: 2-3 dashboard/interface mockups (1200x800) of proprietary tools
5. **Testimonial Clients**: Client headshots (200x200) circular crops
6. **Company Logos**: 8-10 client company logos for social proof strip

## Animations
**Minimal, Purposeful**:
- Hero fade-in on load
- Scroll-triggered fade-up for sections (once, not repeating)
- Card hover lifts (subtle translate-y)
- Navigation background transition on scroll
- Portfolio filter transitions (fade between categories)

NO carousel/slider animations, auto-playing elements, or parallax effects

## Accessibility
- Semantic HTML5 structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Form labels and validation messages
- Sufficient contrast ratios
- Focus indicators on all interactive elements