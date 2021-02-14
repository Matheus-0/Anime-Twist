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
    flex: 1,
    justifyContent: 'center',
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
    elevation: 5,
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
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  floatingMenuItemButton: {
    alignItems: 'center',
    backgroundColor: '#e63232',
    borderRadius: 22.5,
    elevation: 5,
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
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 95,
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
  },
  modal: {
    marginHorizontal: 20,
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
  modalButtonRed: {
    backgroundColor: '#e63232',
  },
  modalButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
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
    fontSize: 13,
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
    fontSize: 15,
    textAlign: 'center',
  },
  tipText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 20,
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
