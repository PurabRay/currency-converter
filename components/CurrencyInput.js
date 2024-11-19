import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CurrencyInput = ({ value, onChangeText, selectedCurrency, onSelectCurrency, currencies, isTargetCurrency }) => {
  return (
    <View style={styles.container}>
      {!isTargetCurrency && (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter amount"
        />
      )}
      <RNPickerSelect
        onValueChange={onSelectCurrency}
        items={currencies}
        value={selectedCurrency}
        placeholder={{ label: "Select Currency", value: null }} // Placeholder for the dropdown
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
});

export default CurrencyInput;
