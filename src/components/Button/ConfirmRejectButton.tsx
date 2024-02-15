import { Button, ButtonText, HStack } from '@gluestack-ui/themed';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';

import { COLORS } from '~/src/constants/color';
import { db } from '~/src/services/firebase/config';
interface Props {
  docId: string;
}

interface PropsUpdate {
  docId: string;
  newStatus: string;
}

const updateDocumentStatus = async ({ docId, newStatus }: PropsUpdate) => {
  console.log('🚀 ~ updateDocumentStatus ~ docId, newStatus:', docId, newStatus);

  try {
    const docRef = doc(db, 'rescueRequest', docId);
    await updateDoc(docRef, {
      'data.status': newStatus,
    });
    console.log('Document status updated successfully');
  } catch (error) {
    console.error('Error updating document status:', error);
    throw error;
  }
};

const ConfirmRejectButton = ({ docId }: Props) => {
  const [loading, setLoading] = useState(false);
  const confirm = async () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Confirmation',
      textBody: 'Confirm Request ? ',
      button: 'Continue',
      onPressButton() {
        setLoading(true);
        updateDocumentStatus({ docId, newStatus: 'confirmed' });
        setLoading(false);
        Dialog.hide();
      },
    });
  };

  const reject = async () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Rejection',
      textBody: 'Reject Request ? ',
      button: 'Continue',
      onPressButton() {
        setLoading(true);
        updateDocumentStatus({ docId, newStatus: 'rejected' });
        setLoading(false);
        Dialog.hide();
      },
    });
  };

  return (
    <>
      <Spinner visible={loading} color={COLORS.primary} />
      <HStack space="lg" justifyContent="center" my={10}>
        <Button action="positive" size="sm" borderRadius={10} onPress={confirm}>
          <ButtonText>CONFIRM</ButtonText>
        </Button>

        <Button action="negative" size="sm" borderRadius={10} onPress={reject}>
          <ButtonText>REJECT</ButtonText>
        </Button>
      </HStack>
    </>
  );
};

export default ConfirmRejectButton;
