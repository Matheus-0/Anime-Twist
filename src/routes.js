/* eslint-disable react/prop-types */
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AnimeScreen from './screens/AnimeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen from './screens/SearchScreen';
import SecondSearchScreen from './screens/SecondSearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import VideoScreen from './screens/VideoScreen';

const Tab = createBottomTabNavigator();

const AppStack = createStackNavigator();
const SearchStack = createStackNavigator();

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={() => ({
    animationEnabled: false,
    headerShown: false,
  })}
  >
    <SearchStack.Screen component={SearchScreen} name="Search" />
    <SearchStack.Screen component={SecondSearchScreen} name="SecondSearch" />
  </SearchStack.Navigator>
);

const BottomTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: '#232323',
        borderTopWidth: 0,
      },
    }}
  >
    <Tab.Screen
      component={SearchStackScreen}
      name="Search"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <AntDesign color={focused ? '#e63232' : color} name="search1" size={size} />
        ),
      }}
    />
    <Tab.Screen
      component={FavoritesScreen}
      name="Favorites"
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <AntDesign color={focused ? '#e63232' : color} name="hearto" size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default () => (
  <NavigationContainer>
    <AppStack.Navigator screenOptions={() => ({
      cardStyle: {
        backgroundColor: 'transparent',
      },
      headerShown: false,
    })}
    >
      <AppStack.Screen component={BottomTabs} name="BottomTabs" />
      <AppStack.Screen component={AnimeScreen} name="Anime" />
      <AppStack.Screen component={SettingsScreen} name="Settings" />
      <AppStack.Screen component={VideoScreen} name="Video" />
    </AppStack.Navigator>
  </NavigationContainer>
);
