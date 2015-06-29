'use strict';

var APP_ID = 'GyG9txPqLE0m2o1NAy1Bt0tN9QEFAbT8XrLKxGjh';
var API_KEY = 'ac9u5nlSqC79mYmLyQcyloapTpdxzY7WPtvd0us3';
var API_URL = 'https://api.parse.com/1/classes/Notification';

var React = require('react-native');
// var Parse = require('parse').Parse;
// var ParseReact = require('parse-react');

var DetailScreen = require('./DetailScreen');

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

  loadRemoteData: function() {
      console.log("fetching data");
      // http://stackoverflow.com/questions/30415510/react-native-cant-access-parse-data
      fetch(API_URL, {
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-REST-API-Key": API_KEY
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("fetch data response: " + responseData.results)
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

  componentDidMount: function() {
      this.loadRemoteData();
  },

  render: function() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        style={styles.ListView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  },

  renderRow: function(notif) {
    return (
      <TouchableHighlight
        style={styles.cell}
        onPress={() => this.showNotif(notif)}
        >
        <View >
            <Text style={styles.title}>{notif.title}</Text>
            <Text style={styles.body}>{notif.body}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  showNotif: function(notif) {
    this.props.navigator.push({
      title: notif.title,
      component: DetailScreen,
      passProps: {link: notif.link}
    });
  },

  renderLoadingView: function() {
    console.log("loading view");
    return (
      <ActivityIndicatorIOS
        style={[styles.centering, {height: 80}]}
      />
    );
  },



});

var styles = StyleSheet.create({
  listView: {
  },
  cell: {
    flex: 1,
    padding: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderColor: 'rgba(0,0,0,0)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
});

module.exports = NotifList;
