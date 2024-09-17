import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('byName'); // Default is "by name"

  // Function to handle the search
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    // Based on the searchType, call the appropriate API
    switch (searchType) {
      case 'byName':
        fetchByName(searchTerm);
        break;
      case 'byAttribute':
        fetchByAttribute(searchTerm);
        break;
      case 'byAbility':
        fetchByAbility(searchTerm);
        break;
      default:
        break;
    }
  };

  // Mock functions for API calls
  const fetchByName = (name: string) => {
    console.log(`Fetching data by name: ${name}`);
    // Implement your API call here
    Alert.alert('API Call', `Fetching by Name: ${name}`);
  };

  const fetchByAttribute = (attribute: string) => {
    console.log(`Fetching data by attribute: ${attribute}`);
    // Implement your API call here
    Alert.alert('API Call', `Fetching by Attribute: ${attribute}`);
  };

  const fetchByAbility = (ability: string) => {
    console.log(`Fetching data by ability: ${ability}`);
    // Implement your API call here
    Alert.alert('API Call', `Fetching by Ability: ${ability}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search:</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <Text style={styles.label}>Search By:</Text>
      <Picker
        selectedValue={searchType}
        style={styles.picker}
        onValueChange={(itemValue) => setSearchType(itemValue)}
      >
        <Picker.Item label="By Name" value="byName" />
        <Picker.Item label="By Attribute" value="byAttribute" />
        <Picker.Item label="By Ability" value="byAbility" />
      </Picker>

      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default SearchScreen;
