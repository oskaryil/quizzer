import React, {Component} from 'react'

import messaging from '@react-native-firebase/messaging'
import permissions from 'react-native-permissions'
import axios from 'axios'

import AppNavigator from './navigation'
import config from './config'

const API_BASE_URL = config.API_BASE_URL

class App extends Component {
  async componentDidMount() {
    const {status} = await permissions.checkNotifications()
    if (status === 'denied') {
      await permissions.requestNotifications(['sound', 'badge'])
    }
    await this.getToken()
  }
  async getToken() {
    const token = await messaging().getToken()
    await axios.post(`${API_BASE_URL}/push/token`, {token})
  }
  render() {
    return <AppNavigator />
  }
}

export default App
