# Transaction History Component

A beautiful, responsive React Transaction History component for fintech applications featuring a unique **pyramid stacking animation**, theme switching, and smooth interactions.

![Transaction History Demo](demo/preview.gif)

## ✨ Features

- **Pyramid Stack Animation** - Cards elegantly stack into a layered pyramid when collapsed
- **Light/Dark Theme** - Smooth theme switching with circular wipe animation
- **Staggered Animations** - Cards animate with natural cascading delays
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **TypeScript** - Full type safety
- **Tailwind CSS** - Modern utility-first styling

## 🚀 Quick Preview

### Option 1: Open HTML Demo (No Setup Required)

Simply open `demo/index.html` in your browser:

```bash
# macOS
open demo/index.html

# Windows
start demo/index.html

# Linux
xdg-open demo/index.html
```

Or just double-click the file in your file explorer!

### Option 2: Use a Local Server

For the best experience with hot reloading:

```bash
# Using Python
python -m http.server 8000
# Then open http://localhost:8000/demo/index.html

# Using Node.js
npx serve .
# Then open http://localhost:3000/demo/index.html

# Using PHP
php -S localhost:8000
# Then open http://localhost:8000/demo/index.html
```

## 📦 Installation

```bash
npm install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
├── components/
│   └── TransactionHistory/
│       ├── TransactionHistory.tsx   # Main container with stacking logic
│       ├── TransactionItem.tsx      # Individual transaction card
│       ├── ThemeToggle.tsx          # Light/Dark theme toggle
│       ├── types.ts                 # TypeScript interfaces
│       ├── sampleData.ts            # Sample transaction data
│       └── index.ts                 # Exports
├── demo/
│   └── index.html                   # Standalone HTML demo
├── __tests__/                       # Test files
└── README.md
```

## 🎨 Usage

### React Component

```tsx
import { TransactionHistory, sampleTransactions } from './components/TransactionHistory';

function App() {
  return (
    <TransactionHistory transactions={sampleTransactions} />
  );
}
```

### Transaction Data Structure

```typescript
interface Transaction {
  id: string;
  name: string;
  initials: string;
  status: 'Completed' | 'Processing';
  amount: number; // Positive or negative
}
```

## 🎭 Interaction States

### Expanded State (Default)
- All transaction cards displayed in a vertical list
- Cards have 2px spacing between them
- "Hide all ↑" button visible

### Collapsed State (Pyramid Stack)
- First card fully visible and readable
- Remaining cards stack underneath with:
  - Progressive width reduction (100% → 96% → 92% → 88% → 84%)
  - 12px vertical offset per card
  - Subtle opacity fade for depth
- Only thin edges of stacked cards visible
- "See all ↓" button visible

## 🎬 Animations

- **Collapse/Expand**: 400ms cubic-bezier with staggered 60ms delays
- **Theme Switch**: Circular wipe overlay + card shimmer effect
- **Button**: Ripple effect on click + scale on hover

## 🛠 Technologies

- React 18 (Functional Components + Hooks)
- TypeScript
- Tailwind CSS
- Jest + React Testing Library

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
