import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  episodesContainer: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 30,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '10%',
    paddingHorizontal: '10%',
  },
  video: {
    aspectRatio: 16 / 9,
    height: undefined,
    width: '85%',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    width: '100%',
  },
});

export default styles;
