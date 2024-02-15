import { VStack, Text } from '@gluestack-ui/themed';
import { updateDoc, query, collection, where, doc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { GlueStackInputField, CustomHeading } from '~/src/components';
import { ScreenWrapper } from '~/src/components/layouts';
import { COLORS } from '~/src/constants/color';
import FetchUserData from '~/src/hooks/firebase/fetchUserData';
import { db } from '~/src/services/firebase/config';

const Page = () => {
  const { userData, loading } = FetchUserData();
  const userId = userData?.userId;

  const [formState, setFormState] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    username: userData?.username || '',
    password: userData?.password || '',
    contactNo: userData?.contactNo || '',
    address: userData?.address || '',
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      ...userData,
    }));
  }, [userData]);

  const handleInputChange = (key: any, value: string) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [key]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const userQuery = query(collection(db, 'admin'), where('userId', '==', userId));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        throw new Error('User document not found');
      }

      const userDocRef = doc(db, 'admin', querySnapshot.docs[0].id);

      // Update the document
      await updateDoc(userDocRef, formState);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Update Success',
        autoClose: true,
        textBody: 'Profile updated successfully',
      });
    } catch (error) {
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
    <ScrollView>
      <KeyboardAvoidingView>
        <ScreenWrapper>
          <Spinner visible={loading || isLoading} color={COLORS.primary} />
          <VStack mt={hp(10)} space="lg">
            {/* First name */}
            <VStack>
              <CustomHeading text="First Name" size={2} textAlign="left" />
              <GlueStackInputField
                value={formState.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
                placeholder={userData?.firstName}
              />
            </VStack>
            {/* Last name */}
            <VStack>
              <CustomHeading text="Last Name" size={2} textAlign="left" />
              <GlueStackInputField
                value={formState.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
                placeholder={userData?.lastName}
              />
            </VStack>
            {/* username */}
            <VStack>
              <CustomHeading text="Username" size={2} textAlign="left" />
              <GlueStackInputField
                value={formState.username}
                onChangeText={(text) => handleInputChange('username', text)}
                placeholder={userData?.username}
              />
            </VStack>
            {/* Password */}
            <VStack>
              <CustomHeading text="Password" size={2} textAlign="left" />
              <GlueStackInputField
                value={formState.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder={userData?.password}
              />
            </VStack>
            {/* Address */}
            <VStack>
              <CustomHeading text="Address" size={2} textAlign="left" />
              <GlueStackInputField
                value={formState.address}
                onChangeText={(text) => handleInputChange('address', text)}
                placeholder={userData?.address}
              />
            </VStack>
            {/* Contact No */}
            <VStack>
              <CustomHeading text="Contact No" size={2} textAlign="left" />
              <GlueStackInputField
                value={formState.contactNo}
                onChangeText={(text) => handleInputChange('contactNo', text)}
                placeholder={userData?.contactNo}
                keyboard="number-pad"
              />
            </VStack>
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
        </ScreenWrapper>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Page;
