import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { AppCard } from './AppCard';

interface Seller {
  name: string;
  avatar: string;
  rating: number;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  location: string;
  seller: Seller;
  image: string;
  isBoosted: boolean;
}

interface ListingCardProps {
  listing: Listing;
  onPress: () => void;
  onReserve: () => void;
  onMessage: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onPress,
  onReserve,
  onMessage,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    <AppCard onPress={onPress} className='mb-4'>
      {/* Boosted Ribbon */}
      {listing.isBoosted && (
        <View className='absolute top-0 right-0 bg-orange-500 px-2 py-1 rounded-bl-lg z-10'>
          <Text className='text-white text-xs font-bold'>BOOSTED</Text>
        </View>
      )}

      {/* Image */}
      <View className='w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 items-center justify-center'>
        <Text className='text-4xl'>{listing.image}</Text>
      </View>

      {/* Category Chip */}
      <View className='flex-row items-center justify-between mb-2'>
        <View
          className={`px-2 py-1 rounded-full ${getCategoryColor(
            listing.category
          )}`}
        >
          <Text className='text-xs font-medium'>{listing.category}</Text>
        </View>
        <Text className='text-2xl font-bold text-gray-900 dark:text-white'>
          {formatPrice(listing.price)}
        </Text>
      </View>

      {/* Title */}
      <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
        {listing.title}
      </Text>

      {/* Description */}
      <Text
        className='text-gray-600 dark:text-gray-400 text-sm mb-3'
        numberOfLines={2}
      >
        {listing.description}
      </Text>

      {/* Location */}
      <View className='flex-row items-center mb-3'>
        <Text className='text-gray-500 dark:text-gray-400 text-sm mr-1'>
          📍
        </Text>
        <Text className='text-gray-500 dark:text-gray-400 text-sm'>
          {listing.location}
        </Text>
      </View>

      {/* Seller Info */}
      <View className='flex-row items-center justify-between mb-4'>
        <View className='flex-row items-center'>
          <Text className='text-lg mr-2'>{listing.seller.avatar}</Text>
          <View>
            <Text className='text-gray-900 dark:text-white font-medium'>
              {listing.seller.name}
            </Text>
            <View className='flex-row items-center'>
              <Text className='text-yellow-500 text-sm'>⭐</Text>
              <Text className='text-gray-600 dark:text-gray-400 text-sm ml-1'>
                {listing.seller.rating}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className='flex-row space-x-2'>
        <TouchableOpacity
          onPress={onReserve}
          className='flex-1 bg-blue-600 dark:bg-blue-500 px-4 py-3 rounded-lg'
        >
          <Text className='text-white font-medium text-center'>
            Reserve & Pay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onMessage}
          className='bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-lg'
        >
          <Text className='text-gray-700 dark:text-gray-300 font-medium'>
            Message
          </Text>
        </TouchableOpacity>
      </View>
    </AppCard>
  );
};
