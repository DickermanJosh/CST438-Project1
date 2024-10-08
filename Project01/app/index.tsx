import { Text, View,ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
  
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import Home from './Home';

import{images} from "../constants";
import CustomButton from "@/components/CustomButton";

import { UserProvider } from './userContext';
  
// Create a Stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // The NavigationContainer wraps the entire navigation structure
    // Stack navigator from loginPage merge
    <>
    <UserProvider>
      <Stack.Navigator initialRouteName="Login">        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login', headerShown: false }}
          
          
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up',headerShown: false  }}
        />
        <Stack.Screen name="Home" component={Home}
         options={{ headerShown: false }}  />
      </Stack.Navigator>
    
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-center text-white">Welcome to our App!</Text>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
          source={images.logo}
          className="[w-400px] h-[250px]" 
          resizeMode="contain"
          />
        
          <Text className="text-3xl text-white font-bold text-center">  {' '} 
          <Text className="text-secondary-200">Pokemon App</Text>
          </Text>
          <Image
          source= { images.path}
          className="w-[400px] h-[25px] absolute-bottom-2 -right-8"
          resizeMode="contain"
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
           </Text >

           
              <CustomButton
                title="Login"
                // handlePress={() => {router.push('/home')}}
                handlePress={() => {router.push('/LoginScreen')}}
                containerStyles="w-full mt-7"
              />
           
       
             

        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style='light'/>
    </SafeAreaView>
    </UserProvider>
    </>
  );
}
