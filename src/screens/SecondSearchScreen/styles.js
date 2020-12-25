import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  animatedInput: {
    alignSelf: 'center',
    backgroundColor: '#e63232',
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 5,
    position: 'absolute',
    width: '90%',
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
  },
  lookForTitleText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginTop: 15,
  },
  noResultsText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    marginTop: 20,
  },
  screen: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  searchInput: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    height: 45,
    marginHorizontal: 15,
  },
  searchScroll: {
    marginTop: 20,
    width: '100%',
  },
  searchScrollContent: {
    alignItems: 'stretch',
    paddingHorizontal: 25,
    paddingTop: 70,
  },
  watchText: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 18,
  },
});

export default styles;
