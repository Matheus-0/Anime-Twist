import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  image: {
    height: 75,
    marginTop: '10%',
    width: 75,
  },
  loading: {
    marginTop: '35%',
  },
  loadingText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 14,
    marginTop: '5%',
    textAlign: 'center',
  },
  requestFailedButton: {
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginTop: '5%',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  requestFailedButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
  requestFailedContainer: {
    marginTop: '35%',
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
    marginTop: '35%',
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
