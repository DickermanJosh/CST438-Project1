import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from './db'; // Import your SQLite setup
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { router } from 'expo-router';

// Define the navigation prop types
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }  

    console.log("sign up button pressed");

    // Save user to SQLite
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO user (username, password) VALUES (?, ?)',
        [username, password],
        () => {
          Alert.alert('Success', 'User registered successfully');
          router.push('/LoginScreen'); 
        },
        (tx, error) => {
          Alert.alert('Error', 'User not registered');
          console.log('Error inserting user:', error);
          return true; 
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16 },
});

export default SignUpScreen;
