/* eslint-disable no-use-before-define */
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes,Dimensions } from 'react-native';
import Video from 'react-native-video';
// import Video from 'react-native-video-controls';
import Lightbox from 'react-native-lightbox';
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";



 var controls = Video;
 var paused = true;

    handleEnd = () => {
    console.warn("4");
    paused = !paused;
    controls.seek(0);
  };

export default function MessageVideo({
  containerStyle,
  videoProps,
  lightboxProps,
  videoStyle,
  currentMessage,
}) {
  
  return (
    <View style={[styles.container, containerStyle]}>
 
          <Video
        {...videoProps}
        ref={ controls => this.controls = controls } 
        source={{ uri: currentMessage.video }}
        controls={true}
        paused={paused}
        resizeMode={'cover'}
        style = {{
          aspectRatio: 1,
          width: "100%"
      }}
        repeat={false}
      />
 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  video: {
    paddingLeft: 30,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    backgroundColor: 'black',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

MessageVideo.defaultProps = {
  currentMessage: {
    // video: null,
  },
  containerStyle: {},
  videoStyle: {
    width: widthPercentageToDP("80%"),
    height: 250,
    // width: fullScreen == true? widthPercentageToDP("100%"):widthPercentageToDP("80%"),
    // height: fullScreen == true? widthPercentageToDP("100%"):250,

    borderRadius: 13,
    paddingBottom: 10,
    resizeMode: 'contain',
  },
  videoProps: {},
  lightboxProps: {},
};

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  videoStyle: ViewPropTypes.style,
  videoProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
