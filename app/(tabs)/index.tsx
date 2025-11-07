import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import TopEventsCard from '../../components/TopEventsCard';
import OpenNowCard from '../../components/OpenNowCard';
import SponsoredTile from '../../components/SponsoredTile';
import { useOfferMetrics } from '../../lib/metrics';
import { useBadge } from '../contexts/BadgeContext';

export default function TodayScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { notificationBadgeCount } = useBadge();

  // Analytics tracking for sponsored content
  const coffeeMetrics = useOfferMetrics('coffee-offer');
  const bookMetrics = useOfferMetrics('book-offer');

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header with Notification Bell */}
      <View style={styles.topHeader}>
        <View style={styles.headerContent}>
          <Text
            style={[styles.title, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            Today @ JJAY
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}
          >
            Welcome back! Here's what's happening today.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.notificationBell}
          onPress={() => {
            console.log('Notification bell pressed');
          }}
        >
          <Feather
            name='bell'
            size={24}
            color={isDark ? '#ffffff' : '#111827'}
          />
          {notificationBadgeCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {notificationBadgeCount > 99 ? '99+' : notificationBadgeCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Components */}
        <TopEventsCard />
        <OpenNowCard />

        {/* Sponsored Section */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            Sponsored
          </Text>

          <SponsoredTile
            id='coffee-offer'
            title='Free Coffee'
            subtitle='Scan to redeem at campus café'
            color='#2563eb'
            status='OPEN'
            onImpression={coffeeMetrics.trackImpression}
            onTap={coffeeMetrics.trackTap}
          />

          <SponsoredTile
            id='book-offer'
            title='Study Group Discount'
            subtitle='20% off textbooks at campus store'
            color='#16a34a'
            status='OPEN'
            onImpression={bookMetrics.trackImpression}
            onTap={bookMetrics.trackTap}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
  },
  notificationBell: {
    position: 'relative',
    padding: 8,
    marginTop: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    paddingTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.4,
  },
});
