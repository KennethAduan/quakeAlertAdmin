import dayjs from 'dayjs'; // Import dayjs library
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '~/src/services/firebase/config';

const useAlertDates = () => {
  const [value, loading, error] = useCollection(collection(db, 'summary'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // Extract and format the Date field from each document
  const formattedDates = value
    ? value.docs.map((doc) => {
        // Convert Firestore Timestamp to JavaScript Date object
        const date = doc.data().Date.toDate();
        // Format the date to get the name of the month and day
        return dayjs(date).format('MMMM D');
      })
    : [];

  return { formattedDates, loading, error };
};

export default useAlertDates;
