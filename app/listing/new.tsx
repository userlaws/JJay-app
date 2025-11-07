import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { generateImageUrl, getCategoryImage } from '../../lib/imageStorage';

const CATEGORIES = ['Textbooks', 'Electronics', 'Dorm', 'Services', 'Free'];

export default function NewListingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    image: generateImageUrl('new'), // Generate unique placeholder
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Update image when category changes
      if (field === 'category' && value) {
        newData.image = getCategoryImage(value);
      }

      return newData;
    });
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.price || !formData.category) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // TODO: Save to backend/database
    Alert.alert(
      'Listing Created!',
      'Your listing has been posted successfully.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            Create New Listing
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}
          >
            Sell your items to fellow students
          </Text>
        </View>

        {/* Image Preview */}
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
          ]}
        >
          <Image source={{ uri: formData.image }} style={styles.previewImage} />
          <TouchableOpacity
            style={[
              styles.imageButton,
              { backgroundColor: isDark ? '#3b82f6' : '#2563eb' },
            ]}
          >
            <Text style={styles.imageButtonText}>📷 Add Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View
          style={[
            styles.formContainer,
            { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
          ]}
        >
          <Text
            style={[styles.label, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            Title *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#ffffff' : '#111827',
                borderColor: isDark ? '#4b5563' : '#d1d5db',
              },
            ]}
            placeholder='What are you selling?'
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            value={formData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />

          <Text
            style={[styles.label, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            Description
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#ffffff' : '#111827',
                borderColor: isDark ? '#4b5563' : '#d1d5db',
              },
            ]}
            placeholder='Describe your item...'
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            multiline
            numberOfLines={4}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? '#ffffff' : '#111827' },
                ]}
              >
                Price *
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDark ? '#374151' : '#f3f4f6',
                    color: isDark ? '#ffffff' : '#111827',
                    borderColor: isDark ? '#4b5563' : '#d1d5db',
                  },
                ]}
                placeholder='$0.00'
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                value={formData.price}
                onChangeText={(text) => handleInputChange('price', text)}
                keyboardType='numeric'
              />
            </View>

            <View style={styles.halfWidth}>
              <Text
                style={[
                  styles.label,
                  { color: isDark ? '#ffffff' : '#111827' },
                ]}
              >
                Category *
              </Text>
              <View style={styles.categoryContainer}>
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor:
                          formData.category === category
                            ? isDark
                              ? '#3b82f6'
                              : '#2563eb'
                            : isDark
                            ? '#374151'
                            : '#f3f4f6',
                      },
                    ]}
                    onPress={() => handleInputChange('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        {
                          color:
                            formData.category === category
                              ? '#ffffff'
                              : isDark
                              ? '#ffffff'
                              : '#111827',
                        },
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text
            style={[styles.label, { color: isDark ? '#ffffff' : '#111827' }]}
          >
            Location
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#ffffff' : '#111827',
                borderColor: isDark ? '#4b5563' : '#d1d5db',
              },
            ]}
            placeholder='Where can buyers meet you?'
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            value={formData.location}
            onChangeText={(text) => handleInputChange('location', text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: isDark ? '#10b981' : '#059669' },
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Post Listing</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  imageContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  imageButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  formContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
