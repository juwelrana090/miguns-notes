import { initDB } from '@/db/database';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initDB();
      } catch (error) {
        console.error('DB init failed:', error);
      } finally {
        setReady(true);
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#6366F1' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Miguns Call Notes' }} />
        <Stack.Screen
          name="recording"
          options={{ title: 'New Recording', headerBackVisible: false }}
        />
        <Stack.Screen name="session/[id]" options={{ title: 'Session' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
