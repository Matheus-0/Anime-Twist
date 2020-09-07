import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  image: {
    height: 75,
    position: 'absolute',
    top: 20,
    width: 75,
  },
  requestFailedButton: {
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  requestFailedButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
  requestFailedContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  requestFailedText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
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
