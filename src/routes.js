import React from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import DownloadScreen from './screens/DownloadScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Download') {
              iconName = 'download';
            }

            return <Feather color={color} name={iconName} size={size + (focused ? 0 : 2)} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          style: {
            backgroundColor: '#191919',
            height: 60,
          },
          tabStyle: {
            marginBottom: 5,
          },
        }}
      >
        <Tab.Screen component={SearchScreen} name="Search" />
        <Tab.Screen component={DownloadScreen} name="Download" />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
