import React, {Component} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image'

class PracticeQuizScreen extends Component {
  state = {
    activeQuestion: 0,
    questions: [],
    opacity: new Animated.Value(0),
    correct: false,
    done: false,
  }

  questionsDb = firestore().collection('questions')
  unsubscribe = null
  a = null
  b = null
  c = null

  componentDidMount() {
    const {navigation} = this.props
    const {level} = navigation.state.params
    const actions = level.questions.map(questionRef => {
      return new Promise((resolve, reject) => {
        console.log(this.questionsDb)
        this.questionsDb
          .doc(questionRef.id)
          .get()
          .then(querySnapshot => {
            const question = querySnapshot.data()
            resolve(question)
          })
      })
    })
    Promise.all(actions).then(questions => {
      this.setState({questions})
    })
  }

  onCollectionUpdate = querySnapshot => {
    console.log(querySnapshot)
  }

  componentWillUnmount() {}

  clearRefs = () => {
    this.a = null
    this.b = null
    this.c = null
  }

  correctAnswer = () => {
    this.setState({correct: true})
    this.clearRefs()
    setTimeout(this.nextQuestion, 500)
  }

  nextQuestion = () => {
    const {questions} = this.state
    let {activeQuestion} = this.state
    activeQuestion++
    if (activeQuestion++ < questions.length) {
      this.setState({correct: false, activeQuestion: activeQuestion++})
    } else {
      this.displayDone()
    }
  }

  displayDone = () => {
    this.setState({done: true})
  }

  renderQuestion = question => {
    const {questions, correct} = this.state
    const questionNumber = questions.indexOf(question) + 1
    if (correct) {
      return (
        <View style={styles.container}>
          <Text style={styles.correctAnswerText}>Nice one!</Text>
        </View>
      )
    }
    return (
      <View key={questionNumber}>
        <View style={styles.headerContainer}>
          <Text style={styles.questionNumberText}>
            Question {questionNumber}
          </Text>
        </View>
        <View style={styles.questionContainer}>
          {question.imageUrl && (
            <FastImage
              source={{
                uri: question.imageUrl,
              }}
              style={styles.questionImage}
              resizeMode="contain"
            />
          )}
          <Text style={styles.question}>{question.question}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {Object.keys(question.options)
            .reverse()
            .map(option => (
              <TouchableOpacity
                key={question.options[option].value}
                onPress={() => {
                  if (option === question.correctOption) {
                    this[option].setNativeProps({backgroundColor: 'green'})
                    setTimeout(this.correctAnswer, 500)
                  } else {
                    this[option].setNativeProps({backgroundColor: 'red'})
                  }
                }}
                ref={component => (this[option] = component)}
                style={styles.optionBtn}>
                <Text
                  style={
                    styles.optionBtnText
                  }>{`${question.options[option].value}`}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    )
  }

  render() {
    const {questions, activeQuestion, done} = this.state

    if (done) {
      return (
        <SafeAreaView style={styles.container}>
          <Text>DONE!</Text>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.optionBtnText}>back to home</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={styles.container}>
        {questions.length > 0
          ? this.renderQuestion(questions[activeQuestion])
          : null}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  questionImage: {
    height: 200,
    width: 200,
    marginBottom: 8,
  },
  optionBtn: {
    width: 300,
    height: 60,
    backgroundColor: 'rebeccapurple',
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  optionBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  questionNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  headerContainer: {
    flex: 1,
  },
  questionContainer: {
    flex: 2,
    alignItems: 'center',
  },
  optionsContainer: {
    flex: 3,
  },
  correctAnswerText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 28,
  },
})

export default PracticeQuizScreen
