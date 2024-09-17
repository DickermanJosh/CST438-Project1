import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Slot, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {images} from '../../constants'
import CustomButton from "@/components/CustomButton";
import { db } from '../db';
import * as SQLite from 'expo-sqlite/legacy';

const Search = () => {
  const {query} = useLocalSearchParams();
  const [data, setData] = useState(null);

  const { user } = useLocalSearchParams(); // Access query and user parameters
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
    if (user) {
      let userData;
      if (Array.isArray(user)) {
          userData = user[0];
      } else {
          userData = user;
      }

      setParsedUser(JSON.parse(userData));
      }
  }, [user]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = `https://pokeapi.co/api/v2/pokemon/${query}`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result);  // Store the data in state
        // console.log(result.sprites.front_default); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (query) {
      fetchData();  
    }
  }, [query]); 
   
  const handleFavorite = async () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pokemon WHERE name = ?',
        [query], 
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert('Failure', 'Pokemon already favorited');
          } else {

            if (data && parsedUser && data.sprites) {
              tx.executeSql(
                'INSERT INTO pokemon (name, picture) VALUES (?, ?)',
                [query, data.sprites.front_default],
                (tx, insertResult) => {

                  tx.executeSql(
                    'SELECT * FROM pokemon WHERE name = ?',
                    [query], 
                    (tx, pokemonResults) => {
                      if (pokemonResults.rows.length > 0) {
                        const pokemonID = pokemonResults.rows._array[0].pokemonID;
                        const userID = parsedUser.id; 
  
                        tx.executeSql(
                          'SELECT * FROM UsersToPokemon WHERE pokemonID = ? AND userID = ?',
                          [pokemonID, userID],
                          (tx, favoriteResults) => {
                            if (favoriteResults.rows.length > 0) {
                              Alert.alert('Failure', 'Pokemon is already favorited');
                            } else {
                              tx.executeSql(
                                'INSERT INTO UsersToPokemon (userID, pokemonID) VALUES (?, ?)',
                                [userID, pokemonID],
                                (tx, results) => {
                                  Alert.alert('Success', 'Pokemon added to user\'s favorites');
                                  console.log("Insert successful");
                                },
                                (tx, error) => {
                                  Alert.alert('Failure', 'Failed to add Pokemon to user\'s favorites');
                                  console.error('Insert error:', error);
                                }
                              );
                            }
                          },
                          (tx, error) => {
                            Alert.alert('Failure', 'Error checking if Pokemon is favorited');
                            console.error('Error checking favorite:', error);
                          }
                        );
                      } else {
                        Alert.alert('Error', 'Failed to retrieve newly inserted Pokemon');
                      }
                    },
                    (tx, error) => {
                      Alert.alert('Failure', 'Error retrieving Pokemon after insert');
                      console.error('Error retrieving Pokemon:', error);
                    }
                  );
                },
                (tx, error) => {
                  Alert.alert('Failure', 'Error inserting new Pokemon');
                  console.error('Insert error:', error);
                  return false;
                }
              );
            }
          }
        },
        (tx, error) => {
          Alert.alert('Error', 'Failed to check Pokemon existence');
          console.error('Error checking Pokemon existence:', error);
        }
      );
    });
  };
  

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
      <CustomButton
        title="Favorite"
        // handlePress={() => {router.push('/home')}}
        handlePress={handleFavorite}
        containerStyles="w-full mt-7"
      />
    </SafeAreaView>
  );
};


export default Search;