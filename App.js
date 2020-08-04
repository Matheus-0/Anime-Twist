/* eslint-disable react/no-unused-state */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { getAnimeList } from './src/api/api';

import Routes from './src/routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animeList: [],
    };
  }

  async componentDidMount() {
    this.setState({ animeList: await getAnimeList() });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Routes />
        <StatusBar style="light" />
      </View>
    );
  }
}
