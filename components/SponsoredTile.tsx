import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import RedeemModal from './RedeemModal';

interface SponsoredTileProps {
  id: string;
  title: string;
  subtitle: string;
  color?: string;
  status?: 'OPEN' | 'SOON' | 'ENDED';
  onImpression?: (id: string) => void;
  onTap?: (id: string) => void;
}

export default function SponsoredTile({
  id,
  title,
  subtitle,
  color = '#2563eb',
  status = 'OPEN',
  onImpression,
  onTap,
}: SponsoredTileProps) {
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    onTap?.(id);
    setShowModal(true);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'OPEN':
        return isDark ? '#10b981' : '#059669';
      case 'SOON':
        return isDark ? '#3b82f6' : '#2563eb';
      case 'ENDED':
        return isDark ? '#6b7280' : '#9ca3af';
      default:
        return isDark ? '#10b981' : '#059669';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'OPEN':
        return isDark ? '#064e3b' : '#d1fae5';
      case 'SOON':
        return isDark ? '#1e3a8a' : '#dbeafe';
      case 'ENDED':
        return isDark ? '#374151' : '#f3f4f6';
      default:
        return isDark ? '#064e3b' : '#d1fae5';
    }
  };

  const isDisabled = status === 'ENDED';

  return (
    <>
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e5e7eb',
          },
        ]}
      >
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            {title}
          </Text>
          <View
            style={[styles.statusBadge, { backgroundColor: getStatusBg() }]}
          >
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {status}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}
        >
          {subtitle}
        </Text>

        <View style={styles.actionRow}>
          <Pressable
            onPress={handlePress}
            disabled={isDisabled}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: isDisabled ? '#6b7280' : color,
                opacity: pressed ? 0.8 : 1,
                transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
              },
            ]}
          >
            <Text style={styles.buttonText}>
              {isDisabled ? 'Ended' : 'Scan to Redeem'}
            </Text>
          </Pressable>

          <View
            style={[
              styles.qrPlaceholder,
              {
                backgroundColor: isDark ? '#374151' : '#e5e7eb',
                borderColor: isDark ? '#4b5563' : '#d1d5db',
              },
            ]}
          >
            <Text
              style={[styles.qrText, { color: isDark ? '#9ca3af' : '#6b7280' }]}
            >
              QR Code
            </Text>
          </View>
        </View>
      </View>

      <RedeemModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        offerId={id}
        title={title}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  qrPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.6,
  },
});
