import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';  // Using Picker for dropdown menu
import { icons } from '../constants';

const SearchInput = () => {
    const pathname = usePathname();
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('name');  // default search type is by name

    return (
        <SafeAreaView>
            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 
           rounded-2xl focus:border-secondary items-center flex-row space-x-4">
                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular"
                    value={query}
                    placeholder={`Search by ${searchType}`}  // Dynamic placeholder based on search type
                    placeholderTextColor="#7b7b8b"
                    onChangeText={(e) => setQuery(e)}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (!query) {
                            return Alert.alert("Missing query", "Please input something");
                        }
                        if (pathname.startsWith('/search')) {
                            router.setParams({ query, searchType });
                        } else {
                            // Sending the query & the type of search
                            router.push(`/search/${query}?searchType=${searchType}`);
                        }
                    }}
                >
                    <Image
                        source={icons.search}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>

            {/* Search Type Dropdown */}
            <View className="mt-4">
                <Text className="text-white mb-2">Select Search Type:</Text>
                <Picker
                    selectedValue={searchType}
                    onValueChange={(itemValue) => setSearchType(itemValue)}
                    style={{ color: 'white' }}
                >
                    <Picker.Item label="Name" value="name" />
                    <Picker.Item label="Ability" value="ability" />
                    <Picker.Item label="Type" value="type" />
                </Picker>
            </View>
        </SafeAreaView>
    );
};

export default SearchInput;
