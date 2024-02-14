import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { COLORS } from '~/src/constants/color';
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarLabelStyle: {
          fontFamily: 'PoppinsBold',
          // marginBottom: hp(0.1),
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerShown: true,
        headerTintColor: COLORS.white,
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        // headerTransparent: true,
        // headerRight: () => <LogoRightSide />,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <Ionicons name="home" size={size} color={color} />
            ) : (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',

          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <MaterialCommunityIcons name="bell-ring" size={size} color={color} />
            ) : (
              <MaterialCommunityIcons name="bell-ring-outline" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="residents"
        options={{
          title: 'Residents',
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <Ionicons name="people-circle" size={size} color={color} />
            ) : (
              <Ionicons name="people-circle-outline" size={size} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) =>
            focused ? (
              <Ionicons name="person-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
