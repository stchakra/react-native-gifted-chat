/* eslint-disable no-use-before-define */
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, ViewPropTypes, Platform, Button, Text } from 'react-native';
// import Video from 'react-native-video';
import Video from 'react-native-video-controls';
import Lightbox from 'react-native-lightbox';
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";




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
         paused={true}
        source={{ uri: currentMessage.video }}
        // style={videoStyle}
        style = {{
          aspectRatio: 1,
          width: "99%",
          marginRight: -31,
          // width: "98%",
          // marginRight: -25,
      }}
      disableFullscreen={true}
      disableBack={true}
      resizeMode="contain" 

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
    width: "100%",
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
