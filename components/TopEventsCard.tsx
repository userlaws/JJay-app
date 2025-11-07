import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { getUpcomingEvents, getLiveEvents } from '../data/events.mock';

export default function TopEventsCard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const upcomingEvents = getUpcomingEvents(3);
  const liveEvents = getLiveEvents();
  const hasLiveEvents = liveEvents.length > 0;

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
          Top Events
        </Text>
        {hasLiveEvents && (
          <View
            style={[
              styles.liveBadge,
              {
                backgroundColor: isDark ? '#1e3a8a' : '#dbeafe',
              },
            ]}
          >
            <Text
              style={[
                styles.liveText,
                { color: isDark ? '#93c5fd' : '#1e40af' },
              ]}
            >
              LIVE
            </Text>
          </View>
        )}
      </View>

      {upcomingEvents.map((event, index) => (
        <View key={event.id} style={styles.eventItem}>
          <View style={styles.eventContent}>
            <Text
              style={[
                styles.eventTitle,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              {event.title}
            </Text>
            {event.location && (
              <Text
                style={[
                  styles.eventLocation,
                  { color: isDark ? '#9ca3af' : '#6b7280' },
                ]}
              >
                📍 {event.location}
              </Text>
            )}
          </View>
          <View style={styles.eventTime}>
            <Text
              style={[
                styles.timeText,
                { color: isDark ? '#9ca3af' : '#6b7280' },
              ]}
            >
              {event.start} - {event.end}
            </Text>
            {event.isLive && (
              <View
                style={[styles.liveIndicator, { backgroundColor: '#ef4444' }]}
              />
            )}
          </View>
        </View>
      ))}

      {upcomingEvents.length === 0 && (
        <Text
          style={[styles.emptyText, { color: isDark ? '#9ca3af' : '#6b7280' }]}
        >
          No events scheduled for today
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
  liveBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  eventContent: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    opacity: 0.8,
  },
  eventTime: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});
