import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '~/src/services/firebase/config';
const FetchResidentsData = () => {
  const [value, loading, error] = useCollection(collection(db, 'users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return { value, loading, error };
};

export default FetchResidentsData;
