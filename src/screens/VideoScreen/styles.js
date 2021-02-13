import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 10,
    padding: 15,
  },
  bottomButton: {
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
    borderRadius: 10,
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  bottomButtonText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
    marginLeft: 10,
    textAlign: 'center',
  },
  centerControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '46.875%',
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
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  containerTouchable: {
    flex: 1,
  },
  episodeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
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
    fontSize: 13,
    textAlign: 'center',
  },
  errorView: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
  },
  nextEpisodeView: {
    bottom: 45,
    position: 'absolute',
    right: 20,
    zIndex: 2,
  },
  resumeView: {
    bottom: 45,
    left: 20,
    position: 'absolute',
    zIndex: 2,
  },
  slider: {
    width: '100%',
  },
  sliderView: {
    bottom: 9.375,
    paddingHorizontal: 70,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  timeText: {
    bottom: 10,
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
    position: 'absolute',
    zIndex: 2,
  },
  timeTextLeft: {
    left: 20,
  },
  timeTextRight: {
    right: 20,
  },
  titleText: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 13,
    marginLeft: 15,
    maxWidth: Dimensions.get('screen').height * 0.625,
  },
  transparentView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  upperLeftView: {
    alignItems: 'center',
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  video: {
    height: '100%',
    width: '100%',
  },
});

export default styles;
