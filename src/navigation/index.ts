import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import HomeScreen from '../screens/home'
import PracticePickLevelScreen from '../screens/practice-level-picker'
import PracticeQuizScreen from '../screens/practice-quiz'

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  PracticePickLevel: {
    screen: PracticePickLevelScreen,
    navigationOptions: {
      header: null,
    },
  },
  PracticeQuiz: {
    screen: PracticeQuizScreen,
    navigationOptions: {
      header: null,
    },
  },
})

export default createAppContainer(MainStack)
