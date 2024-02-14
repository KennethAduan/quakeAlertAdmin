import { VStack, Box, Text } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CustomButton, GlueStackInputField } from '~/src/components';
import { KeyboardScreenWrapper } from '~/src/components/layouts';
import { COLORS } from '~/src/constants/color';
import { images } from '~/src/constants/imgs';
import CheckAdminCredentials from '~/src/services/firebase/functions/CheckAdminCredentials';
import { useAppDispatch } from '~/src/services/state/redux/hooks';
import { UserInfoRedux } from '~/src/services/state/redux/slices/userSlice';

const Page = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Sign In Failed',
        autoClose: true,
        textBody: 'Please fill in all fields.',
      });
      return;
    }

    setLoading(true);
    const signInResult = await CheckAdminCredentials({ username, password });
    console.log(signInResult);
    setLoading(false);

    if (signInResult.success) {
      // Authentication successful
      dispatch(UserInfoRedux({ isAuthenticated: true, user: signInResult.adminDoc }));
      // Handle successful authentication (e.g., navigate to another screen)
    } else {
      // Authentication failed
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Sign In Failed',
        autoClose: true,
        textBody: signInResult.message,
      });
    }
  };

  return (
    <KeyboardScreenWrapper>
      <Spinner visible={loading} color={COLORS.primary} />
      <VStack space="lg" mt={hp(10)}>
        <Image
          source={images.logoBanner2}
          style={{
            width: wp(80),
            height: hp(20),
            alignSelf: 'center',
            marginBottom: hp(5),
          }}
        />
        <Text fontFamily="PoppinsBold" textAlign="center" color="black" size="3xl">
          Admin
        </Text>
        {/* Email */}
        <GlueStackInputField
          placeholder="Username"
          icon="person-outline"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {/* Password */}
        <GlueStackInputField
          placeholder="Password"
          icon="lock-closed-outline"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Box>
          <CustomButton title="Sign In" buttonWidth={90} titleSize={2.3} onPress={handleSignIn} />
        </Box>
      </VStack>
    </KeyboardScreenWrapper>
  );
};

export default Page;
