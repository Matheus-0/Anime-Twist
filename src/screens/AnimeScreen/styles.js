import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  episodesContainer: {
    width: '100%',
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 30,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },
  video: {
    height: 180,
    width: 320,
  },
  videoContainer: {
    marginBottom: '10%',
  },
});

export default styles;
