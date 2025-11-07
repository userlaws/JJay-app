import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { AppCard } from './AppCard';
import { calcFeeCents } from '@/lib/fees';

interface Seller {
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  seller: Seller;
}

interface ReservationData {
  meetupTime: string;
  meetupPlace: string;
  notes?: string;
}

interface ReserveSheetProps {
  listing: Listing;
  onClose: () => void;
  onConfirm: (data: ReservationData) => void;
}

export const ReserveSheet: React.FC<ReserveSheetProps> = ({
  listing,
  onClose,
  onConfirm,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [meetupTime, setMeetupTime] = useState('');
  const [meetupPlace, setMeetupPlace] = useState('');
  const [notes, setNotes] = useState('');

  const itemPriceCents = listing.price * 100;
  const platformFeeCents = calcFeeCents(itemPriceCents);
  const totalCents = itemPriceCents + platformFeeCents;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleConfirm = () => {
    if (!meetupTime || !meetupPlace) {
      return;
    }

    onConfirm({
      meetupTime,
      meetupPlace,
      notes,
    });
  };

  const timeOptions = [
    'Today 2:00 PM',
    'Today 4:00 PM',
    'Today 6:00 PM',
    'Tomorrow 10:00 AM',
    'Tomorrow 2:00 PM',
    'Tomorrow 4:00 PM',
  ];

  const placeOptions = [
    'Library Entrance',
    'Student Center',
    'Cafeteria',
    'Gym Lobby',
    'Dorm Building A',
    'Custom Location',
  ];

  return (
    <Modal visible={true} animationType='slide' presentationStyle='pageSheet'>
      <View className='flex-1 bg-gray-50 dark:bg-gray-900'>
        {/* Header */}
        <View className='flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
          <TouchableOpacity onPress={onClose}>
            <Text className='text-blue-600 dark:text-blue-400 font-medium'>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
            Reserve Item
          </Text>
          <View className='w-16' />
        </View>

        <ScrollView className='flex-1 p-4'>
          {/* Item Summary */}
          <AppCard className='mb-4'>
            <View className='flex-row items-center mb-3'>
              <Text className='text-2xl mr-3'>{listing.seller.avatar}</Text>
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {listing.title}
                </Text>
                <Text className='text-gray-600 dark:text-gray-400'>
                  {listing.category} • {listing.location}
                </Text>
              </View>
            </View>
          </AppCard>

          {/* Pricing Breakdown */}
          <AppCard className='mb-4'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              Pricing
            </Text>

            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-gray-600 dark:text-gray-400'>
                Item Price
              </Text>
              <Text className='text-gray-900 dark:text-white font-medium'>
                {formatPrice(itemPriceCents)}
              </Text>
            </View>

            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-gray-600 dark:text-gray-400'>
                Platform Fee (4.9% + $0.30)
              </Text>
              <Text className='text-gray-900 dark:text-white font-medium'>
                {formatPrice(platformFeeCents)}
              </Text>
            </View>

            <View className='border-t border-gray-200 dark:border-gray-700 pt-2 mt-2'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Total
                </Text>
                <Text className='text-xl font-bold text-blue-600 dark:text-blue-400'>
                  {formatPrice(totalCents)}
                </Text>
              </View>
            </View>
          </AppCard>

          {/* Meetup Time */}
          <AppCard className='mb-4'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              Meetup Time
            </Text>
            <View className='flex-row flex-wrap'>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setMeetupTime(time)}
                  className={`mr-2 mb-2 px-3 py-2 rounded-full border ${
                    meetupTime === time
                      ? 'border-blue-600 dark:border-blue-400 bg-blue-100 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      meetupTime === time
                        ? 'text-blue-800 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </AppCard>

          {/* Meetup Place */}
          <AppCard className='mb-4'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              Meetup Place
            </Text>
            <View className='flex-row flex-wrap'>
              {placeOptions.map((place) => (
                <TouchableOpacity
                  key={place}
                  onPress={() => setMeetupPlace(place)}
                  className={`mr-2 mb-2 px-3 py-2 rounded-full border ${
                    meetupPlace === place
                      ? 'border-blue-600 dark:border-blue-400 bg-blue-100 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      meetupPlace === place
                        ? 'text-blue-800 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {place}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </AppCard>

          {/* Notes */}
          <AppCard className='mb-6'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              Additional Notes (Optional)
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder='Any special instructions or questions...'
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              multiline
              numberOfLines={3}
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-white'
              style={{
                textAlignVertical: 'top',
              }}
            />
          </AppCard>
        </ScrollView>

        {/* Bottom Action */}
        <View className='p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!meetupTime || !meetupPlace}
            className={`py-4 rounded-xl ${
              meetupTime && meetupPlace
                ? 'bg-blue-600 dark:bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <Text className='text-white font-bold text-lg text-center'>
              Confirm Reservation
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
