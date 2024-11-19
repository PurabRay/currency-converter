import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CurrencyInput from '../components/CurrencyInput';
import ResultDisplay from '../components/ResultDisplay';
import axios from 'axios';

const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'JPY', value: 'JPY' },
    { label: 'INR', value: 'INR' },
  ];
const API_KEY='15baed3d1420cfe99bf65539'
const handleConversion = async () => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      ); 
      if (!response.ok) throw new Error("Failed to fetch exchange rates");
      const data = await response.json();
      const rate = data.rates[targetCurrency];
      if (!rate) throw new Error("Currency not found in the API response");
      const result = parseFloat(amount) * rate;
      setConvertedAmount(`${result.toFixed(2)} ${targetCurrency}`);
    } catch (error) {
      console.error("Error fetching exchange rates:", error.message);
      setConvertedAmount("Error fetching rates");
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      {/* Currency Input for Amount and Base Currency */}
      <CurrencyInput
        value={amount}
        onChangeText={(text) => setAmount(text)} // Update amount state
        selectedCurrency={baseCurrency}
        onSelectCurrency={(currency) => setBaseCurrency(currency)} // Update base currency
        currencies={currencies}
      />
      {/* Dropdown for Target Currency */}
      <CurrencyInput
        value={null} // No text input for target currency
        onChangeText={() => {}} // No action for text input
        selectedCurrency={targetCurrency}
        onSelectCurrency={(currency) => setTargetCurrency(currency)} // Update target currency
        currencies={currencies}
        isTargetCurrency // Optional flag to customize rendering
      />
      {/* Button to Trigger Conversion */}
      <Button title="Convert" onPress={handleConversion} />
      {/* Display the Conversion Result */}
      <ResultDisplay result={convertedAmount || 'No conversion yet'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});

export default HomeScreen;
