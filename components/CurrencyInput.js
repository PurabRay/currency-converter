import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CurrencyInput = ({ value, onChangeText, selectedCurrency, onSelectCurrency, currencies }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter amount"
      />
   <DropDownPicker
  open={isDropdownOpen}
  value={selectedCurrency}
  items={currencies}
  setOpen={setIsDropdownOpen}
  setValue={onSelectCurrency}
  setItems={() => {}}
  containerStyle={{ zIndex: 1000 }}
  style={{ zIndex: 1000 }}
  dropDownContainerStyle={{ zIndex: 1000 }}
/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  dropdownContainer: {
    flex: 1,
  },
  dropdown: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
  },
  dropdownInner: {
    backgroundColor: 'white',
  },
});

export default CurrencyInput;
