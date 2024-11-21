import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import ModalDropdown from '../components/ModalDropdown';
import ResultDisplay from '../components/ResultDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) throw new Error('Failed to fetch currencies');
      const data = await response.json();
      const currencyKeys = Object.keys(data.rates);
      const formattedCurrencies = currencyKeys.map((currency) => ({
        label: currency,
        value: currency,
      }));
      setCurrencies(formattedCurrencies);
    } catch (error) {
      console.error('Error fetching currencies:', error.message);
    }
  };
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedAmount = await AsyncStorage.getItem('amount');
        const savedBaseCurrency = await AsyncStorage.getItem('baseCurrency');
        const savedTargetCurrency = await AsyncStorage.getItem('targetCurrency');

        if (savedAmount) setAmount(savedAmount);
        if (savedBaseCurrency) setBaseCurrency(savedBaseCurrency);
        if (savedTargetCurrency) setTargetCurrency(savedTargetCurrency);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('amount', amount);
        await AsyncStorage.setItem('baseCurrency', baseCurrency);
        await AsyncStorage.setItem('targetCurrency', targetCurrency);
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    };
    saveSettings();
  }, [amount, baseCurrency, targetCurrency]);
  useEffect(() => {
    fetchCurrencies();
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
const handleConversion = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    try {
      setError('');
      setLoading(true);
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      const rate = data.rates[targetCurrency];
      if (!rate) throw new Error('Currency not found in the API response');
      const result = parseFloat(amount) * rate;
      setConvertedAmount(`${result.toFixed(2)} ${targetCurrency}`);
    } catch (error) {
      console.error('Error fetching exchange rates:', error.message);
      setError('Conversion failed. Please try again later.');
      setConvertedAmount('');
    } finally {
      setLoading(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };
   return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Converter</Text>
      <Text style={styles.label}>Enter Amount:</Text>
      <TouchableOpacity style={styles.input}>
        <Text>{amount || 'Type Amount'}</Text>
      </TouchableOpacity>
      <ModalDropdown
        selectedValue={baseCurrency}
        onSelectValue={(value) => setBaseCurrency(value)}
        options={currencies}
        placeholder="Select Base Currency"
      />
      <TouchableOpacity
        style={styles.swapButton}
        onPress={() => {
          const temp = baseCurrency;
          setBaseCurrency(targetCurrency);
          setTargetCurrency(temp);
        }}
      >
        <Text style={styles.swapText}>Swap</Text>
      </TouchableOpacity>
      <ModalDropdown
        selectedValue={targetCurrency}
        onSelectValue={(value) => setTargetCurrency(value)}
        options={currencies}
        placeholder="Select Target Currency"
      />
      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginVertical: 20 }} />}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Convert" onPress={handleConversion} />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  swapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#4CAF50',
    marginVertical: 10,
    borderRadius: 5,
  },
  swapText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default HomeScreen;
