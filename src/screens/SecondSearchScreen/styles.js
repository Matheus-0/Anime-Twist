import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  animatedInput: {
    alignSelf: 'center',
    backgroundColor: '#e63232',
    borderRadius: 5,
    paddingVertical: 5,
    position: 'absolute',
    zIndex: 1,
  },
  downloadText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  screen: {
    backgroundColor: '#191919',
    flex: 1,
  },
});

export default styles;
