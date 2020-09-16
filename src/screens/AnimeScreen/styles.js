import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginRight: 20,
    zIndex: -1,
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  episodesNotFoundText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    marginTop: 25,
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
    bottom: 25,
    position: 'absolute',
    right: 25,
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  loading: {
    flex: 1,
  },
  noConnectionButton: {
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginTop: 20,
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
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 40,
  },
  video: {
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
    height: undefined,
    marginBottom: 5,
    width: '90%',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
  },
});

export default styles;
