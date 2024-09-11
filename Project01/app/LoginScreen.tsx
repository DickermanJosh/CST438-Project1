import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

import { db } from './db'; // Import your SQLite setup
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the navigation prop types
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
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
          console.log("Results",results)
          if (results.rows.length > 0) {
            const storedUser = results.rows.item(0);
            const passwordMatch = password === storedUser.password ? true : false;

            if (passwordMatch) {
              Alert.alert('Success', 'Login successful');
              // Navigate to home or dashboard
              navigation.navigate('Home', { user: storedUser })
            } else {
              Alert.alert('Error', 'Invalid username or password');
            }
          } else {
            Alert.alert('Error', 'Invalid username or password');
          }
        },
        (tx, error) => {
          console.log('Error querying user:', error);
        }
      );
    });
  };

  const handleNavigation = () => {
    navigation.navigate('SignUp')
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
      <Button title="Login" onPress={handleLogin} style={styles.buttonContainer} />

      <Button title="Sign Up" onPress={handleNavigation} style={styles.buttonContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 10, gap: 10 },
  input: { borderBottomWidth: 1, marginBottom: 16 },  
});

export default LoginScreen;
