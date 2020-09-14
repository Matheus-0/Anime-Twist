import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  completeItem: {
    borderColor: '#e63232',
    borderWidth: 1,
  },
  currentItem: {
    backgroundColor: '#e63232',
  },
  episodeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
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
  playingItem: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default styles;
