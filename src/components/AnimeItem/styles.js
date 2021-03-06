import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  alternative: {
    color: 'rgba(255, 255, 255, 0.875)',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 11,
  },
  item: {
    marginBottom: 15,
  },
  ongoing: {
    justifyContent: 'center',
    paddingRight: 20,
  },
  removeContainer: {
    backgroundColor: '#232323',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 13,
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
