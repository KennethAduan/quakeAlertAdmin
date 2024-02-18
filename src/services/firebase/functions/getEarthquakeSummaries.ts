import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../config';
const useGetSummary = () => {
  const [value, loading, error] = useCollection(collection(db, 'summary'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const data = value
    ? value.docs.map((doc) => ({ docId: doc.id, ...doc.data() })) // Include docId in the returned data object
    : [];
  return { data, loading, error };
};

export default useGetSummary;
