/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('CallLogBackgroundTask', () => {
  return async () => {
    try {
      const {syncCallLogBackground} = require('./src/utils/callLogSync');
      await syncCallLogBackground();
    } catch (error) {
      console.error('Background task error:', error);
    }
  };
});