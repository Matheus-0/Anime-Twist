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
    marginTop: '5%',
  },
  historyTitle: {
    color: 'white',
    fontFamily: 'Quicksand_700Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  historyTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7.5%',
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
  removeAllHistoryContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e63232',
    borderRadius: 5,
    marginRight: 20,
    marginTop: '5%',
  },
  removeAllHistoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  removeAllHistoryText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 12,
  },
  scrollView: {
    marginTop: '5%',
    width: '100%',
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
});

export default styles;
