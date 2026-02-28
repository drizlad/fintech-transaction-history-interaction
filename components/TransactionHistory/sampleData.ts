import { Transaction } from './types';

/**
 * Sample transaction data for demonstration and testing purposes.
 * Includes varied statuses (Completed, Processing) and amounts (positive, negative).
 * 
 * Based on requirements 8.1, 8.2, 8.3:
 * - Transaction data structure: id, name, initials, status, amount
 * - Status values: 'Completed' | 'Processing'
 * - Amount values: positive and negative numbers
 */
export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Transfer to John A',
    initials: 'JA',
    status: 'Completed',
    amount: -1500,
  },
  {
    id: '2',
    name: 'Creator Payout',
    initials: 'X',
    status: 'Completed',
    amount: 3000,
  },
  {
    id: '3',
    name: 'Transfer to Ifeaynyi J',
    initials: 'IJ',
    status: 'Processing',
    amount: -500,
  },
  {
    id: '4',
    name: 'JP part payment',
    initials: 'JP',
    status: 'Completed',
    amount: 700,
  },
  {
    id: '5',
    name: 'Transfer to Stacy N',
    initials: 'SN',
    status: 'Completed',
    amount: -200,
  },
];
