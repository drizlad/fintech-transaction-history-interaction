import React from 'react';
import { TransactionItemProps } from './types';

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { initials, name, status, amount } = transaction;

  // Determine amount styling and prefix
  const isNegative = amount < 0;
  const isPositive = amount > 0;
  const amountPrefix = isNegative ? '-' : isPositive ? '+' : '';
  const amountValue = Math.abs(amount).toFixed(2);
  const amountColorClass = 'text-gray-900 dark:text-gray-100';

  // Determine status badge styling
  const statusBgClass = status === 'Completed'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Left: Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {initials === 'X' ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm flex-shrink-0">
            {initials}
          </div>
        )}

        {/* Middle: Name and Status Badge */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="text-gray-900 dark:text-gray-100 font-medium text-sm sm:text-base truncate">
            {name}
          </div>
          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBgClass} w-fit`}>
            {status}
          </div>
        </div>
      </div>

      {/* Right: Amount (right-aligned) */}
      <div className={`text-right font-semibold text-sm sm:text-base ${amountColorClass} flex-shrink-0 ml-2`}>
        {amountPrefix}${amountValue}
      </div>
    </div>
  );
};
