// TypeScript interfaces for Transaction History Component

export interface Transaction {
  id: string;
  name: string;
  initials: string;
  status: 'Completed' | 'Processing';
  amount: number;
}

export interface TransactionItemProps {
  transaction: Transaction;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
}

export type Theme = 'light' | 'dark';

export interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}
