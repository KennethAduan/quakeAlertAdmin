import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="editProfile"
        options={{
          title: 'Edit Account',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
};

export default Layout;
