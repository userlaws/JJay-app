import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { getOpenVenues, getClosedVenues } from '../data/hours.mock';

export default function OpenNowCard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const openVenues = getOpenVenues();
  const closedVenues = getClosedVenues();
  const hasOpenVenues = openVenues.length > 0;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e5e7eb',
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#111827' }]}>
          Open Now
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: hasOpenVenues
                ? isDark
                  ? '#064e3b'
                  : '#d1fae5'
                : isDark
                ? '#374151'
                : '#f3f4f6',
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: hasOpenVenues
                  ? isDark
                    ? '#10b981'
                    : '#059669'
                  : isDark
                  ? '#9ca3af'
                  : '#6b7280',
              },
            ]}
          >
            {hasOpenVenues ? 'OPEN' : 'CLOSED'}
          </Text>
        </View>
      </View>

      {openVenues.map((venue) => (
        <View key={venue.id} style={styles.venueItem}>
          <View style={styles.venueContent}>
            <Text
              style={[
                styles.venueName,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              {venue.name}
            </Text>
            {venue.description && (
              <Text
                style={[
                  styles.venueDescription,
                  { color: isDark ? '#9ca3af' : '#6b7280' },
                ]}
              >
                {venue.description}
              </Text>
            )}
          </View>
          <View style={styles.venueHours}>
            <Text
              style={[
                styles.hoursText,
                { color: isDark ? '#10b981' : '#059669' },
              ]}
            >
              {venue.open} - {venue.close}
            </Text>
            <View
              style={[styles.openIndicator, { backgroundColor: '#10b981' }]}
            />
          </View>
        </View>
      ))}

      {closedVenues.length > 0 && (
        <>
          <View style={styles.divider} />
          <Text
            style={[
              styles.closedTitle,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            Closed
          </Text>
          {closedVenues.slice(0, 2).map((venue) => (
            <View key={venue.id} style={styles.venueItem}>
              <View style={styles.venueContent}>
                <Text
                  style={[
                    styles.venueName,
                    { color: isDark ? '#9ca3af' : '#6b7280' },
                  ]}
                >
                  {venue.name}
                </Text>
                {venue.description && (
                  <Text
                    style={[
                      styles.venueDescription,
                      { color: isDark ? '#6b7280' : '#9ca3af' },
                    ]}
                  >
                    {venue.description}
                  </Text>
                )}
              </View>
              <View style={styles.venueHours}>
                <Text
                  style={[
                    styles.hoursText,
                    { color: isDark ? '#6b7280' : '#9ca3af' },
                  ]}
                >
                  {venue.nextOpen || 'Closed'}
                </Text>
                <View
                  style={[
                    styles.closedIndicator,
                    { backgroundColor: '#6b7280' },
                  ]}
                />
              </View>
            </View>
          ))}
        </>
      )}

      {openVenues.length === 0 && closedVenues.length === 0 && (
        <Text
          style={[styles.emptyText, { color: isDark ? '#9ca3af' : '#6b7280' }]}
        >
          No venue information available
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  venueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  venueContent: {
    flex: 1,
    marginRight: 12,
  },
  venueName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  venueDescription: {
    fontSize: 12,
    opacity: 0.8,
  },
  venueHours: {
    alignItems: 'flex-end',
  },
  hoursText: {
    fontSize: 13,
    fontWeight: '500',
  },
  openIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  closedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  closedTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});
