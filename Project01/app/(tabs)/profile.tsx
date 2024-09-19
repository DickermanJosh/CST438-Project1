import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import global from 'react';

const Profile = () => {
  const route = useRoute();
  console.log("route", route);
  console.log(parsedUser);
  console.log(parsedUser.username);
  
  return (
    <>
      <Text>User: {parsedUser.username}</Text>
      	<CustomButton 
      	title="Log Out"
      	handlePress={() => {router.push('/LoginScreen')}}	
      	/>       
    </>
  );
};

export default Profile;