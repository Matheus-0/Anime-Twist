import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  historyDescription: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  historyDescriptionContainer: {
    marginBottom: '10%',
  },
  historyTitle: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 30,
    textAlign: 'center',
  },
  historyTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },
  noHistoryContainer: {
    alignItems: 'center',
    marginTop: '30%',
  },
  noHistoryText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'center',
  },
});

export default styles;
