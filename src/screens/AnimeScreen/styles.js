import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
  },
  episodesContainer: {
    flex: 1,
    width: '100%',
  },
  episodesNotFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  episodesNotFoundText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    marginTop: 25,
    textAlign: 'center',
  },
  floatingButton: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 27.5,
    height: 55,
    justifyContent: 'center',
    width: 55,
  },
  floatingButtonView: {
    bottom: 25,
    position: 'absolute',
    right: 25,
  },
  floatingMenu: {
    alignItems: 'flex-end',
    bottom: 90,
    position: 'absolute',
    right: 25,
  },
  floatingMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  floatingMenuItemButton: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 22.5,
    height: 45,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 5,
    width: 45,
  },
  floatingMenuItemText: {
    backgroundColor: '#4b4b4b',
    borderRadius: 5,
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 90,
  },
  loading: {
    flex: 1,
  },
  modalButton: {
    alignItems: 'center',
    borderColor: '#e63232',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 5,
    width: '35%',
  },
  modalButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 10,
    paddingVertical: 20,
  },
  modalPromptText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginBottom: 10,
  },
  noConnectionButton: {
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  noConnectionButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
  noConnectionContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noConnectionText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  tipText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 40,
  },
});

export default styles;
