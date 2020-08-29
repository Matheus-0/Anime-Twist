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
    paddingTop: 15,
  },
  episodesContainer: {
    flex: 1,
    width: '100%',
  },
  episodesNotFoundContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  episodesNotFoundText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#070707',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  loading: {
    flex: 1,
  },
  noConnectionButton: {
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginTop: '5%',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  noConnectionButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
  noConnectionContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noConnectionText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    textAlign: 'center',
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
    fontSize: 25,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '7.5%',
    marginTop: '7.5%',
    paddingHorizontal: '10%',
  },
  video: {
    aspectRatio: 16 / 9,
    height: undefined,
    marginBottom: '2.5%',
    width: '90%',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2.5%',
    width: '100%',
  },
});

export default styles;
