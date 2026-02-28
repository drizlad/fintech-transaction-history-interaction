// TransactionHistory container component with pyramid stacking effect
import React, { useState, useRef, useCallback } from 'react';
import { TransactionHistoryProps, Theme } from './types';
import { TransactionItem } from './TransactionItem';
import { ThemeToggle } from './ThemeToggle';

// Inline styles for the animation CSS (injected once)
const animationCSS = `
  /* ── Collapse/expand animations ───────────────────────── */
  .tx-card {
    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
                width 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
                margin-bottom 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 300ms ease;
    will-change: transform, width, margin-bottom, opacity;
  }
  @keyframes cardExpandPop {
    0%   { transform: translateY(0) scale(0.95); opacity: 0.5; }
    60%  { transform: translateY(0) scale(1.02); opacity: 1; }
    100% { transform: translateY(0) scale(1);    opacity: 1; }
  }
  @keyframes cardCollapseTuck {
    0%   { opacity: 1; filter: blur(0); }
    50%  { opacity: 0.7; filter: blur(1px); }
    100% { opacity: 1; filter: blur(0); }
  }
  .tx-card.expand-pop   { animation: cardExpandPop 450ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .tx-card.collapse-tuck { animation: cardCollapseTuck 400ms ease both; }

  .toggle-btn {
    position: relative;
    overflow: hidden;
    transition: all 300ms ease;
  }
  .toggle-btn:hover  { transform: scale(1.05); }
  .toggle-btn:active { transform: scale(0.95); }
  .toggle-btn .arrow-icon {
    display: inline-block;
    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .toggle-btn.collapsed .arrow-icon { transform: rotate(180deg); }
  @keyframes btnRipple {
    0%   { transform: scale(0); opacity: 0.5; }
    100% { transform: scale(4); opacity: 0; }
  }
  .toggle-btn .ripple {
    position: absolute;
    border-radius: 50%;
    width: 20px; height: 20px;
    background: currentColor;
    animation: btnRipple 500ms ease-out forwards;
    pointer-events: none;
  }

  /* ── Theme transition animations ──────────────────────── */
  .theme-transition,
  .theme-transition * {
    transition: background-color 500ms ease,
                color 500ms ease,
                border-color 500ms ease,
                box-shadow 500ms ease !important;
  }
  .theme-transition .tx-card {
    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
      width 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
      margin-bottom 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 300ms ease,
      background-color 500ms ease,
      color 500ms ease,
      border-color 500ms ease !important;
  }

  .theme-wipe {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%) scale(0);
    animation: themeWipeExpand 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  @keyframes themeWipeExpand {
    0%   { transform: translate(-50%, -50%) scale(0);   opacity: 1; }
    70%  { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
  }

  @keyframes themeCardShimmer {
    0%   { filter: brightness(1); }
    40%  { filter: brightness(1.3); }
    100% { filter: brightness(1); }
  }
  .tx-card.theme-shimmer {
    animation: themeCardShimmer 500ms ease both;
  }

  .theme-pill {
    transition: background-color 300ms ease,
                color 300ms ease,
                box-shadow 300ms ease,
                transform 200ms ease !important;
  }
  .theme-pill:active { transform: scale(0.92); }
  .theme-pill-track {
    transition: background-color 400ms ease !important;
  }
`;

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  // State management
  const [theme, setTheme] = useState<Theme>('light');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // Default to expanded
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Animated theme change with circular wipe + card shimmer
  const handleThemeChange = useCallback((newTheme: Theme, e?: React.MouseEvent) => {
    if (newTheme === theme) return;
    setTheme(newTheme);

    // 1. Circular wipe overlay
    if (e) {
      const wipe = document.createElement('div');
      wipe.className = 'theme-wipe';
      wipe.style.background = newTheme === 'dark'
        ? 'radial-gradient(circle, rgba(17,24,39,0.7) 0%, rgba(17,24,39,0) 70%)'
        : 'radial-gradient(circle, rgba(243,244,246,0.8) 0%, rgba(243,244,246,0) 70%)';
      const size = Math.max(window.innerWidth, window.innerHeight) * 2.5;
      wipe.style.width = size + 'px';
      wipe.style.height = size + 'px';
      wipe.style.left = e.clientX + 'px';
      wipe.style.top = e.clientY + 'px';
      document.body.appendChild(wipe);
      setTimeout(() => wipe.remove(), 650);
    }

    // 2. Staggered shimmer on cards
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.classList.remove('theme-shimmer');
      void card.offsetWidth; // force reflow
      setTimeout(() => {
        card.classList.add('theme-shimmer');
      }, i * 80);
    });
  }, [theme]);

  // Calculate stacking styles for each card
  const getCardStyles = (index: number, collapsed: boolean) => {
    if (!collapsed) {
      // Expanded state: normal vertical list
      return {
        width: '100%',
        transform: 'translateY(0) scale(1)',
        zIndex: transactions.length - index,
        marginBottom: index < transactions.length - 1 ? '1px' : '0',
        opacity: 1,
      };
    }

    // Collapsed state: pyramid stacking effect
    const maxVisibleCards = 5;
    const cappedIndex = Math.min(index, maxVisibleCards - 1);
    const widthPercent = 100 - (cappedIndex * 4);
    const translateY = cappedIndex * 12;
    const zIndex = transactions.length - index;

    return {
      width: `${widthPercent}%`,
      transform: `translateY(${translateY}px) scale(1)`,
      zIndex,
      marginBottom: index < transactions.length - 1 ? '-85px' : '0',
      opacity: 1,
    };
  };

  // Animated toggle with staggered card transitions
  const handleToggleCollapse = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const nextCollapsed = !isCollapsed;
    setIsCollapsed(nextCollapsed);

    // Ripple effect on button
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX - rect.left - 10}px`;
      ripple.style.top = `${e.clientY - rect.top - 10}px`;
      btnRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    }

    // Update container margin
    if (containerRef.current) {
      containerRef.current.style.marginBottom = nextCollapsed ? '2rem' : '0';
    }

    // Stagger-animate each card in-place
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const styles = getCardStyles(index, nextCollapsed);
      const staggerDelay = index * 60;

      // Clear previous animation classes
      card.classList.remove('expand-pop', 'collapse-tuck');

      setTimeout(() => {
        card.style.width = styles.width;
        card.style.transform = styles.transform;
        card.style.zIndex = String(styles.zIndex);
        card.style.marginBottom = styles.marginBottom;

        if (nextCollapsed) {
          card.classList.add('collapse-tuck');
        } else {
          card.classList.add('expand-pop');
        }
      }, staggerDelay);
    });
  }, [isCollapsed, transactions.length]);

  return (
    <div ref={wrapperRef} className={`${theme === 'dark' ? 'dark' : ''} theme-transition`}>
      {/* Inject animation CSS */}
      <style>{animationCSS}</style>

      {/* Main container with theme-specific background and text colors */}
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-2 py-3 rounded-[16px]">
        {/* Theme toggle control */}
        <div className="mb-1.5">
          <div className="inline-flex rounded-full bg-gray-200 dark:bg-gray-700 p-1 theme-pill-track">
            <button
              onClick={(e) => handleThemeChange('light', e)}
              className={`theme-pill px-4 py-2 rounded-full text-sm font-medium ${theme === 'light'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg> Light
            </button>
            <button
              onClick={(e) => handleThemeChange('dark', e)}
              className={`theme-pill px-4 py-2 rounded-full text-sm font-medium ${theme === 'dark'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> Dark
            </button>
          </div>
        </div>

        {/* Transaction list container with pyramid stacking */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            marginBottom: isCollapsed ? '2rem' : '0',
            transition: 'margin-bottom 400ms ease',
          }}
        >
          {transactions.map((transaction, index) => {
            const styles = getCardStyles(index, isCollapsed);

            return (
              <div
                key={transaction.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="mx-auto tx-card"
                style={{
                  width: styles.width,
                  transform: styles.transform,
                  zIndex: styles.zIndex,
                  marginBottom: styles.marginBottom,
                  opacity: styles.opacity,
                  position: 'relative',
                }}
              >
                <div className="border border-[#DEE0E3] dark:border-gray-700 rounded-[14px]">
                  <TransactionItem transaction={transaction} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle button with animation */}
        {transactions.length > 1 && (
          <div className="text-center">
            <button
              ref={btnRef}
              onClick={handleToggleCollapse}
              className={`toggle-btn ${isCollapsed ? 'collapsed' : ''} mt-6 px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-full`}
            >
              {isCollapsed ? 'See all' : 'Hide all'}{' '}
              <span className="arrow-icon">↑</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
