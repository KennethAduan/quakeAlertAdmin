import { Ionicons } from '@expo/vector-icons';
import { Box, VStack, HStack, Text } from '@gluestack-ui/themed';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CustomHeading from '../ui/CustomHeading';
interface ResidentCardProps {
  firstName: string;
  lastName: string;
  address: string;
  contactNo: string;
  email: string;
}
const ResidentCard = ({ firstName, lastName, address, contactNo, email }: ResidentCardProps) => {
  return (
    <Box width={wp(90)} height="auto" py={hp(2)} bgColor="#CCCDCD" borderRadius={wp(4)} my={hp(1)}>
      <VStack mx={wp(5)} mt={hp(1.2)} space="lg">
        <CustomHeading text="Resident Personal Details" size={2} />
        <HStack space="sm">
          <Ionicons name="person-circle-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {firstName} {lastName}
          </Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="location-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {address}
          </Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="call-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {contactNo}
          </Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="mail-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {email}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ResidentCard;
