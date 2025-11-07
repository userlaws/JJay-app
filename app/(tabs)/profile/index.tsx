import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

// Mock data for profile
const MOCK_USER = {
  name: 'Alex Johnson',
  studentId: 'JJAY2024',
  email: 'alex.johnson@student.jjay.cuny.edu',
  major: 'Computer Science',
  year: 'Junior',
  avatar: 'AJ',
  memberSince: 'Fall 2022',
  rating: 4.9,
  totalSales: 23,
  totalListings: 15,
  activeListings: 3,
};

const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'Calculus Textbook - 12th Edition',
    price: '$85.00',
    status: 'available',
    timeAgo: '2 hours ago',
    views: 45,
  },
  {
    id: '2',
    title: 'TI-84 Plus Calculator',
    price: '$70.00',
    status: 'reserved',
    timeAgo: '1 day ago',
    views: 23,
  },
  {
    id: '3',
    title: 'MacBook Pro 13" - 2020',
    price: '$800.00',
    status: 'sold',
    timeAgo: '3 days ago',
    views: 156,
  },
];

const StatCard = ({ title, value, icon, color, isDark }: any) => (
  <View
    style={[
      styles.statCard,
      { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
    ]}
  >
    <View style={[styles.statIcon, { backgroundColor: color }]}>
      <Feather name={icon} size={20} color='#ffffff' />
    </View>
    <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#111827' }]}>
      {value}
    </Text>
    <Text style={[styles.statTitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
      {title}
    </Text>
  </View>
);

const ListingItem = ({ listing, isDark }: any) => (
  <View
    style={[
      styles.listingItem,
      { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
    ]}
  >
    <View style={styles.listingContent}>
      <Text
        style={[styles.listingTitle, { color: isDark ? '#ffffff' : '#111827' }]}
      >
        {listing.title}
      </Text>
      <Text
        style={[styles.listingPrice, { color: isDark ? '#10b981' : '#059669' }]}
      >
        {listing.price}
      </Text>
    </View>
    <View style={styles.listingMeta}>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              listing.status === 'available'
                ? '#10b981'
                : listing.status === 'reserved'
                ? '#f59e0b'
                : '#ef4444',
          },
        ]}
      >
        <Text style={styles.statusText}>{listing.status.toUpperCase()}</Text>
      </View>
      <Text
        style={[styles.listingTime, { color: isDark ? '#9ca3af' : '#6b7280' }]}
      >
        {listing.timeAgo}
      </Text>
    </View>
  </View>
);

const SettingItem = ({
  title,
  subtitle,
  icon,
  onPress,
  rightComponent,
  isDark,
}: any) => (
  <TouchableOpacity
    style={[
      styles.settingItem,
      { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
    ]}
    onPress={onPress}
  >
    <View style={styles.settingLeft}>
      <View
        style={[
          styles.settingIcon,
          { backgroundColor: isDark ? '#374151' : '#f3f4f6' },
        ]}
      >
        <Feather name={icon} size={20} color={isDark ? '#ffffff' : '#111827'} />
      </View>
      <View style={styles.settingText}>
        <Text
          style={[
            styles.settingTitle,
            { color: isDark ? '#ffffff' : '#111827' },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.settingSubtitle,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
    {rightComponent || (
      <Feather
        name='chevron-right'
        size={16}
        color={isDark ? '#9ca3af' : '#6b7280'}
      />
    )}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [notifications, setNotifications] = useState({
    newMessages: true,
    deadlineReminders: true,
    listingUpdates: false,
    promotions: false,
  });

  const handleNotificationToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Header */}
        <View style={styles.userHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{MOCK_USER.avatar}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text
              style={[
                styles.userName,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              {MOCK_USER.name}
            </Text>
            <Text
              style={[styles.userId, { color: isDark ? '#9ca3af' : '#6b7280' }]}
            >
              {MOCK_USER.studentId}
            </Text>
            <View style={styles.verifiedBadge}>
              <Feather name='check-circle' size={14} color='#10b981' />
              <Text style={styles.verifiedText}>Verified JJAY Student</Text>
            </View>
          </View>
        </View>

        {/* User Details */}
        <View
          style={[
            styles.userDetails,
            { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
          ]}
        >
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDark ? '#9ca3af' : '#6b7280' },
              ]}
            >
              Major
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              {MOCK_USER.major}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDark ? '#9ca3af' : '#6b7280' },
              ]}
            >
              Year
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              {MOCK_USER.year}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDark ? '#9ca3af' : '#6b7280' },
              ]}
            >
              Member Since
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              {MOCK_USER.memberSince}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            Quick Stats
          </Text>
          <View style={styles.statsGrid}>
            <StatCard
              title='Listings'
              value={MOCK_USER.totalListings}
              icon='package'
              color='#3b82f6'
              isDark={isDark}
            />
            <StatCard
              title='Sales'
              value={MOCK_USER.totalSales}
              icon='dollar-sign'
              color='#10b981'
              isDark={isDark}
            />
            <StatCard
              title='Rating'
              value={MOCK_USER.rating}
              icon='star'
              color='#f59e0b'
              isDark={isDark}
            />
            <StatCard
              title='Active'
              value={MOCK_USER.activeListings}
              icon='trending-up'
              color='#8b5cf6'
              isDark={isDark}
            />
          </View>
        </View>

        {/* My Listings */}
        <View style={styles.listingsSection}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? '#ffffff' : '#111827' },
              ]}
            >
              My Listings
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.seeAllText,
                  { color: isDark ? '#3b82f6' : '#2563eb' },
                ]}
              >
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {MOCK_LISTINGS.map((listing) => (
            <ListingItem key={listing.id} listing={listing} isDark={isDark} />
          ))}
        </View>

        {/* Notification Settings */}
        <View style={styles.settingsSection}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            Notifications
          </Text>
          <View
            style={[
              styles.settingsContainer,
              { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
            ]}
          >
            <SettingItem
              title='New Messages'
              subtitle='Get notified about new messages'
              icon='message-circle'
              rightComponent={
                <Switch
                  value={notifications.newMessages}
                  onValueChange={() => handleNotificationToggle('newMessages')}
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor='#ffffff'
                />
              }
              isDark={isDark}
            />
            <SettingItem
              title='Deadline Reminders'
              subtitle='Reminders for important deadlines'
              icon='clock'
              rightComponent={
                <Switch
                  value={notifications.deadlineReminders}
                  onValueChange={() =>
                    handleNotificationToggle('deadlineReminders')
                  }
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor='#ffffff'
                />
              }
              isDark={isDark}
            />
            <SettingItem
              title='Listing Updates'
              subtitle='Updates on your listings'
              icon='package'
              rightComponent={
                <Switch
                  value={notifications.listingUpdates}
                  onValueChange={() =>
                    handleNotificationToggle('listingUpdates')
                  }
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor='#ffffff'
                />
              }
              isDark={isDark}
            />
            <SettingItem
              title='Promotions'
              subtitle='Special offers and campus events'
              icon='gift'
              rightComponent={
                <Switch
                  value={notifications.promotions}
                  onValueChange={() => handleNotificationToggle('promotions')}
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor='#ffffff'
                />
              }
              isDark={isDark}
            />
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.settingsSection}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            Settings
          </Text>
          <View
            style={[
              styles.settingsContainer,
              { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
            ]}
          >
            <SettingItem
              title='Account Settings'
              subtitle='Manage your account information'
              icon='user'
              isDark={isDark}
            />
            <SettingItem
              title='Privacy & Security'
              subtitle='Control your privacy settings'
              icon='shield'
              isDark={isDark}
            />
            <SettingItem
              title='Help & Support'
              subtitle='Get help and contact support'
              icon='help-circle'
              isDark={isDark}
            />
            <SettingItem
              title='About'
              subtitle='App version and information'
              icon='info'
              isDark={isDark}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  userId: {
    fontSize: 16,
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  userDetails: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  listingsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listingItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listingContent: {
    marginBottom: 8,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 18,
    fontWeight: '800',
  },
  listingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  listingTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsContainer: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
});
