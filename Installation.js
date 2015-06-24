/**
* registers an installation
* data should look like the following:
* {
*  "deviceType": "ios", // or "android"
*  // if android is targeted set
*  // "pushType": "gcm",
*  // "GCMSenderId": "56712320625545", // whatever the later means
*  "deviceToken": "29e32a686fd09d053e1616cb48",
*  "channels": [
*       ""
*   ]
* };
* for more information visit:
* https://www.parse.com/docs/rest#installations-uploading
*/

var PARSE_APP_ID = 'GyG9txPqLE0m2o1NAy1Bt0tN9QEFAbT8XrLKxGjh'
var PARSE_REST_KEY = 'ac9u5nlSqC79mYmLyQcyloapTpdxzY7WPtvd0us3'

var registerInstallation = function(data) {
    var url = "https://api.parse.com";
    url += "/1/installations";
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'X-Parse-Application-Id': PARSE_APP_ID,
            'X-Parse-REST-API-Key': PARSE_REST_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    //.then(processStatus)
    //.then(parseJson)
    //.catch(error);
};

module.exports = registerInstallation;
