import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import { BarChart } from 'react-native-gifted-charts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CustomHeading } from '~/src/components';
import { ScreenWrapper } from '~/src/components/layouts';
import useGetSummary from '~/src/services/firebase/functions/getEarthquakeSummaries';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dotComponent = (color: string) => {
  return <Box bg={color} h={hp(1.5)} w={wp(3)} borderRadius={100} />;
};

const titleLegendComponent = (title: string) => {
  return (
    <Text fontWeight="bold" color="black">
      {title}
    </Text>
  );
};
const Page = () => {
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = 'Month of ' + monthNames[currentMonthIndex];
  const { data } = useGetSummary();
  console.log('🚀 ~ Page ~ value:', data);

  // Initialize stackData array
  const stackData: any = [];

  // Check if data is available
  if (data) {
    // Loop through each summary object
    data.forEach((summary) => {
      const { Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, docId }: any =
        summary;
      // Extract month and day from the docId (assuming it's in "MMMM D" format)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [month, day] = docId.split(' ');
      // Create stacks for each level
      const stacks = [
        { value: Level1, color: '#CCCDCD' },
        { value: Level2, color: '#b4b4b4' },
        { value: Level3, color: 'lightblue' },
        { value: Level4, color: 'blue' },
        { value: Level5, color: 'lightgreen' },
        { value: Level6, color: '#ffcc00' },
        { value: Level7, color: 'orange' },
        { value: Level8, color: 'red' },
      ];

      // Add the stacks to stackData array
      stackData.push({ stacks, label: `Feb${day}` });
    });
  }

  return (
    <ScreenWrapper>
      <VStack space="xl">
        <VStack py={hp(1)} space="md" borderWidth={1} borderRadius={20}>
          <CustomHeading text="Labels" size={2.5} textAlign="center" />
          {/* Level 1 - 4 */}
          <HStack space="md" px={wp(4)}>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 1')}
              {dotComponent('#CCCDCD')}
            </HStack>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 2')}
              {dotComponent('#b4b4b4')}
            </HStack>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 3')}
              {dotComponent('lightblue')}
            </HStack>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 4')}
              {dotComponent('blue')}
            </HStack>
          </HStack>
          {/* Level 5 - 8 */}
          <HStack space="md" px={wp(4)}>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 5')}
              {dotComponent('lightgreen')}
            </HStack>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 6')}
              {dotComponent('#ffcc00')}
            </HStack>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 7')}
              {dotComponent('orange')}
            </HStack>
            <HStack alignItems="center" space="sm">
              {titleLegendComponent('Level 8')}
              {dotComponent('red')}
            </HStack>
          </HStack>
        </VStack>

        <CustomHeading text="Earthquake Summary" size={3} />

        <Box mt={hp(10)}>
          <BarChart width={wp(70)} noOfSections={4} stackData={stackData} />
        </Box>
        <Box mt={hp(4)}>
          <CustomHeading text={currentMonthName} size={2.5} />
        </Box>
      </VStack>
    </ScreenWrapper>
  );
};

export default Page;
