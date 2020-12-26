import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  favoritesTitle: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  favoritesTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noFavoritesContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  noFavoritesText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    marginTop: 25,
    textAlign: 'center',
  },
  removeAllFavoritesButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  removeAllFavoritesContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e63232',
    borderRadius: 5,
    marginRight: 20,
    marginVertical: 15,
  },
  removeAllFavoritesText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 12,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
});

export default styles;
