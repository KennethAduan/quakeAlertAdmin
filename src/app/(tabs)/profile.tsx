import { FontAwesome5 } from '@expo/vector-icons';
import { VStack, Text, Box, Divider } from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CustomHeading } from '~/src/components';
import { ScreenWrapper } from '~/src/components/layouts';
import { COLORS } from '~/src/constants/color';
import FetchUserData from '~/src/hooks/firebase/fetchUserData';
import { useAppDispatch } from '~/src/services/state/redux/hooks';
import { logoutUserRedux } from '~/src/services/state/redux/slices/userSlice';

const Page = () => {
  const { userData, loading } = FetchUserData();

  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const fullName = firstName + ' ' + lastName;

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Logout',
      textBody: 'Are you sure you want to log out?',
      button: 'Continue',
      onPressButton() {
        dispatch(logoutUserRedux());
        Dialog.hide();
      },
    });
  };
  return (
    <ScreenWrapper>
      <Spinner visible={loading} color={COLORS.primary} />
      <CustomHeading text="Admin Account" size={4} />

      <VStack space="lg" justifyContent="center" mt={hp(10)}>
        <Box alignSelf="center">
          <FontAwesome5 name="user-alt" size={wp(30)} color="black" />
        </Box>

        <CustomHeading text={fullName} size={2.2} />
        <Divider />

        <VStack space="lg">
          <Link asChild href="/editProfile">
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: COLORS.black,
                borderRadius: wp(3.2),
                height: hp(5),
                justifyContent: 'center',
              }}>
              <Text textAlign="center" fontWeight="bold" color="black" size="lg">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </Link>
          <Link asChild href="/settings">
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: COLORS.black,
                borderRadius: wp(3.2),
                height: hp(5),
                justifyContent: 'center',
              }}>
              <Text textAlign="center" fontWeight="bold" color="black" size="lg">
                Setting
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              borderWidth: 1,
              borderColor: COLORS.black,
              borderRadius: wp(3.2),
              height: hp(5),
              justifyContent: 'center',
            }}>
            <Text textAlign="center" fontWeight="bold" color="black" size="lg">
              Logout
            </Text>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </ScreenWrapper>
  );
};

export default Page;
