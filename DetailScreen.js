'use strict';

var WEBVIEW_REF = 'webview';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  WebView,
} = React;


class DetailScreen extends React.Component {
    render() {
        return (
            <View
              style={styles.webViewContainer}
              navigator={this.props.navigator}
              >
              <WebView
                ref={WEBVIEW_REF}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                url={this.props.link}
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState={true}
              />
            </View>
        )
    }
}

var styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    paddingTop: 64,
  },
  webView: {
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = DetailScreen;
