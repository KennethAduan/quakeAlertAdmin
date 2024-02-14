import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '~/src/services/firebase/config';
import { useAppSelector } from '~/src/services/state/redux/hooks';
const FetchUserData = () => {
  const { user } = useAppSelector((state) => state.user);
  const username = user.username;
  const [value, loading, error] = useDocument(doc(db, 'admin'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return { value, loading, error };
};

export default FetchUserData;
