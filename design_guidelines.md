# Personal Finance Dashboard Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for financial applications, emphasizing clarity, trust, and data accessibility. Drawing inspiration from modern fintech applications like Mint, YNAB, and banking dashboards.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 91% 25% (Deep blue for trust and stability)
- Secondary: 220 15% 95% (Light gray backgrounds)
- Success: 142 76% 36% (Green for income/positive)
- Warning: 38 92% 50% (Orange for transfers)
- Error: 0 84% 60% (Red for expenses/negative)
- Background: 0 0% 100% (Pure white)
- Surface: 220 14% 96% (Card backgrounds)

**Dark Mode:**
- Primary: 220 91% 60% (Lighter blue for contrast)
- Secondary: 220 15% 15% (Dark gray backgrounds)
- Success: 142 69% 58% (Brighter green)
- Warning: 38 92% 65% (Brighter orange)
- Error: 0 72% 70% (Softer red)
- Background: 220 13% 9% (Deep dark)
- Surface: 220 13% 14% (Card backgrounds)

### Typography
- **Primary**: Inter (Google Fonts) - Clean, readable for financial data
- **Accent**: JetBrains Mono (Google Fonts) - For monetary values and numbers
- **Sizes**: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

### Layout System
**Spacing Units**: Consistent use of 4, 6, 8, 12, 16, and 24 (p-4, m-6, gap-8, etc.)
**Grid**: 12-column responsive grid with consistent gutters

### Component Library

#### Navigation
- **Navbar**: Fixed top navigation with logo, user avatar, and logout
- **Mobile**: Hamburger menu with slide-out drawer
- **Active states**: Subtle background highlight for current section

#### Dashboard Cards
- **Balance Card**: Large prominent card showing current balance with subtle shadow
- **Quick Actions**: Grid of action cards (Add Income, Add Expense, Transfer Money)
- **Summary Cards**: 2x2 grid showing Total Income, Expenses, Transfers, Net Worth
- **Elevation**: Consistent shadow system using shadow-sm, shadow-md

#### Forms & Modals
- **Modal Overlays**: Semi-transparent backdrop (bg-black/50)
- **Form Cards**: White/dark surface with rounded corners (rounded-xl)
- **Input Fields**: Consistent padding (px-4 py-3), border styling
- **Buttons**: Primary (filled), Secondary (outline), Destructive (red)

#### Data Display
- **Transaction Table**: Alternating row colors, hover states
- **Category Tags**: Rounded badges with category-specific colors
- **Amount Display**: Monospace font, color-coded (green/red/orange)
- **Date Formatting**: Consistent relative time display

#### Interactive Elements
- **Loading States**: Subtle skeleton screens and spinners
- **Empty States**: Friendly illustrations and clear CTAs
- **Error States**: Inline validation with clear messaging

### Responsive Behavior
- **Mobile**: Single column stack, bottom sheet modals
- **Tablet**: 2-column layout for cards, sidebar navigation
- **Desktop**: 3-4 column dashboard grid, inline modals

### Trust & Security Indicators
- **Secure badges**: SSL indicators in forms
- **Balance visibility toggle**: Eye icon to hide/show amounts
- **Transaction confirmations**: Clear success states

### Accessibility
- **Color contrast**: WCAG AA compliant ratios
- **Focus indicators**: Clear keyboard navigation
- **Screen reader**: Semantic HTML and ARIA labels
- **Dark mode**: Complete implementation across all components

### Key UX Principles
1. **Financial Clarity**: Always show current balance prominently
2. **Quick Actions**: One-click access to common tasks
3. **Transaction Context**: Clear categorization and descriptions
4. **Progressive Disclosure**: Summary first, details on demand
5. **Trust Indicators**: Secure, professional appearance throughout