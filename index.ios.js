/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var PushManager = require('./RemotePushIOS');
var registerInstallation = require('./Installation');
var NotifList = require('./NotifList');
var DetailScreen = require('./DetailScreen');
var WEBVIEW_REF = 'webview';
var HOME_CONTENT_URL = 'http://www.mymeal.cz/';

var React = require('react-native');
var {
  AlertIOS,
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AppRegistry,
  NavigatorIOS,
  WebView,
} = React;

var myMeal = React.createClass({
  render: function() {
    return (
        <LaunchScreen />
    )
  }
});

class HomeScreen extends React.Component {
    // showDetail() {
    //   this.props.navigator.push({
    //     title: "Detail Screen",
    //     component: DetailScreen,
    //     passProps: { link: 'https://www.theguardian.com/football'}
    //   });
    // }

    render() {
      // http://stackoverflow.com/questions/30079640/undefined-is-not-an-object-evaluating-this-props-navigator-push
      return (
          <View
            navigator={this.props.navigator}
            style={styles.container}
            >
            <NotifList navigator={this.props.navigator} />
          </View>
      )
    }
}

class Button extends React.Component {

  render() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }

}

var subScreenRoute = {}

class LaunchScreen extends React.Component {

  componentDidMount() {
    PushManager.requestPermissions(function(err, data) {
        if (err) {
            console.log("Could not register for push");
        } else {
            // console.log(data.token)
            registerInstallation({
                "deviceType": "ios",
                "deviceToken": data.token,
                "channels": ["global"]
            });
         }
    });

    PushManager.setListenerForNotifications(this.receiveRemoteNotification.bind(this));
  }

  onPressFollow() {
    // http://stackoverflow.com/questions/29387577/getting-access-to-this-props-navigator-from-inside-navigatorios-onrightbuttonpre
    this.refs.nav.push(subScreenRoute);
  }

  receiveRemoteNotification(notification) {
    // Your code to run when the alert fires
    subScreenRoute = {
      component: DetailScreen,
      title: 'Detail via Notification',
      passProps: { link: notification.link }
    }

    // the sample JSON of the notifications is in samplePushNotification.json file
    // https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html
    // https://parse.com/docs/rest/guide/#push-notifications
    AlertIOS.alert(
      notification.aps.alert.title,
      notification.aps.alert.body,
      [
        {text: 'OK', onPress: () => console.log('Ok pressed!')},
        {text: 'Follow link', onPress: this.onPressFollow.bind(this)}
      ]
    );
  }

  render() {
      return (
          <NavigatorIOS
            ref="nav"
            style={styles.wrapper}
            initialRoute={{
              title: 'Home Screen',
              component: HomeScreen,
              //passProps: { myProp: 'foo' },
            }}
          />
      );
  }
}



var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});


AppRegistry.registerComponent('myMeal', () => myMeal);
