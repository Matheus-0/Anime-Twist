import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HistoryScreen from './screens/HistoryScreen';
import SearchScreen from './screens/SearchScreen';
import SecondSearchScreen from './screens/SecondSearchScreen';
import AnimeScreen from './screens/AnimeScreen';

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

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'History') {
            iconName = 'history';
          }

          return (
            <FontAwesome
              color={color}
              name={iconName}
              size={size + (focused ? 0 : 2)}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
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
      <Tab.Screen component={SearchStackScreen} name="Search" />
      <Tab.Screen component={HistoryScreen} name="History" />
    </Tab.Navigator>
  </NavigationContainer>
);
