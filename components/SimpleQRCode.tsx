import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

interface SimpleQRCodeProps {
  value: string;
  size?: number;
}

export default function SimpleQRCode({ value, size = 200 }: SimpleQRCodeProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Generate a QR-like pattern inspired by Stack Overflow examples
  const generatePattern = (text: string) => {
    // Create a more realistic QR-like pattern
    const hash = text.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    const pattern = [];
    const size = 12; // Larger grid for more detail

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Create corner markers (QR code style)
        if (
          (i < 3 && j < 3) ||
          (i < 3 && j >= size - 3) ||
          (i >= size - 3 && j < 3)
        ) {
          row.push(true);
        } else {
          // Generate pattern based on hash and position
          const shouldFill = (hash + i * size + j) % 2 === 0;
          row.push(shouldFill);
        }
      }
      pattern.push(row);
    }
    return pattern;
  };

  const pattern = generatePattern(value);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.qrCode,
          { backgroundColor: isDark ? '#ffffff' : '#000000' },
        ]}
      >
        {pattern.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <View
                key={`${rowIndex}-${cellIndex}`}
                style={[
                  styles.cell,
                  {
                    backgroundColor: cell
                      ? isDark
                        ? '#000000'
                        : '#ffffff'
                      : isDark
                      ? '#ffffff'
                      : '#000000',
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={[styles.label, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
        QR Code
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  qrCode: {
    width: 120,
    height: 120,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    flex: 1,
    margin: 0.5,
  },
  label: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
});
