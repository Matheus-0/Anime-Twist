import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 10,
    padding: 15,
    zIndex: 2,
  },
  centerControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  centerControlsButton: {
    alignItems: 'center',
    borderRadius: 10,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  centerControlsPlayPauseIcon: {
    position: 'absolute',
  },
  checkBox: {
    marginRight: 15,
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
  errorButton: {
    backgroundColor: '#e63232',
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  errorText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
  errorView: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
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
  loading: {
    position: 'absolute',
    zIndex: 2,
  },
  lowerControls: {
    alignItems: 'stretch',
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
    width: 55,
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
