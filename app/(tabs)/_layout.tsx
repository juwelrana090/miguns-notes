import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/shared/components/TabBarIcon';
// eslint-disable-next-line import/no-named-as-default
import ProtectedRoute from '@/shared/components/ProtectedRoute';

export default function TabLayout() {
  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          title: '',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarStyle: {
            backgroundColor: 'rgba(10, 12, 42, 0.9)',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
