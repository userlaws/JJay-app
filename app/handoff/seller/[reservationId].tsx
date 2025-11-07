import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { AppCard } from '@/components/AppCard';
import { useReservationStore } from '@/stores/reservations';
import { StatusBar } from 'expo-status-bar';

export default function SellerHandoffScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { reservationId } = useLocalSearchParams();
  const { getReservation, updateReservationStatus } = useReservationStore();

  const [reservation, setReservation] = useState(
    getReservation(reservationId as string)
  );

  useEffect(() => {
    if (!reservation) {
      Alert.alert('Error', 'Reservation not found', [
        { text: 'OK', onPress: () => router.back() },
      ]);
      return;
    }
    setReservation(getReservation(reservationId as string));
  }, [reservationId, getReservation]);

  const handleMarkAsHandoff = () => {
    if (reservation) {
      updateReservationStatus(reservation.id, 'handoff');
      Alert.alert(
        'Handoff Started',
        'The buyer can now scan your QR code to complete the transaction.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!reservation) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center'>
        <Text className='text-gray-500 dark:text-gray-400'>Loading...</Text>
      </SafeAreaView>
    );
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
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
          Seller Handoff
        </Text>
        <View className='w-8' />
      </View>

      <View className='flex-1 p-4'>
        {/* Reservation Summary */}
        <AppCard className='mb-6'>
          <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
            Transaction Summary
          </Text>

          <View className='space-y-2'>
            <View className='flex-row justify-between'>
              <Text className='text-gray-600 dark:text-gray-400'>Item:</Text>
              <Text className='text-gray-900 dark:text-white'>
                Calculus Textbook
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-gray-600 dark:text-gray-400'>Amount:</Text>
              <Text className='text-gray-900 dark:text-white'>
                {formatPrice(reservation.amount)}
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-gray-600 dark:text-gray-400'>
                Platform Fee:
              </Text>
              <Text className='text-gray-900 dark:text-white'>
                {formatPrice(reservation.platformFee)}
              </Text>
            </View>
            <View className='flex-row justify-between border-t border-gray-200 dark:border-gray-700 pt-2'>
              <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
                Total:
              </Text>
              <Text className='text-lg font-bold text-blue-600 dark:text-blue-400'>
                {formatPrice(reservation.total)}
              </Text>
            </View>
          </View>

          <View className='mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
            <Text className='text-blue-800 dark:text-blue-200 text-sm'>
              <Text className='font-semibold'>Meetup Details:</Text>
              {'\n'}
              {reservation.meetupTime} at {reservation.meetupPlace}
            </Text>
          </View>
        </AppCard>

        {/* Status */}
        <AppCard className='mb-6'>
          <View className='flex-row items-center justify-between mb-3'>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
              Status
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${
                reservation.status === 'pending'
                  ? 'bg-yellow-100 dark:bg-yellow-900'
                  : reservation.status === 'handoff'
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'bg-green-100 dark:bg-green-900'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  reservation.status === 'pending'
                    ? 'text-yellow-800 dark:text-yellow-200'
                    : reservation.status === 'handoff'
                    ? 'text-blue-800 dark:text-blue-200'
                    : 'text-green-800 dark:text-green-200'
                }`}
              >
                {reservation.status === 'pending'
                  ? 'Pending'
                  : reservation.status === 'handoff'
                  ? 'In Handoff'
                  : 'Completed'}
              </Text>
            </View>
          </View>

          {reservation.status === 'pending' && (
            <TouchableOpacity
              onPress={handleMarkAsHandoff}
              className='bg-blue-600 dark:bg-blue-500 py-3 rounded-lg'
            >
              <Text className='text-white font-medium text-center'>
                Start Handoff
              </Text>
            </TouchableOpacity>
          )}

          {reservation.status === 'handoff' && (
            <View className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg'>
              <Text className='text-blue-800 dark:text-blue-200 text-sm text-center'>
                Show the QR code below to the buyer to complete the transaction
              </Text>
            </View>
          )}
        </AppCard>

        {/* QR Code */}
        {reservation.status === 'handoff' && (
          <AppCard>
            <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center'>
              Scan This QR Code
            </Text>

            <View className='items-center'>
              <View className='bg-white p-4 rounded-lg'>
                <QRCode
                  value={reservation.id}
                  size={200}
                  color={isDark ? '#000000' : '#000000'}
                  backgroundColor='#FFFFFF'
                />
              </View>
            </View>

            <Text className='text-gray-600 dark:text-gray-400 text-sm text-center mt-4'>
              The buyer will scan this code to complete the payment
            </Text>
          </AppCard>
        )}

        {/* Instructions */}
        <View className='mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
          <Text className='text-gray-800 dark:text-gray-200 text-sm font-medium mb-2'>
            Instructions:
          </Text>
          <Text className='text-gray-600 dark:text-gray-400 text-sm'>
            1. Meet the buyer at the agreed location{'\n'}
            2. Show them the item to confirm condition{'\n'}
            3. Start handoff and show the QR code{'\n'}
            4. Wait for buyer to scan and complete payment
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
