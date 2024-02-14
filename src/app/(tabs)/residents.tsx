import { Box } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { ScreenWrapper } from '../../components/layouts/index';

import ResidentCard from '~/src/components/Card/ResidentCard';
import { COLORS } from '~/src/constants/color';
import FetchResidentsData from '~/src/hooks/firebase/fetchResidentsData';

const Page = () => {
  const { value, loading } = FetchResidentsData();
  const residentsData = value ? value.docs.map((doc) => doc.data()) : [];
  return (
    <ScreenWrapper>
      <Spinner visible={loading} color={COLORS.primary} />
      {value && (
        <Box h={hp(80)} w={wp(100)}>
          <FlashList
            data={residentsData}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }: any) => (
              <ResidentCard
                firstName={item.firstName}
                lastName={item.lastName}
                address={item.address}
                contactNo={item.phoneNumber || item.contactNo}
                email={item.email}
              />
            )}
            estimatedItemSize={50}
          />
        </Box>
      )}
    </ScreenWrapper>
  );
};

export default Page;
