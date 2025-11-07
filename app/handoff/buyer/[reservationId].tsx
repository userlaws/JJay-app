import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function BuyerHandoffScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { reservationId } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
        ]}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text
            style={[styles.backText, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            ←
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? '#ffffff' : '#111827' },
          ]}
        >
          QR Scanner
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Transaction Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
          ]}
        >
          <Text
            style={[
              styles.itemTitle,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            Calculus Textbook
          </Text>
          <Text
            style={[
              styles.itemDetails,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            Today • Library Lobby
          </Text>
          <Text
            style={[styles.price, { color: isDark ? '#10b981' : '#059669' }]}
          >
            $85.00
          </Text>
        </View>

        {/* Scanner Placeholder */}
        <View
          style={[
            styles.scannerPlaceholder,
            { backgroundColor: isDark ? '#374151' : '#e5e7eb' },
          ]}
        >
          <Text
            style={[
              styles.scannerText,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            📱 Camera Scanner
          </Text>
          <Text
            style={[
              styles.scannerSubtext,
              { color: isDark ? '#6b7280' : '#9ca3af' },
            ]}
          >
            Point camera at seller's QR code
          </Text>
        </View>

        {/* Instructions */}
        <View
          style={[
            styles.instructions,
            { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
          ]}
        >
          <Text
            style={[
              styles.instructionsTitle,
              { color: isDark ? '#ffffff' : '#111827' },
            ]}
          >
            How to complete payment:
          </Text>
          <Text
            style={[
              styles.instructionsText,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            1. Ask seller to show their QR code{'\n'}
            2. Point your camera at the QR code{'\n'}
            3. Payment will be processed automatically
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
  },
  scannerPlaceholder: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scannerText: {
    fontSize: 24,
    marginBottom: 8,
  },
  scannerSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  instructions: {
    padding: 16,
    borderRadius: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
