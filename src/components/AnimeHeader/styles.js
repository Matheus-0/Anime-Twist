import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
  },
});

export default styles;
