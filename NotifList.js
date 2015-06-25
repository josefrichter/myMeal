'use strict';

var APP_ID = 'GyG9txPqLE0m2o1NAy1Bt0tN9QEFAbT8XrLKxGjh';
var API_KEY = 'ac9u5nlSqC79mYmLyQcyloapTpdxzY7WPtvd0us3';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ListView,
  ActivityIndicatorIOS,
} = React;

var NotifList = React.createClass({

  // mixins: [ParseReact.Mixin],

  // observe: function() {
  //   // Subscribe to all Notification objects, ordered by creation date
  //   // The results will be available at this.data.notifications
  //   console.log("observe fired");
  //   return {
  //     notifications: (new Parse.Query('Notification')).ascending('createdAt')
  //   };
  // },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    fetch("https://api.parse.com/1/classes/Notification", {
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
        })
      })
      .catch(function(error) {
        console.log(error)
      })
     .done();
  },

  render: function() {
    console.log("render");
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  },

  renderRow: function(notif) {
    console.log(notif);
    return (
      <TouchableHighlight onPress={() => this.showNotif(notif)}>
        <View style={styles.cellContainer}>
            <Text style={styles.title}>{notif.title}</Text>
            <Text style={styles.body}>{notif.body}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  showNotif: function(notif) {
    this.props.navigator.push({
      title: notif.title,
      component: SubScreen,
      passProps: {link: notif.link}
    });
  },

  renderLoadingView: function() {
    console.log("loading");
    return (
      <ActivityIndicatorIOS
        style={[styles.centering, {height: 80}]}
      />
    );
  },



});

var styles = StyleSheet.create({
  cellContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
});

module.exports = NotifList;
