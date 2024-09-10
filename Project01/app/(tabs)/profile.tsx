import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

const Profile = () => {
  return (
    <>
      <Text>Headers</Text>
      <Slot />
      <Text>Footers</Text>
    </>
  );
};

export default Profile;