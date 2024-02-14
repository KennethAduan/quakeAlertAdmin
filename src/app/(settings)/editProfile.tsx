import { VStack, Text } from '@gluestack-ui/themed';
import { updateDoc, query, collection, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { GlueStackInputField, CustomHeading } from '~/src/components';
import { KeyboardScreenWrapper } from '~/src/components/layouts';
import { COLORS } from '~/src/constants/color';
import FetchUserData from '~/src/hooks/firebase/fetchUserData';
import { db } from '~/src/services/firebase/config';

const Page = () => {
  const { userData, loading } = FetchUserData();
  const userId = userData?.userId;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (firstName === '' && lastName === '' && username === '' && password === '') {
      // If all fields are empty, do not update
      return;
    }

    const userQuery = query(collection(db, 'admin'), where('userId', '==', userId));

    // Data to update
    const newData = {
      firstName: firstName !== '' ? firstName : userData?.firstName,
      lastName: lastName !== '' ? lastName : userData?.lastName,
      username: username !== '' ? username : userData?.username,
      password: password !== '' ? password : userData?.password,
    };

    // Update the document
    try {
      setLoading(true);
      await updateDoc(userQuery, newData);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Update Success',
        autoClose: true,
        textBody: 'Profile updated successfully',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Update failed',
        autoClose: true,
        textBody: 'Something went wrong!',
      });
      console.error('Error updating document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardScreenWrapper>
      <Spinner visible={loading} color={COLORS.primary} />
      <Spinner visible={isloading} color={COLORS.primary} />
      <VStack mt={hp(10)} space="lg">
        {/* First name */}
        <VStack>
          <CustomHeading text="First Name" size={2} textAlign="left" />
          <GlueStackInputField
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder={userData?.firstName}
          />
        </VStack>
        {/* Last name */}
        <VStack>
          <CustomHeading text="Last Name" size={2} textAlign="left" />
          <GlueStackInputField
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder={userData?.lastName}
          />
        </VStack>
        {/* username */}
        <VStack>
          <CustomHeading text="Username" size={2} textAlign="left" />
          <GlueStackInputField
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder={userData?.username}
          />
        </VStack>
        {/* Password */}
        <VStack>
          <CustomHeading text="Password" size={2} textAlign="left" />
          <GlueStackInputField
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={userData?.password}
          />
        </VStack>
        {/* Address */}
        {/* <VStack>
          <CustomHeading text="Address" size={2} textAlign="left" />
          <GlueStackInputField
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder={userData?.address}
          />
        </VStack> */}
        {/* Contact No */}
        {/* <VStack>
          <CustomHeading text="Contact No" size={2} textAlign="left" />
          <GlueStackInputField
            value={contactNo}
            onChangeText={(text) => setContactNo(text)}
            placeholder={userData?.contactNo}
            keyboard="number-pad"
          />
        </VStack> */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: hp(5),
            justifyContent: 'center',
            borderRadius: wp(2),
          }}
          onPress={handleSaveProfile}>
          <Text color="white" textAlign="center" size="lg" fontFamily="PoppinsBold">
            Save Profile
          </Text>
        </TouchableOpacity>
      </VStack>
    </KeyboardScreenWrapper>
  );
};

export default Page;
