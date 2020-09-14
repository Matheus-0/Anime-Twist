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
  eraseAllDataContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#e63232',
    borderRadius: 5,
    marginRight: 20,
    marginTop: 15,
  },
  eraseButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  eraseButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 12,
  },
  sectionTitle: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 15,
  },
  settingsContainer: {
    width: '100%',
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
