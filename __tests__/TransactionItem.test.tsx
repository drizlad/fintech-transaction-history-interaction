/**
 * Unit tests for TransactionItem component
 * Tests specific examples and edge cases for transaction item rendering
 */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TransactionItem } from '../components/TransactionHistory/TransactionItem';
import { Transaction } from '../components/TransactionHistory/types';

describe('TransactionItem', () => {
  describe('Avatar Display', () => {
    it('should display initials in avatar', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'John Doe',
        initials: 'JD',
        status: 'Completed',
        amount: 100.50
      };
      
      render(<TransactionItem transaction={transaction} />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('Transaction Name Display', () => {
    it('should display transaction name', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Grocery Shopping',
        initials: 'GS',
        status: 'Completed',
        amount: -50.25
      };
      
      render(<TransactionItem transaction={transaction} />);
      expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
    });
  });

  describe('Status Badge Display', () => {
    it('should display Completed status with green background', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Payment',
        initials: 'PM',
        status: 'Completed',
        amount: 100
      };
      
      const { container } = render(<TransactionItem transaction={transaction} />);
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-green-100');
    });

    it('should display Processing status with orange background', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Payment',
        initials: 'PM',
        status: 'Processing',
        amount: 100
      };
      
      const { container } = render(<TransactionItem transaction={transaction} />);
      const statusBadge = screen.getByText('Processing');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-orange-100');
    });
  });

  describe('Amount Display', () => {
    it('should display positive amount with + prefix and green color', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Income',
        initials: 'IN',
        status: 'Completed',
        amount: 250.75
      };
      
      const { container } = render(<TransactionItem transaction={transaction} />);
      const amountElement = screen.getByText('+$250.75');
      expect(amountElement).toBeInTheDocument();
      expect(amountElement).toHaveClass('text-green-600');
    });

    it('should display negative amount with - prefix and red color', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Expense',
        initials: 'EX',
        status: 'Completed',
        amount: -150.50
      };
      
      const { container } = render(<TransactionItem transaction={transaction} />);
      const amountElement = screen.getByText('-$150.50');
      expect(amountElement).toBeInTheDocument();
      expect(amountElement).toHaveClass('text-red-600');
    });

    it('should display amount with semi-bold font weight', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Payment',
        initials: 'PM',
        status: 'Completed',
        amount: 100
      };
      
      const { container } = render(<TransactionItem transaction={transaction} />);
      const amountElement = screen.getByText('+$100.00');
      expect(amountElement).toHaveClass('font-semibold');
    });

    it('should display zero amount without prefix', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Zero Transaction',
        initials: 'ZT',
        status: 'Completed',
        amount: 0
      };
      
      const { container } = render(<TransactionItem transaction={transaction} />);
      const amountElement = screen.getByText('$0.00');
      expect(amountElement).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should render all required elements', () => {
      const transaction: Transaction = {
        id: '1',
        name: 'Test Transaction',
        initials: 'TT',
        status: 'Processing',
        amount: 99.99
      };
      
      render(<TransactionItem transaction={transaction} />);
      
      // Check all elements are present
      expect(screen.getByText('TT')).toBeInTheDocument();
      expect(screen.getByText('Test Transaction')).toBeInTheDocument();
      expect(screen.getByText('Processing')).toBeInTheDocument();
      expect(screen.getByText('+$99.99')).toBeInTheDocument();
    });
  });
});
