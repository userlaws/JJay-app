import { useState, useEffect, useCallback } from 'react';

// In-memory store for demo purposes
// In production, this would be replaced with API calls
interface MetricsData {
  impressions: Record<string, number>;
  taps: Record<string, number>;
  redemptions: Record<string, number>;
  lastImpression: Record<string, number>;
}

let metricsStore: MetricsData = {
  impressions: {},
  taps: {},
  redemptions: {},
  lastImpression: {},
};

// Session-based impression tracking (once per session)
const sessionImpressions = new Set<string>();

export function trackImpression(offerId: string) {
  // Only track once per session
  if (sessionImpressions.has(offerId)) {
    return;
  }

  sessionImpressions.add(offerId);
  metricsStore.impressions[offerId] =
    (metricsStore.impressions[offerId] || 0) + 1;
  metricsStore.lastImpression[offerId] = Date.now();

  // Enhanced logging for debugging (inspired by Stack Overflow examples)
  console.log(`📊 Impression tracked for offer ${offerId}`, {
    timestamp: new Date().toISOString(),
    sessionId: sessionImpressions.size,
    totalImpressions: metricsStore.impressions[offerId],
  });
}

export function trackTap(offerId: string) {
  metricsStore.taps[offerId] = (metricsStore.taps[offerId] || 0) + 1;
  console.log(`👆 Tap tracked for offer ${offerId}`);
}

export function trackRedemption(offerId: string) {
  metricsStore.redemptions[offerId] =
    (metricsStore.redemptions[offerId] || 0) + 1;
  console.log(`🎯 Redemption tracked for offer ${offerId}`);
}

export function getMetrics(offerId: string) {
  return {
    impressions: metricsStore.impressions[offerId] || 0,
    taps: metricsStore.taps[offerId] || 0,
    redemptions: metricsStore.redemptions[offerId] || 0,
    lastImpression: metricsStore.lastImpression[offerId] || 0,
  };
}

export function getAllMetrics() {
  return { ...metricsStore };
}

export function resetMetrics() {
  metricsStore = {
    impressions: {},
    taps: {},
    redemptions: {},
    lastImpression: {},
  };
  sessionImpressions.clear();
}

// Hook for components to use metrics
export function useOfferMetrics(offerId: string) {
  const [metrics, setMetrics] = useState(() => getMetrics(offerId));

  const updateMetrics = useCallback(() => {
    setMetrics(getMetrics(offerId));
  }, [offerId]);

  useEffect(() => {
    // Update metrics every 5 seconds for demo purposes
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  return {
    ...metrics,
    trackImpression: () => trackImpression(offerId),
    trackTap: () => trackTap(offerId),
    trackRedemption: () => trackRedemption(offerId),
  };
}
