import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 10,
    padding: 15,
    zIndex: 2,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  centerControlsButton: {
    borderRadius: 10,
    padding: 15,
  },
  centerControlsPlayPauseButton: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    width: 54,
  },
  centerControlsPlayPauseIcon: {
    position: 'absolute',
  },
  checkBoxText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
  },
  checkBoxView: {
    borderRadius: 10,
    padding: 15,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#191919',
    flex: 1,
    justifyContent: 'center',
  },
  containerTouchable: {
    flex: 1,
  },
  episodeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    marginLeft: 15,
  },
  gradient: {
    flex: 1,
  },
  gradientView: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  lowerControls: {
    alignItems: 'center',
    bottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  slider: {
    flex: 1,
  },
  timeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
    width: 50,
  },
  upperControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },
  upperLeftView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  video: {
    height: '100%',
    width: '100%',
  },
});

export default styles;
