import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  favoriteDescription: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  favoriteDescriptionContainer: {
    marginTop: '5%',
  },
  favoriteTitle: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  favoriteTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7.5%',
  },
  noFavoriteContainer: {
    alignItems: 'center',
    marginTop: '30%',
    marginHorizontal: '5%',
  },
  noFavoriteText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'center',
  },
  removeAllFavoriteContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e63232',
    borderRadius: 5,
    marginRight: 20,
    marginTop: '5%',
  },
  removeAllFavoriteButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  removeAllFavoriteText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 12,
  },
  scrollView: {
    marginTop: '5%',
    width: '100%',
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
});

export default styles;
