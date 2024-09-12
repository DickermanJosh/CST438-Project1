import { Image, View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert} from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {icons} from '../constants'
import { usePathname, router } from 'expo-router';


const SearchInput = () => {
    const pathname = usePathname()
    const [query, setQuery] = useState('');
    return (
           <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 
           rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput 
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder={"Search for a pokemon by name"}
                placeholderTextColor="#7b7b8b"
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if(!query){
                        return Alert.alert("missing query", "Pease input something")
                    }
                    if(pathname.startsWith('/search')) router. setParams({query})
                    else router.push(`/search/${query}`)

                }}
            >
                <Image
                  source={icons.search}
                  className='w-5 h-5'
                  resizeMode='contain'
                />
            </TouchableOpacity>
           </View>
    )
}

export default SearchInput