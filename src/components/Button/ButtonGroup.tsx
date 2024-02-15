import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { COLORS } from '~/src/constants/color';
interface ButtonGroupProps {
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: (selected: string) => void; // Add a callback prop
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onSelectionChange }) => {
  const [selectedButton, setSelectedButton] = useState('Pending');
  const buttons = ['Pending', 'Confirmed', 'Rejected'];

  const renderButton = (label: string) => {
    const isSelected = selectedButton === label;

    const handlePress = () => {
      setSelectedButton(label);
      onSelectionChange(label); // Call the callback function with the new selection
    };

    return (
      <TouchableOpacity
        key={label}
        style={[styles.button, isSelected && styles.selectedButton]}
        onPress={handlePress}>
        <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return <View style={styles.container}>{buttons.map(renderButton)}</View>;
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'transparent', // Non-selected buttons are transparent
  },
  selectedButton: {
    backgroundColor: COLORS.primary, // Change to your preferred selected color
  },
  buttonText: {
    color: 'black', // Non-selected text color
    fontWeight: 'bold', //
  },
  selectedButtonText: {
    color: 'white', // Selected text color
  },
});

export default ButtonGroup;
