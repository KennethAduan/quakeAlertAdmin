import { collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '../config';

interface UserPropsSignIn {
  username: string;
  password: string;
}

interface AdminAuthResult {
  success: boolean;
  message: string;
  adminDoc?: any; // Modify this type according to your admin document structure
}

const CheckAdminCredentials = async ({
  username,
  password,
}: UserPropsSignIn): Promise<AdminAuthResult> => {
  try {
    // Query the admin collection based on the provided username
    const adminQuery = query(collection(db, 'admin'), where('username', '==', username));
    const querySnapshot = await getDocs(adminQuery);

    // Check if there's a document with the provided username
    if (querySnapshot.size === 0) {
      return { success: false, message: 'Invalid username' };
    }

    // Retrieve the first document (assuming usernames are unique)
    const adminDoc = querySnapshot.docs[0].data();

    // Compare the provided password with the password in the document
    if (adminDoc.password !== password) {
      return { success: false, message: 'Incorrect password' };
    }

    // Username and password match
    return { success: true, message: 'Authentication successful', adminDoc };
  } catch (error) {
    console.error('Error checking admin credentials:', error);
    return { success: false, message: 'An error occurred' };
  }
};

export default CheckAdminCredentials;
