import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Box, VStack, HStack, Text } from '@gluestack-ui/themed';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import ConfirmRejectButton from '../Button/ConfirmRejectButton';
import CustomHeading from '../ui/CustomHeading';

interface Props {
  docId: string;
  date: Timestamp; // Assuming date is a Firebase Timestamp
  location: string;
  contactNo: string;
  isWithAmbulance: boolean;
  name: string;
  status: string;
}

const RescueResponseCard = ({
  date,
  location,
  contactNo,
  isWithAmbulance,
  name,
  status,
  docId,
}: Props) => {
  // Convert Firebase Timestamp to JavaScript Date object
  const jsDate = date.toDate();
  const formattedDate = dayjs(jsDate).format('MMMM DD, YYYY');
  const formattedTime = dayjs(jsDate).locale('en').format('hh:mm A');

  return (
    <Box width={wp(90)} height="auto" bgColor="#CCCDCD" borderRadius={wp(4)} my={hp(1)}>
      <VStack mx={wp(5)} mt={hp(1.2)} py={hp(2)} space="lg">
        <HStack justifyContent="space-between">
          <CustomHeading text="RESCUE REQUEST DETAILS" textAlign="left" size={1.5} />
          {isWithAmbulance && (
            <HStack space="sm">
              <FontAwesome name="ambulance" size={18} color="black" />
            </HStack>
          )}
        </HStack>
        <HStack justifyContent="space-between">
          <HStack space="sm">
            <Ionicons name="calendar-outline" size={20} color="black" />
            <Text size="sm" color="black">
              {formattedDate}
            </Text>
          </HStack>
          <HStack space="sm">
            <Ionicons name="time-outline" size={20} color="black" />
            <Text size="sm" color="black">
              {formattedTime}
            </Text>
          </HStack>
        </HStack>
        <HStack space="sm">
          <Ionicons name="person-circle-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {name}
          </Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="location-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {location}
          </Text>
        </HStack>
        <HStack space="sm">
          <Ionicons name="call-outline" size={20} color="black" />
          <Text color="black" size="sm">
            {contactNo}
          </Text>
        </HStack>
      </VStack>
      {status === 'Not Yet Response' && (
        <>
          <ConfirmRejectButton docId={docId} />
        </>
      )}

      {status === 'rejected' && (
        <>
          <Box
            alignSelf="center"
            w={wp(80)}
            borderRadius={wp(2)}
            h={hp(5)}
            justifyContent="center"
            my={hp(2)}
            backgroundColor="red">
            <Text color="white" size="md" fontWeight="bold" textAlign="center">
              No earthquake was detected
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RescueResponseCard;
