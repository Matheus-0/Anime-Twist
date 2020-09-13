import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 10,
    paddingVertical: 7.5,
    width: 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 10,
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default styles;
