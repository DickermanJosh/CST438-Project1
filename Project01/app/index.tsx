import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack"> Pokemon </Text>
      <Link href="/home" className="text-blue-500">
        Go to Home
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
