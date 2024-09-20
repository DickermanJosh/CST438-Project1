import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

const Profile = () => {
  const route = useRoute();
  console.log('Route Params:', route.params); // Log to check the parameters
  const { user } = route.params || {}; // Ensure route.params is defined
  // const parsedUser = user ? JSON.parse(user) : { username: 'Guest', id: 'N/A' };

  useEffect(() => {
    console.log('Parsed User:', parsedUser); // Check if the user is parsed correctly
  }, [parsedUser]);

  const handleLogout = () => {
    router.push('/LoginScreen');
  };

  return (
    <SafeAreaView className="bg-gray-900 flex-1 justify-center items-center">
      {/* Display Username */}
      <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>
        Welcome, {parsedUser.username}!
      </Text>

      {/* Custom Button */}
      <TouchableOpacity 
        className="mt-6 bg-secondary-100 rounded-lg w-60" 
        onPress={handleLogout} 
        style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
