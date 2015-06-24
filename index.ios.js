/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var PushManager = require('./RemotePushIOS');
var registerInstallation = require('./Installation');

var React = require('react-native');
var {
  AlertIOS,
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AppRegistry,
} = React;

var myMeal = React.createClass({
  render: function() {
    return (
        <LaunchScreen />
    )
  }
});

class LaunchScreen extends React.Component {
  componentDidMount() {
    PushManager.requestPermissions(function(err, data) {
        if (err) {
            console.log("Could not register for push");
        } else {
            console.log(data.token)
            registerInstallation({
                "deviceType": "ios",
                "deviceToken": data.token,
                "channels": ["global"]
            });
         }
    });

    PushManager.setListenerForNotifications(this.receiveRemoteNotification);
  }

  receiveRemoteNotification(notification) {
     // Your code to run when the alert fires
     AlertIOS.alert(
         'Notification received',
         notification.aps.alert,
         [
             {text: 'OK', onPress: () => console.log('Ok pressed!')}
         ]
     );

 }

  render() {
      return (
          <View style={styles.container}>
            <Text>Intentionally Blank</Text>
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
