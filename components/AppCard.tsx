import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';

interface AppCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  onPress,
  className = '',
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      onPress={onPress}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#f3f4f6',
        shadowColor: isDark ? '#000' : '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {children}
    </CardComponent>
  );
};
