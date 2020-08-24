import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginRight: 20,
  },
  checkboxText: {
    color: '#cdcdcd',
    fontFamily: 'Quicksand_400Regular',
  },
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
  sourceErrorText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginBottom: '10%',
    paddingHorizontal: 20,
    textAlign: 'center',
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
    marginBottom: '5%',
    width: '85%',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    width: '100%',
  },
});

export default styles;
