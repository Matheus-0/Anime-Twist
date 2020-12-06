import { Dimensions, StyleSheet } from 'react-native';

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
    width: '62.5%',
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
    textShadowOffset: {
      height: 1,
      width: 1,
    },
    textShadowRadius: 5,
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
  nextEpisodeButton: {
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
    borderRadius: 10,
    height: 35,
    justifyContent: 'center',
    width: 75,
  },
  nextEpisodeButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
  },
  nextEpisodeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
    textShadowOffset: {
      height: 1,
      width: 1,
    },
    textShadowRadius: 5,
  },
  nextEpisodeView: {
    alignItems: 'center',
    bottom: 45,
    position: 'absolute',
    right: 15,
    width: 180,
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
  titleText: {
    color: 'white',
    fontFamily: 'Quicksand_600SemiBold',
    marginLeft: 15,
    maxWidth: Dimensions.get('screen').height * 0.625,
  },
  upperLeftView: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  video: {
    height: '100%',
    width: '100%',
  },
});

export default styles;
