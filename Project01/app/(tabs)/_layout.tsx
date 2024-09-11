import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { View, Image, Text } from 'react-native';


import {icons} from '../../constants';

const TabIcon =({icon, color, name, focused}) =>{
    return (
        <View className="items-center justify-center gap-2" > 
            <Image
            source={icon}
            resizeMode ="contain"
            tintColor={color}
            className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} 
            style={{color:color}}>
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
          <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle:{
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: 84,
            }

          }}    
          >
            <Tabs.Screen
              name="home"
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color,focused }) => (
                  <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}

                  />


            
                ),
                headerShown: false, // Hide the header
              }}
            />
            <Tabs.Screen
              name="bookmark"
              options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ color,focused }) => (
                  <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  name="Favorites"
                  focused={focused}

                  />
            
                ),
                headerShown: false, // Hide the header
              }}
            />
            <Tabs.Screen
              name="create"
              options={{
                tabBarLabel: 'Create',
                tabBarIcon: ({ color,focused }) => (
                  <TabIcon
                  icon={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}

                  />
                ),
                headerShown: false, // Hide the header
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color,focused }) => (
                  <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}

                  />

                ),
                headerShown: false, // Hide the header
              }}
            />


          </Tabs>
        </>
      );
    };

export default TabsLayout;
