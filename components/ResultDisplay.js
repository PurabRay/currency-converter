import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultDisplay = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Converted Amount:</Text>
      <Text style={styles.result}>{result || 'No conversion yet'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ResultDisplay;
