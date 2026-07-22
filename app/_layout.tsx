import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { color: '#111111' },
          headerTintColor: '#111111',
        }}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="game" options={{ title: 'Game' }} />
        <Stack.Screen name="result" options={{ title: 'Result' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
