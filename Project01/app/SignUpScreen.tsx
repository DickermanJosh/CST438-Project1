import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, Image } from 'react-native';
import { db } from './db'; // Import your SQLite setup

import { images } from '../constants';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Redirect, router } from 'expo-router';


const SignUpScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

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
    <View className="flex-1 bg-primary justify-center px-5" style={{ backgroundColor: '#161622' }}>
        {/* Image at the top */}
      <View className="items-center mb-10">
        <Image source={images.logo} className="w-[200px] h-[200px]" resizeMode="contain" />
      </View>


      <Text className="text-3xl text-secondary-200 text-center mb-8 font-bold">Sign Up</Text>

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
        className="border border-gray-400 rounded-lg p-3 mb-4 text-white bg-gray-800"
        placeholderTextColor="#B3B3B3"
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="border border-gray-400 rounded-lg p-3 mb-6 text-white bg-gray-800"
        placeholderTextColor="#B3B3B3"
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        className="mb-4 bg-secondary-100 rounded-lg w-full mt-2"
        onPress={handleSignUp}
        style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
