import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  alternative: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 12,
  },
  item: {
    marginBottom: 15,
  },
  removeContainer: {
    backgroundColor: '#232323',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
  },
  titlesAndRemoveContainer: {
    alignItems: 'stretch',
    backgroundColor: '#232323',
    borderRadius: 10,
    flexDirection: 'row',
    height: 55,
  },
  titlesContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default styles;
