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
    marginTop: 20,
  },
  favoriteTitle: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
  favoriteTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noFavoriteContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  noFavoriteText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 20,
    marginTop: 25,
    textAlign: 'center',
  },
  removeAllFavoriteContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e63232',
    borderRadius: 5,
    marginRight: 20,
    marginTop: 15,
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
    marginTop: 15,
    width: '100%',
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
});

export default styles;
