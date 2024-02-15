import { Box } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import ButtonGroup from '~/src/components/Button/ButtonGroup';
import RescueResponseCard from '~/src/components/Card/RescueResponseCard';
import { ScreenWrapper } from '~/src/components/layouts';
import { COLORS } from '~/src/constants/color';
import FetchRescueRequest from '~/src/hooks/firebase/fetchRescueRequest';

const Page = () => {
  const [status, setStatus] = useState('Not Yet Response');

  const { rescueRequestData, loading } = FetchRescueRequest(status);
  console.log('🚀 ~ Page ~  rescueRequestData,:', rescueRequestData);

  const handleSelectionChange = (selected: string) => {
    // Set the status based on the selected category
    if (selected === 'Pending') {
      setStatus('Not Yet Response');
    } else if (selected === 'Confirmed') {
      setStatus('confirmed');
    } else {
      setStatus('rejected');
    }
  };

  return (
    <ScreenWrapper>
      <Spinner visible={loading} color={COLORS.primary} />
      <ButtonGroup onSelectionChange={handleSelectionChange} />

      <Box h={hp(75)} w={wp(100)}>
        <FlashList
          data={rescueRequestData}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }: any) => (
            <RescueResponseCard
              docId={item.docId}
              status={item.data.status}
              date={item.data.date}
              location={item.data.address}
              contactNo={item.data.contact}
              isWithAmbulance={item.data.isWithAmbulance}
              name={item.data.name}
            />
          )}
          estimatedItemSize={50}
        />
      </Box>
    </ScreenWrapper>
  );
};

export default Page;
