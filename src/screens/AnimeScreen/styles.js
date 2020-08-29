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
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 27.5,
    height: 55,
    justifyContent: 'center',
    width: 55,
  },
  favoriteButtonView: {
    bottom: 20,
    position: 'absolute',
    right: 20,
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    paddingBottom: '25%',
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
