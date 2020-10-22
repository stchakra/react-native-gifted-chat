import React from "react";
import { StyleSheet, Text, View, ViewPropTypes, Linking } from "react-native";
import PropTypes from "prop-types";
import ParsedText from 'react-native-parsed-text';
import Communications from 'react-native-communications';

const WWW_URL_PATTERN = /^www\./i;

export default class SystemMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onUrlPress = this.onUrlPress.bind(this);
    this.onPhonePress = this.onPhonePress.bind(this);
    this.onEmailPress = this.onEmailPress.bind(this);
  }
  onUrlPress(url) {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      this.onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          // eslint-disable-next-line
          console.error('No handler for URL:', url);
        } else {
          Linking.openURL(url);
        }
      });
    }
  }

  onPhonePress(phone) {
    const options = ['Call', 'Text', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
          default:
            break;
        }
      },
    );
  }

  onEmailPress(email) {
    Communications.email([email], null, null, null, null);
  }

  render() {
    const { currentMessage } = this.props;
     //console.log('IN MY SM ', this.props)
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <ParsedText
            style={[styles.text, this.props.textStyle]}
            parse={[
              ...this.props.parsePatterns(this.props.textStyle),
            { type: 'url', style: this.props.textStyle, onPress: this.onUrlPress },
            { type: 'phone', style: this.props.textStyle, onPress: this.onPhonePress },
            { type: 'email', style: this.props.textStyle, onPress: this.onEmailPress },

            ]}
          >
            {currentMessage.text}
          </ParsedText>
        </View>
      </View>
    );
  }
}

SystemMessage.contextTypes = {
  actionSheet: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: "transparent",
    color: "red",
    paddingLeft:10,
    fontSize: 15,
    fontWeight: "300"
  } 
});

SystemMessage.defaultProps = {
  currentMessage: {
    system: false,
  },
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  parsePatterns: () => [],
};

SystemMessage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
