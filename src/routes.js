import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HistoryScreen from './screens/HistoryScreen';
import SearchScreen from './screens/SearchScreen';
import SecondSearchScreen from './screens/SecondSearchScreen';
import AnimeScreen from './screens/AnimeScreen';

const HistoryStack = createStackNavigator();
const SearchStack = createStackNavigator();

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={() => ({
    animationEnabled: false,
    headerShown: false,
  })}
  >
    <SearchStack.Screen
      component={SearchScreen}
      name="Search"
    />
    <SearchStack.Screen
      component={SecondSearchScreen}
      name="SecondSearch"
    />
    <SearchStack.Screen
      component={AnimeScreen}
      name="Anime"
    />
  </SearchStack.Navigator>
);

const HistoryStackScreen = () => (
  <HistoryStack.Navigator screenOptions={() => ({
    cardStyle: {
      backgroundColor: 'transparent',
    },
    headerShown: false,
  })}
  >
    <HistoryStack.Screen
      component={HistoryScreen}
      name="History"
    />
    <HistoryStack.Screen
      component={AnimeScreen}
      name="Anime"
    />
  </HistoryStack.Navigator>
);

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e66e6e',
        labelStyle: {
          fontFamily: 'Quicksand_400Regular',
        },
        style: {
          backgroundColor: '#191919',
          borderTopColor: 'black',
          height: 60,
        },
        tabStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        component={SearchStackScreen}
        name="Search"
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              color={focused ? '#e63232' : color}
              name="search"
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        component={HistoryStackScreen}
        name="History"
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome
              color={focused ? '#e63232' : color}
              name="history"
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
