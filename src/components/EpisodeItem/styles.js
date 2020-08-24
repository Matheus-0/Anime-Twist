import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  completeItem: {
    borderColor: '#e63232',
    borderWidth: 1,
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
    flex: 1,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
  },
  playingItem: {
    borderColor: '#646464',
    borderWidth: 1,
  },
});

export default styles;
