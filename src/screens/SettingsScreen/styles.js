import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  customCheckBox: {
    paddingHorizontal: 30,
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 7.5,
    width: '50%',
  },
  resetButtonsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    width: '100%',
  },
  resetButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
  },
  settingsContainer: {
    width: '100%',
  },
  settingsDescription: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  settingsDescriptionContainer: {
    marginVertical: 20,
  },
  settingsTitle: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
  settingsTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default styles;
