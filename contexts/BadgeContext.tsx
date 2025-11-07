import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BadgeContextType {
  marketBadgeCount: number;
  setMarketBadgeCount: (count: number) => void;
  incrementMarketBadge: () => void;
  clearMarketBadge: () => void;
  notificationBadgeCount: number;
  setNotificationBadgeCount: (count: number) => void;
  incrementNotificationBadge: () => void;
  clearNotificationBadge: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export function BadgeProvider({ children }: { children: ReactNode }) {
  const [marketBadgeCount, setMarketBadgeCount] = useState(3); // Start with 3 boosted items
  const [notificationBadgeCount, setNotificationBadgeCount] = useState(2); // Start with 2 notifications

  const incrementMarketBadge = () => {
    setMarketBadgeCount((prev) => prev + 1);
  };

  const clearMarketBadge = () => {
    setMarketBadgeCount(0);
  };

  const incrementNotificationBadge = () => {
    setNotificationBadgeCount((prev) => prev + 1);
  };

  const clearNotificationBadge = () => {
    setNotificationBadgeCount(0);
  };

  return (
    <BadgeContext.Provider
      value={{
        marketBadgeCount,
        setMarketBadgeCount,
        incrementMarketBadge,
        clearMarketBadge,
        notificationBadgeCount,
        setNotificationBadgeCount,
        incrementNotificationBadge,
        clearNotificationBadge,
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
