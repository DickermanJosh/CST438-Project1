import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import Home from './Home';

// Create a Stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // The NavigationContainer wraps the entire navigation structure
    
      <Stack.Navigator initialRouteName="Login">        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    
  );
}
