/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src'
import {name as appName} from './app.json'

console.ignoredYellowBox = ['Warning: `-[RCTRootView cancelTouches]`']


AppRegistry.registerComponent(appName, () => App)
