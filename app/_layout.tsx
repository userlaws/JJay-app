import 'react-native-url-polyfill/auto';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BadgeProvider } from './contexts/BadgeContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function App() {
  return (
    <BadgeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </BadgeProvider>
  );
}
