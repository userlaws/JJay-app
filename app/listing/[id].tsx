import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { AppCard } from '@/components/AppCard';
import { ReserveSheet } from '@/components/ReserveSheet';
import { StatusBar } from 'expo-status-bar';

// Mock listing data - in real app, fetch from API
const mockListing = {
  id: '1',
  title: 'Calculus Textbook - Stewart 8th Edition',
  price: 45,
  description:
    'Excellent condition, barely used. No highlights or markings. Perfect for MATH 201. This textbook covers all the essential topics in single-variable calculus including limits, derivatives, and integrals. The book is in pristine condition with no writing or highlighting inside.',
  category: 'Textbooks',
  location: 'Library',
  seller: {
    name: 'Sarah M.',
    avatar: '👩‍🎓',
    rating: 4.8,
    reviews: 23,
  },
  images: ['📚', '📖', '📝'],
  isBoosted: true,
  safetyTips: [
    'Meet in a public place on campus',
    'Inspect the item before paying',
    "Use the app's payment system for protection",
    'Keep all communication in the app',
  ],
};

export default function ListingDetailsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { id } = useLocalSearchParams();
  const [showReserveSheet, setShowReserveSheet] = useState(false);

  const handleReserve = () => {
    setShowReserveSheet(true);
  };

  const handleMessage = () => {
    // TODO: Open message drawer
    console.log('Message seller');
  };

  const handleBack = () => {
    router.back();
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Textbooks:
        'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      Electronics:
        'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      Dorm: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      Free: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      Services: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-50 dark:bg-gray-900'>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View className='flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <TouchableOpacity onPress={handleBack} className='p-2'>
          <Text className='text-2xl'>←</Text>
        </TouchableOpacity>
        <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
          Listing Details
        </Text>
        <View className='w-8' />
      </View>

      <ScrollView className='flex-1'>
        {/* Image Carousel */}
        <View className='h-64 bg-gray-200 dark:bg-gray-700 items-center justify-center'>
          <Text className='text-6xl'>{mockListing.images[0]}</Text>
        </View>

        <View className='p-4'>
          {/* Title and Price */}
          <View className='flex-row items-start justify-between mb-3'>
            <View className='flex-1'>
              <Text className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
                {mockListing.title}
              </Text>
              <Text className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                {formatPrice(mockListing.price)}
              </Text>
            </View>
            {mockListing.isBoosted && (
              <View className='bg-orange-500 px-2 py-1 rounded-full'>
                <Text className='text-white text-xs font-bold'>BOOSTED</Text>
              </View>
            )}
          </View>

          {/* Category and Location */}
          <View className='flex-row items-center mb-4'>
            <View
              className={`px-3 py-1 rounded-full mr-3 ${getCategoryColor(
                mockListing.category
              )}`}
            >
              <Text className='text-sm font-medium'>
                {mockListing.category}
              </Text>
            </View>
            <View className='flex-row items-center'>
              <Text className='text-gray-500 dark:text-gray-400 mr-1'>📍</Text>
              <Text className='text-gray-600 dark:text-gray-400'>
                {mockListing.location}
              </Text>
            </View>
          </View>

          {/* Seller Info */}
          <AppCard className='mb-4'>
            <View className='flex-row items-center'>
              <Text className='text-3xl mr-3'>{mockListing.seller.avatar}</Text>
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {mockListing.seller.name}
                </Text>
                <View className='flex-row items-center'>
                  <Text className='text-yellow-500 text-sm'>⭐</Text>
                  <Text className='text-gray-600 dark:text-gray-400 text-sm ml-1'>
                    {mockListing.seller.rating} • {mockListing.seller.reviews}{' '}
                    reviews
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleMessage}
                className='bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg'
              >
                <Text className='text-gray-700 dark:text-gray-300 font-medium'>
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </AppCard>

          {/* Description */}
          <AppCard className='mb-4'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              Description
            </Text>
            <Text className='text-gray-600 dark:text-gray-400 leading-6'>
              {mockListing.description}
            </Text>
          </AppCard>

          {/* Safety Tips */}
          <AppCard className='mb-20'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              Safety Tips
            </Text>
            {mockListing.safetyTips.map((tip, index) => (
              <View key={index} className='flex-row items-start mb-2'>
                <Text className='text-green-500 mr-2'>✓</Text>
                <Text className='text-gray-600 dark:text-gray-400 flex-1'>
                  {tip}
                </Text>
              </View>
            ))}
          </AppCard>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className='absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4'>
        <TouchableOpacity
          onPress={handleReserve}
          className='bg-blue-600 dark:bg-blue-500 py-4 rounded-xl'
        >
          <Text className='text-white font-bold text-lg text-center'>
            Reserve & Pay
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reserve Sheet */}
      {showReserveSheet && (
        <ReserveSheet
          listing={mockListing}
          onClose={() => setShowReserveSheet(false)}
          onConfirm={(reservationData) => {
            console.log('Reservation confirmed:', reservationData);
            setShowReserveSheet(false);
            Alert.alert('Success', 'Your reservation has been confirmed!');
          }}
        />
      )}
    </SafeAreaView>
  );
}
