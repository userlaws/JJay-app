import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
  Modal,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import {
  MOCK_DEADLINES,
  getDeadlinesByCategory,
  Deadline,
} from '../../../data/deadlines.mock';

const DeadlineCard = ({
  deadline,
  isDark,
}: {
  deadline: Deadline;
  isDark: boolean;
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const deadlineDate = new Date(deadline.dueDate);
      const diff = deadlineDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Overdue');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [deadline.dueDate]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444'; // red
      case 'medium':
        return '#f59e0b'; // yellow
      case 'low':
        return '#10b981'; // green
      default:
        return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return 'book-open';
      case 'financial':
        return 'dollar-sign';
      case 'event':
        return 'calendar';
      default:
        return 'clock';
    }
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(deadline.dueDate);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      deadline.title
    )}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${
      endDate.toISOString().replace(/[-:]/g, '').split('.')[0]
    }Z&details=${encodeURIComponent(deadline.description)}`;

    Linking.openURL(calendarUrl);
  };

  const isOverdue = new Date(deadline.dueDate) < new Date();
  const isUrgent =
    new Date(deadline.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <View
      style={[
        styles.deadlineCard,
        {
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderLeftColor: getPriorityColor(deadline.priority),
        },
      ]}
    >
      <View style={styles.deadlineHeader}>
        <View style={styles.deadlineTitleRow}>
          <Feather
            name={getCategoryIcon(deadline.category) as any}
            size={16}
            color={isDark ? '#9ca3af' : '#6b7280'}
          />
          <Text
            style={[
              styles.categoryText,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            {deadline.category.toUpperCase()}
          </Text>
        </View>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(deadline.priority) },
          ]}
        >
          <Text style={styles.priorityText}>
            {deadline.priority.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.deadlineTitle,
          { color: isDark ? '#ffffff' : '#111827' },
        ]}
      >
        {deadline.title}
      </Text>

      <Text
        style={[
          styles.deadlineDescription,
          { color: isDark ? '#9ca3af' : '#6b7280' },
        ]}
      >
        {deadline.description}
      </Text>

      {deadline.location && (
        <View style={styles.locationRow}>
          <Feather
            name='map-pin'
            size={12}
            color={isDark ? '#9ca3af' : '#6b7280'}
          />
          <Text
            style={[
              styles.locationText,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            {deadline.location}
          </Text>
        </View>
      )}

      <View style={styles.deadlineFooter}>
        <View style={styles.countdownContainer}>
          <Text
            style={[
              styles.countdownLabel,
              { color: isDark ? '#9ca3af' : '#6b7280' },
            ]}
          >
            {isOverdue ? 'OVERDUE' : isUrgent ? 'DUE SOON' : 'TIME LEFT'}
          </Text>
          <Text
            style={[
              styles.countdownText,
              {
                color: isOverdue
                  ? '#ef4444'
                  : isUrgent
                  ? '#f59e0b'
                  : isDark
                  ? '#ffffff'
                  : '#111827',
              },
            ]}
          >
            {timeLeft}
          </Text>
        </View>

        <Pressable
          style={[
            styles.calendarButton,
            { backgroundColor: isDark ? '#3b82f6' : '#2563eb' },
          ]}
          onPress={handleAddToCalendar}
        >
          <Feather name='calendar' size={16} color='#ffffff' />
          <Text style={styles.calendarButtonText}>Add to Calendar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function DeadlinesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const scrollY = new Animated.Value(0);

  const categories = [
    { key: 'all', label: 'All Categories', icon: 'list' },
    { key: 'academic', label: 'Academic', icon: 'book-open' },
    { key: 'financial', label: 'Financial', icon: 'dollar-sign' },
    { key: 'event', label: 'Events', icon: 'calendar' },
  ];

  const filteredDeadlines = getDeadlinesByCategory(selectedCategory);
  const selectedCategoryData = categories.find(
    (cat) => cat.key === selectedCategory
  );

  // Animated values for shrinking header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [80, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? '#ffffff' : '#111827' },
          ]}
        >
          Deadlines
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            { color: isDark ? '#9ca3af' : '#6b7280' },
          ]}
        >
          Stay on top of important dates
        </Text>
      </View>

      {/* Shrinking Category Header */}
      <Animated.View
        style={[
          styles.shrinkingHeader,
          {
            height: headerHeight,
            opacity: headerOpacity,
            transform: [{ scale: headerScale }],
          },
        ]}
      >
        <View style={styles.dropdownSection}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
            ]}
            onPress={() => setShowCategoryModal(true)}
          >
            <View style={styles.dropdownContent}>
              <View style={styles.dropdownLeft}>
                <View
                  style={[
                    styles.dropdownIcon,
                    { backgroundColor: isDark ? '#374151' : '#f3f4f6' },
                  ]}
                >
                  <Feather
                    name={selectedCategoryData?.icon as any}
                    size={20}
                    color={isDark ? '#ffffff' : '#111827'}
                  />
                </View>
                <Text
                  style={[
                    styles.dropdownText,
                    { color: isDark ? '#ffffff' : '#111827' },
                  ]}
                >
                  {selectedCategoryData?.label}
                </Text>
              </View>
              <Feather
                name='chevron-down'
                size={20}
                color={isDark ? '#9ca3af' : '#6b7280'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Deadlines List */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        alwaysBounceVertical={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {filteredDeadlines.map((deadline) => (
          <DeadlineCard key={deadline.id} deadline={deadline} isDark={isDark} />
        ))}
        {/* Extra padding at bottom to prevent cutoff */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: isDark ? '#ffffff' : '#111827' },
                ]}
              >
                Select Category
              </Text>
              <TouchableOpacity
                onPress={() => setShowCategoryModal(false)}
                style={styles.closeButton}
              >
                <Feather
                  name='x'
                  size={24}
                  color={isDark ? '#ffffff' : '#111827'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.modalCategories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.modalCategoryItem,
                    {
                      backgroundColor:
                        selectedCategory === category.key
                          ? isDark
                            ? '#3b82f6'
                            : '#2563eb'
                          : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.key);
                    setShowCategoryModal(false);
                  }}
                >
                  <View style={styles.modalCategoryContent}>
                    <View
                      style={[
                        styles.modalCategoryIcon,
                        {
                          backgroundColor:
                            selectedCategory === category.key
                              ? '#ffffff'
                              : isDark
                              ? '#374151'
                              : '#f3f4f6',
                        },
                      ]}
                    >
                      <Feather
                        name={category.icon as any}
                        size={20}
                        color={
                          selectedCategory === category.key
                            ? isDark
                              ? '#3b82f6'
                              : '#2563eb'
                            : isDark
                            ? '#9ca3af'
                            : '#6b7280'
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.modalCategoryText,
                        {
                          color:
                            selectedCategory === category.key
                              ? '#ffffff'
                              : isDark
                              ? '#ffffff'
                              : '#111827',
                        },
                      ]}
                    >
                      {category.label}
                    </Text>
                    {selectedCategory === category.key && (
                      <Feather name='check' size={20} color='#ffffff' />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  shrinkingHeader: {
    overflow: 'hidden',
  },
  dropdownSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dropdownButton: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  modalCategories: {
    paddingHorizontal: 20,
  },
  modalCategoryItem: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
  },
  modalCategoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalCategoryText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  bottomSpacer: {
    height: 100,
  },
  deadlineCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 140,
  },
  deadlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deadlineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  deadlineTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
    flexShrink: 1,
  },
  deadlineDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    flexShrink: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deadlineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    minHeight: 40,
  },
  countdownContainer: {
    flex: 1,
  },
  countdownLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  countdownText: {
    fontSize: 16,
    fontWeight: '800',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  calendarButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
