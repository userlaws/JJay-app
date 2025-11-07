import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useColorScheme } from 'react-native';
import * as Crypto from 'expo-crypto';
import SimpleQRCode from './SimpleQRCode';

interface RedeemModalProps {
  visible: boolean;
  onClose: () => void;
  offerId: string;
  title: string;
}

export default function RedeemModal({
  visible,
  onClose,
  offerId,
  title,
}: RedeemModalProps) {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (visible) {
      generateToken();
    }
  }, [visible]);

  const generateToken = async () => {
    try {
      setLoading(true);
      // Generate a single-use token for this redemption (React Native compatible)
      const randomBytes = await Crypto.getRandomBytesAsync(16);
      const token = Array.from(randomBytes, (byte) =>
        byte.toString(16).padStart(2, '0')
      ).join('');
      setToken(token);

      // Stack Overflow-inspired success logging
      console.log('✅ QR Token generated successfully', {
        offerId,
        tokenLength: token.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // Enhanced error handling inspired by Stack Overflow best practices
      console.error('❌ Error generating token:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        offerId,
        timestamp: new Date().toISOString(),
      });

      // Fallback token generation
      const fallbackToken = Math.random().toString(36).substring(2, 15);
      setToken(fallbackToken);
    } finally {
      setLoading(false);
    }
  };

  const payload = JSON.stringify({
    offerId,
    token,
    timestamp: Date.now(),
    type: 'redemption',
  });

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View
            style={[
              styles.modal,
              {
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
              },
            ]}
          >
            <View style={styles.header}>
              <Text
                style={[
                  styles.title,
                  { color: isDark ? '#ffffff' : '#111827' },
                ]}
              >
                Show this at checkout
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  { color: isDark ? '#9ca3af' : '#6b7280' },
                ]}
              >
                {title}
              </Text>
            </View>

            <View style={styles.qrContainer}>
              {loading ? (
                <View
                  style={[
                    styles.loadingPlaceholder,
                    {
                      backgroundColor: isDark ? '#374151' : '#e5e7eb',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.loadingText,
                      { color: isDark ? '#9ca3af' : '#6b7280' },
                    ]}
                  >
                    Generating QR...
                  </Text>
                </View>
              ) : (
                <View style={styles.qrWrapper}>
                  <SimpleQRCode value={payload} size={220} />
                </View>
              )}
            </View>

            <View style={styles.footer}>
              <Text
                style={[
                  styles.instructions,
                  { color: isDark ? '#9ca3af' : '#6b7280' },
                ]}
              >
                Present this QR code to the cashier to redeem your offer
              </Text>

              <Pressable
                onPress={onClose}
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: isDark ? '#374151' : '#f3f4f6',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.closeButtonText,
                    { color: isDark ? '#ffffff' : '#111827' },
                  ]}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrWrapper: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loadingPlaceholder: {
    width: 220,
    height: 220,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  closeButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
