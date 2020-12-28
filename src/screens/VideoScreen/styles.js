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
    justifyContent: 'space-between',
    position: 'absolute',
    width: '50%',
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
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  nextEpisodeText: {
    color: 'white',
    fontFamily: 'Quicksand_400Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  nextEpisodeView: {
    alignItems: 'center',
    bottom: 45,
    position: 'absolute',
    right: 20,
    width: 165,
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
