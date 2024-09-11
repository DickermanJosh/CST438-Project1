import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, 
Text } from 'react-native';
import { db } from './db'; // Import your SQLite setup
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const Home = ({ route }) => {
  const { user } = route.params;
  console.log("user", user);
	return (
	    <View>
	      <Text>"Hello, {user.username}!"</Text>
	    </View>
	);
}

export default Home;

