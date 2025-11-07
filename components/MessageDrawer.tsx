import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { AppCard } from './AppCard';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  isRead: boolean;
}

interface Seller {
  name: string;
  avatar: string;
  rating: number;
}

interface MessageDrawerProps {
  seller: Seller;
  onClose: () => void;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! Is this textbook still available?',
    sender: 'me',
    timestamp: '2:30 PM',
    isRead: true,
  },
  {
    id: '2',
    text: 'Yes, it is! Are you interested in buying it?',
    sender: 'other',
    timestamp: '2:32 PM',
    isRead: true,
  },
  {
    id: '3',
    text: 'Great! Can we meet at the library today at 4 PM?',
    sender: 'me',
    timestamp: '2:35 PM',
    isRead: true,
  },
  {
    id: '4',
    text: "Sure! I'll be at the main entrance. See you there.",
    sender: 'other',
    timestamp: '2:37 PM',
    isRead: true,
  },
  {
    id: '5',
    text: 'Perfect, thanks!',
    sender: 'me',
    timestamp: '2:38 PM',
    isRead: false,
  },
];

export const MessageDrawer: React.FC<MessageDrawerProps> = ({
  seller,
  onClose,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isRead: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`mb-3 ${item.sender === 'me' ? 'items-end' : 'items-start'}`}
    >
      <View
        className={`max-w-xs px-4 py-3 rounded-2xl ${
          item.sender === 'me'
            ? 'bg-blue-600 dark:bg-blue-500'
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <Text
          className={`${
            item.sender === 'me'
              ? 'text-white'
              : 'text-gray-900 dark:text-white'
          }`}
        >
          {item.text}
        </Text>
      </View>
      <Text className='text-gray-500 dark:text-gray-400 text-xs mt-1'>
        {item.timestamp}
        {item.sender === 'me' && (
          <Text className='ml-1'>{item.isRead ? '✓✓' : '✓'}</Text>
        )}
      </Text>
    </View>
  );

  return (
    <Modal visible={true} animationType='slide' presentationStyle='pageSheet'>
      <View className='flex-1 bg-gray-50 dark:bg-gray-900'>
        {/* Header */}
        <View className='flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
          <TouchableOpacity onPress={onClose}>
            <Text className='text-blue-600 dark:text-blue-400 font-medium'>
              Close
            </Text>
          </TouchableOpacity>

          <View className='flex-row items-center'>
            <Text className='text-lg mr-2'>{seller.avatar}</Text>
            <View>
              <Text className='text-gray-900 dark:text-white font-semibold'>
                {seller.name}
              </Text>
              <View className='flex-row items-center'>
                <Text className='text-yellow-500 text-sm'>⭐</Text>
                <Text className='text-gray-600 dark:text-gray-400 text-sm ml-1'>
                  {seller.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className='w-12' />
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          className='flex-1 p-4'
          inverted
        />

        {/* Escrow Tips Banner */}
        <View className='mx-4 mb-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
          <Text className='text-blue-800 dark:text-blue-200 text-sm font-medium mb-1'>
            💡 Escrow Tips
          </Text>
          <Text className='text-blue-700 dark:text-blue-300 text-xs'>
            Use the app's payment system for protection. Never pay outside the
            app.
          </Text>
        </View>

        {/* Input */}
        <View className='p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
          <View className='flex-row items-center space-x-2'>
            <TextInput
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder='Type a message...'
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              className='flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-3 text-gray-900 dark:text-white'
              multiline
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                newMessage.trim()
                  ? 'bg-blue-600 dark:bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <Text className='text-white text-lg'>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
