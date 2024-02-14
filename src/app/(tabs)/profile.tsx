import { VStack, Text } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { ScreenWrapper } from '~/src/components/layouts';
import { COLORS } from '~/src/constants/color';
import { useAppDispatch } from '~/src/services/state/redux/hooks';
import { logoutUserRedux } from '~/src/services/state/redux/slices/userSlice';

const Page = () => {
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
      <VStack>
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
    </ScreenWrapper>
  );
};

export default Page;
