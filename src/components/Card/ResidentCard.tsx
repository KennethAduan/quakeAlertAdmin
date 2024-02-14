import { Ionicons } from '@expo/vector-icons';
import { Box, VStack, HStack, Text } from '@gluestack-ui/themed';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
interface ResidentCardProps {
  firstName: string;
  lastName: string;
  address: string;
  contactNo: string;
  email: string;
}
const ResidentCard = ({ firstName, lastName, address, contactNo, email }: ResidentCardProps) => {
  return (
    <Box width={wp(90)} height={hp(22)} bgColor="#CCCDCD" borderRadius={wp(4)} my={hp(1)}>
      <VStack mx={wp(5)} mt={hp(1.2)} space="lg">
        <HStack space="sm">
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text color="black">
            {firstName} {lastName}
          </Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="location" size={24} color="black" />
          <Text color="black">{address}</Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="call" size={24} color="black" />
          <Text color="black">{contactNo}</Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="mail" size={24} color="black" />
          <Text color="black">{email}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ResidentCard;
