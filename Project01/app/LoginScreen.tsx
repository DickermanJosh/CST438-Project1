import React, { useState } from 'react';

import { View, TextInput, Button, Alert, StyleSheet ,Image, Text,TouchableOpacity  } from 'react-native';
import { Redirect, router } from 'expo-router';

import { db } from './db'; // Import your SQLite setup
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
 import { images } from '../constants';
import SignUpScreen from './SignUpScreen';


const LoginScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user WHERE username = ?',
        [username],
        async (tx, results) => {
          if (results.rows.length > 0) {
            const storedUser = results.rows.item(0);
            const passwordMatch = password === storedUser.password;

            if (passwordMatch) {
              Alert.alert('Success', 'Login successful');
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
    <View className="flex-1 bg-primary justify-center px-5" style={{ backgroundColor: '#161622' }}>
      {/* Image at the top */}
      <View className="items-center mb-10">
        <Image source={images.logo} className="w-[200px] h-[200px]" resizeMode="contain" />
      </View>
      <Text className="text-3xl text-secondary-200 text-center mb-8 font-bold">Log In</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-400 rounded-lg p-3 mb-4 text-white bg-gray-800"
        placeholderTextColor="#B3B3B3"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-400 rounded-lg p-3 mb-6 text-white bg-gray-800"
        placeholderTextColor="#B3B3B3"
      />

      {/* Login Button */}
      <TouchableOpacity 
        className="mb-4 bg-secondary-100 rounded-lg w-full mt-2" 
        onPress={handleLogin} 
        style={{  padding: 15, alignItems: 'center', borderRadius: 10 }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity 
        className="bg-secondary-100 rounded-lg w-full mt-2" 
        onPress={handleNavigation} 
        style={{  padding: 15, alignItems: 'center', borderRadius: 10 }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
