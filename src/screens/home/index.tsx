/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native'

import studyingImage from '../../assets/studying.png'

const name = 'Oskar'

type Props = {}
export default class HomeScreen extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {marginTop: 12}]}>
            Welcome {name}.
          </Text>
          <Text style={styles.headerText}>Let's learn!</Text>
        </View>
        <View style={styles.headerImageContainer}>
          <Image source={studyingImage} style={styles.headerImage} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PracticePickLevel')}
            style={styles.practiceBtn}>
            <Text style={styles.btnText}>Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.testBtn}>
            <Text style={styles.btnText}>Test</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const buttonBaseStyles = {
  width: 300,
  height: 52,
  justifyContent: 'center',
  borderRadius: 10,
  marginVertical: 8,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 24,
  },
  practiceBtn: {
    ...buttonBaseStyles,
    backgroundColor: '#663399',
  },
  testBtn: {
    ...buttonBaseStyles,
    backgroundColor: '#228B22',
  },
  btnText: {
    color: '#FFF',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  btnContainer: {
    flex: 2,
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerImage: {
    height: 150,
    width: 300,
    alignSelf: 'center',
  },
  headerImageContainer: {
    flex: 2,
    justifyContent: 'center',
  },
})
