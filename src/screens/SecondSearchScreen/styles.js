import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  animatedInput: {
    alignSelf: 'center',
    backgroundColor: '#e63232',
    borderRadius: 5,
    paddingVertical: 5,
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  downloadText: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
  },
  lookForTitleText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginTop: 15,
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
});

export default styles;
