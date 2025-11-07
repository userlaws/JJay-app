import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useBadge } from '../../contexts/BadgeContext';
import { getCategoryImage } from '../../../lib/imageStorage';
import { Feather } from '@expo/vector-icons';

// Mock data for marketplace listings
const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'Calculus Textbook - 12th Edition',
    price: '$85.00',
    category: 'Textbooks',
    description:
      'Excellent condition, used for one semester. Includes access code for online homework.',
    location: 'New Building',
    image: getCategoryImage('Textbooks'),
    boosted: true,
    seller: 'Sarah M.',
    timeAgo: '2 hours ago',
    status: 'available',
  },
  {
    id: '2',
    title: 'TI-84 Plus Graphing Calculator',
    price: '$70.00',
    category: 'Electronics',
    description:
      'Works perfectly, includes manual and USB cable. Great for math and science classes.',
    location: 'Science Hall',
    image: getCategoryImage('Electronics'),
    boosted: false,
    seller: 'Mike R.',
    timeAgo: '4 hours ago',
    status: 'reserved',
  },
  {
    id: '3',
    title: 'Desk Lamp with USB Ports',
    price: '$25.00',
    category: 'Dorm',
    description:
      'Warm/cool modes, great for late study sessions. Multiple brightness levels.',
    location: 'North Hall',
    image: getCategoryImage('Dorm'),
    boosted: false,
    seller: 'Emma L.',
    timeAgo: '6 hours ago',
    status: 'available',
  },
  {
    id: '4',
    title: 'MacBook Pro 13" - 2020',
    price: '$800.00',
    category: 'Electronics',
    description:
      'M1 chip, 8GB RAM, 256GB SSD. Perfect for programming and design work.',
    location: 'Computer Lab',
    image: getCategoryImage('Electronics'),
    boosted: true,
    seller: 'Alex K.',
    timeAgo: '1 day ago',
    status: 'sold',
  },
  {
    id: '5',
    title: 'Organic Chemistry Lab Kit',
    price: '$45.00',
    category: 'Textbooks',
    description:
      'Complete lab kit with safety goggles, lab coat, and all necessary equipment.',
    location: 'Chemistry Building',
    image: getCategoryImage('Textbooks'),
    boosted: false,
    seller: 'David P.',
    timeAgo: '2 days ago',
    status: 'available',
  },
];

const ListingItem = ({ item, isDark }) => (
  <View
    style={[
      styles.listingCard,
      { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
    ]}
  >
    {/* Status Badges */}
    <View style={styles.badgeContainer}>
      {item.boosted && (
        <View style={styles.boostedBadge}>
          <Text style={styles.boostedText}>🔥 BOOSTED</Text>
        </View>
      )}
      {item.status === 'reserved' && (
        <View style={styles.reservedBadge}>
          <Text style={styles.reservedText}>RESERVED</Text>
        </View>
      )}
      {item.status === 'sold' && (
        <View style={styles.soldBadge}>
          <Text style={styles.soldText}>SOLD</Text>
        </View>
      )}
      {item.price === 'Free' && (
        <View style={styles.freeBadge}>
          <Text style={styles.freeText}>FREE</Text>
        </View>
      )}
    </View>

    {/* Heart/Save Button */}
    <TouchableOpacity style={styles.heartButton}>
      <Feather name='heart' size={20} color={isDark ? '#ffffff' : '#000000'} />
    </TouchableOpacity>

    <Image source={{ uri: item.image }} style={styles.listingImage} />

    <View style={styles.listingContent}>
      <View style={styles.listingHeader}>
        <Text
          style={[styles.category, { color: isDark ? '#9ca3af' : '#6b7280' }]}
        >
          {item.category}
        </Text>
        <Text style={[styles.price, { color: isDark ? '#10b981' : '#059669' }]}>
          {item.price}
        </Text>
      </View>

      <Text style={[styles.title, { color: isDark ? '#ffffff' : '#111827' }]}>
        {item.title}
      </Text>

      <Text
        style={[styles.description, { color: isDark ? '#9ca3af' : '#6b7280' }]}
      >
        {item.description}
      </Text>

      {/* Trust Strip */}
      <View style={styles.trustStrip}>
        <View style={styles.sellerAvatar}>
          <Text style={styles.sellerInitial}>{item.seller.charAt(0)}</Text>
        </View>
        <View style={styles.sellerDetails}>
          <Text
            style={[
              styles.sellerName,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            {item.seller}
          </Text>
          <View style={styles.verifiedBadge}>
            <Feather name='check-circle' size={12} color='#10b981' />
            <Text style={styles.verifiedText}>Verified JJAY</Text>
          </View>
        </View>
        <View style={styles.rating}>
          <Feather name='star' size={12} color='#fbbf24' />
          <Text
            style={[
              styles.ratingText,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            4.9
          </Text>
        </View>
      </View>

      <View style={styles.listingFooter}>
        <Text
          style={[styles.location, { color: isDark ? '#6b7280' : '#9ca3af' }]}
        >
          📍 {item.location}
        </Text>
        <Text
          style={[styles.timeAgo, { color: isDark ? '#6b7280' : '#9ca3af' }]}
        >
          {item.timeAgo} • 3 min walk
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <Pressable
          style={[
            styles.primaryButton,
            { backgroundColor: isDark ? '#3b82f6' : '#2563eb' },
          ]}
          disabled={item.status === 'sold' || item.status === 'reserved'}
        >
          <Text style={styles.primaryButtonText}>
            {item.status === 'sold'
              ? 'Sold'
              : item.status === 'reserved'
              ? 'Reserved'
              : 'Reserve & Pay'}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.secondaryButton,
            { backgroundColor: isDark ? '#374151' : '#f3f4f6' },
          ]}
        >
          <Feather
            name='message-circle'
            size={16}
            color={isDark ? '#ffffff' : '#111827'}
          />
        </Pressable>
      </View>
    </View>
  </View>
);

export default function MarketScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { marketBadgeCount, clearMarketBadge } = useBadge();

  const handleClearBadge = () => {
    clearMarketBadge();
  };

  const handleNewListing = () => {
    router.push('/listing/new');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? '#ffffff' : '#111827' },
          ]}
        >
          Market
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            { color: isDark ? '#9ca3af' : '#6b7280' },
          ]}
        >
          Buy and sell with fellow students
        </Text>

        <View style={styles.headerActions}>
          {marketBadgeCount > 0 && (
            <TouchableOpacity
              onPress={handleClearBadge}
              style={[
                styles.badgeButton,
                { backgroundColor: isDark ? '#3b82f6' : '#2563eb' },
              ]}
            >
              <Text style={styles.badgeButtonText}>
                Clear Badge ({marketBadgeCount})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={MOCK_LISTINGS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingItem item={item} isDark={isDark} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: isDark ? '#10b981' : '#059669' },
        ]}
        onPress={handleNewListing}
      >
        <Feather name='plus' size={24} color='#ffffff' />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  badgeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  separator: {
    height: 16,
  },
  listingCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  boostedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  boostedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  listingImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f4f6',
  },
  listingContent: {
    padding: 16,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeAgo: {
    fontSize: 12,
    fontWeight: '500',
  },
  sellerInfo: {
    marginBottom: 16,
  },
  seller: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  // New enhanced styles
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  reservedBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reservedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  soldBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  soldText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  freeBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sellerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerInitial: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '500',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
