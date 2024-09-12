import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

import { db } from './db'; // Import your SQLite setup
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import SignUpScreen from './SignUpScreen';
import { router } from 'expo-router';

// Define the navigation prop types
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: { user: any };
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user WHERE username = ?',
        [username],
        async (tx, results) => {
          console.log("Results", results);
          if (results.rows.length > 0) {
            const storedUser = results.rows.item(0);
            const passwordMatch = password === storedUser.password;

            if (passwordMatch) {
              Alert.alert('Success', 'Login successful');
              // Navigate to home or dashboard
              router.push({
                pathname: '/home',
                params: { user: JSON.stringify(storedUser) }, // Pass user data as a string
              });
            } else {
              Alert.alert('Error', 'Invalid username or password');
            }
          } else {
            Alert.alert('Error', 'Invalid username or password');
          }
        },
        (tx, error) => {
          console.log('Error querying user:', error);
          return true;
        }
      );
    });
  };

  const handleNavigation = () => {
    router.push('/SignUpScreen');
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
      {/* Wrap Buttons in a View to style */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleNavigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 10, gap: 10 },
  input: { borderBottomWidth: 1, marginBottom: 16 },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 5, // Optional: for rounded corners
    overflow: 'hidden', // Ensures the button has rounded corners
  },
});

export default LoginScreen;
