import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { db } from '~/src/services/firebase/config';
import { useAppSelector } from '~/src/services/state/redux/hooks';

const FetchUserData = () => {
  const { user } = useAppSelector((state) => state.user);
  const userId = user.userId;

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userQuery = query(collection(db, 'admin'), where('userId', '==', userId));
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          // Assuming there's only one document matching the userId
          setUserData(doc.data());
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred while fetching user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, loading, error };
};

export default FetchUserData;
