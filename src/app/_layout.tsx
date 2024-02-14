import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import AppProviders from '../services/providers';
import { useAppSelector } from '../services/state/redux/hooks';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

export default function RootLayout() {
  return (
    <AppProviders>
      <MainLayout />
    </AppProviders>
  );
}

function MainLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const segments = useSegments();
  const router = useRouter();
  // console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated === undefined) {
      console.log('You are not authenticated');
      return;
    }

    const inApp = segments[0] === '(tabs)';

    if (isAuthenticated && !inApp) {
      router.replace('/home');
    } else if (isAuthenticated === false) {
      router.replace('/signIn');
    }
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      {/* <Stack.Screen name="(settings)" /> */}
    </Stack>
  );
}
