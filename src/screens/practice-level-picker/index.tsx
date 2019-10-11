import React, {Component} from 'react'
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'

class PracticePickLevelScreen extends Component {
  state = {
    levels: [],
    loading: true,
  }

  async componentDidMount() {
    console.log('hello')
    try {
      const querySnapshot = await firestore()
        .collection('levels')
        .get()
      console.log(querySnapshot)
      const levels = []
      querySnapshot.forEach(doc => {
        const level = doc.data()
        levels.push(level)
      })
      this.setState({levels: levels.reverse(), loading: false})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {navigation} = this.props
    const {levels, loading} = this.state
    if (loading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          {/* <HeaderBackButton onPress={() => navigation.goBack()} /> */}
          <Text style={styles.headerTitle}>Pick a level.</Text>
          <ActivityIndicator size="small" />
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        {/* <HeaderBackButton onPress={() => navigation.goBack()} /> */}
        <Text style={styles.headerTitle}>Pick a level.</Text>
        <FlatList
          data={levels}
          renderItem={({item: level}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PracticeQuiz', {level: level})
              }
              style={styles.levelBtn}>
              <Text style={styles.levelBtnText}>Level {level.id}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <Button onPress={() => navigation.goBack()} title="Go back" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  levelBtn: {
    alignSelf: 'center',
    backgroundColor: '#663399',
    width: 340,
    height: 56,
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 4,
  },
  levelBtnText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 18,
    marginBottom: 12,
  },
})

export default PracticePickLevelScreen
