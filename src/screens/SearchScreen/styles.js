import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
    justifyContent: 'center',
  },
  search: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    width: '90%',
  },
  searchText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
  },
});

export default styles;
