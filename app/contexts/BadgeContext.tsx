import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BadgeContextType {
  marketBadgeCount: number;
  setMarketBadgeCount: (count: number) => void;
  incrementMarketBadge: () => void;
  clearMarketBadge: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export function BadgeProvider({ children }: { children: ReactNode }) {
  const [marketBadgeCount, setMarketBadgeCount] = useState(3); // Start with 3 boosted items

  const incrementMarketBadge = () => {
    setMarketBadgeCount((prev) => prev + 1);
  };

  const clearMarketBadge = () => {
    setMarketBadgeCount(0);
  };

  return (
    <BadgeContext.Provider
      value={{
        marketBadgeCount,
        setMarketBadgeCount,
        incrementMarketBadge,
        clearMarketBadge,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadge() {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useBadge must be used within a BadgeProvider');
  }
  return context;
}

// Default export for route compatibility
export default BadgeProvider;
