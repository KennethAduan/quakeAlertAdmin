import { VStack } from '@gluestack-ui/themed';
import { BarChart } from 'react-native-gifted-charts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CustomHeading } from '~/src/components';
import { ScreenWrapper } from '~/src/components/layouts';
const Page = () => {
  const stackData = [
    {
      stacks: [
        { value: 10, color: 'orange' },
        { value: 20, color: '#4ABFF4', marginBottom: 2 },
      ],
      label: 'Jan',
    },
    {
      stacks: [
        { value: 10, color: '#4ABFF4' },
        { value: 11, color: 'orange', marginBottom: 2 },
        { value: 15, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'Mar',
    },
    {
      stacks: [
        { value: 14, color: 'orange' },
        { value: 18, color: '#4ABFF4', marginBottom: 2 },
      ],
      label: 'Feb',
    },
    {
      stacks: [
        { value: 7, color: '#4ABFF4' },
        { value: 11, color: 'orange', marginBottom: 2 },
        { value: 10, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'Mar',
    },
  ];
  return (
    <ScreenWrapper>
      <VStack space="lg">
        <CustomHeading text="Earthquake Summary" size={3} />
        <BarChart width={wp(70)} rotateLabel noOfSections={4} stackData={stackData} />
      </VStack>
    </ScreenWrapper>
  );
};

export default Page;
