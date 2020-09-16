import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  currentItem: {
    backgroundColor: '#e63232',
  },
  episodeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 10,
    height: 50,
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
    width: 70,
  },
});

export default styles;
