import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Slot, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {images} from '../../constants'

const Search = () => {
  const {query} = useLocalSearchParams();
  const [data, setData] = useState(null);
  let sprite;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = `https://pokeapi.co/api/v2/pokemon/${query}`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result);  // Store the data in state
        console.log(result.sprites.front_default); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (query) {
      fetchData();  // Call the API only when query is available
    }
  }, [query]);  // useEffect will run again if `query` changes

  return (
    <SafeAreaView className='bg-primary h-full'>
      <Text className='text-3xl text-white text-center'>{query}</Text>
      {data && data.sprites && (
        <View className='mt-1.5 flex items-center justify-center'>
          <Image
            source={{ uri: data.sprites.front_default }}
            style={{ width: 200, height: 200 }} 
            resizeMode="contain"
          />
        </View>
      )}
    </SafeAreaView>
  );
};


export default Search;