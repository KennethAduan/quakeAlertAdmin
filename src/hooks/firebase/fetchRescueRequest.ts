import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '~/src/services/firebase/config';

const FetchRescueRequest = (status: string) => {
  const rescueRequestQuery = query(
    collection(db, 'rescueRequest'),
    where('data.status', '==', status),
    orderBy('data.date', 'desc') // Sort by date in descending order
  );

  const [value, loading, error] = useCollection(rescueRequestQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const rescueRequestData = value
    ? value.docs.map((doc) => ({ docId: doc.id, ...doc.data() })) // Include docId in the returned data object
    : [];

  return { rescueRequestData, loading, error };
};

export default FetchRescueRequest;
