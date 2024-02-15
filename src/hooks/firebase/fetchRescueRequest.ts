import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '~/src/services/firebase/config';

const FetchRescueRequest = (status: string) => {
  const rescueRequestQuery = query(
    collection(db, 'rescueRequest'),
    where('data.status', '==', status)
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
