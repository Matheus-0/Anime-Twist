import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 10,
    paddingVertical: 7.5,
    width: 87.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '87.5%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 10,
    paddingVertical: 20,
  },
  modal: {
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default styles;
