import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { useBadge } from '../contexts/BadgeContext';
import { Feather } from '@expo/vector-icons';

function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: keyof typeof Feather.glyphMap;
  color: string;
  focused: boolean;
}) {
  return (
    <Feather
      name={name}
      size={focused ? 24 : 20}
      color={color}
      style={{
        marginBottom: -3,
        transform: [{ scale: focused ? 1.1 : 1 }],
        opacity: focused ? 1 : 0.7,
      }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const badgeContext = useBadge();
  const marketBadgeCount = badgeContext.marketBadgeCount;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#60a5fa' : '#2563eb',
        tabBarInactiveTintColor: isDark ? '#6b7280' : '#9ca3af',
        tabBarStyle: {
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderTopColor: isDark ? '#1e293b' : '#e5e7eb',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          shadowColor: isDark ? '#000' : '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='home' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='market/index'
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='shopping-cart' color={color} focused={focused} />
          ),
          tabBarBadge: marketBadgeCount > 0 ? marketBadgeCount : undefined,
        }}
      />
      <Tabs.Screen
        name='events/index'
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='calendar' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='queues/index'
        options={{
          title: 'Deadlines',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='calendar' color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='user' color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
