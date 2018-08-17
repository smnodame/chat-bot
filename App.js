import _ from 'lodash'
import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  DatePickerIOS,
} from 'react-native'
import {GiftedChat, Actions, Bubble, SystemMessage, InputToolBar, Send, } from 'react-native-gifted-chat'
import CustomActions from './screens/CustomActions'
import CustomView from './screens/CustomView'
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Body, CheckBox, Button, Item, Input, Card, CardItem, } from 'native-base'
import Modal from 'react-native-modal'
import SvgUri from 'react-native-svg-uri'
import { Bubbles } from 'react-native-loader'

import TextInputQuestion from './component/TextInputQuestion'
import ButtonQuestion from './component/ButtonQuestion'
import CalendarQuestion from './component/CalendarQuestion'
import CheckboxQuestion from './component/CheckboxQuestion'
import MultiInputQuestion from './component/MultiInputQuestion'
import { CircleCardQuestion, CircleCardAction } from './component/CircleCardQuestion'
import { ProductCardQuestion, ProductCardAction } from './component/ProductCardQuestion'
import { OptionFeatureQuestion, OptionFeatureAction }  from './component/OptionFeatureQuestion'

console.disableYellowBox = true

import { config } from './config'

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      typingText: null,
      current_question: null
    }

    this.onSend = this.onSend.bind(this)
    this.onReceive = this.onReceive.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
    this.renderSystemMessage = this.renderSystemMessage.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    
    this._isAlright = null
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.runMessage(config.start_id || '1')
  }

  runMessage = (id) => {
    this.setState(previousState => ({
      typingText: `${config.bot.name} is typing ...`,
    }))

    setTimeout(() => {
      const question = config.steps.find((question) => question.id == id)
      
      this.setState(previousState => ({
        current_question: question,
      }))

      this.setState((previousState) => {
        return {
          typingText: null,
        }
      })


      if(question.hasOwnProperty('input') && !question.system) {
        return
      }

      this.onReceive({
        text: question.system? question.question : question.message,
        location: question.location || null,
        image: question.image || null,
        system: question.system || false,
        question
      })

      if(question.hasOwnProperty('trigger') && !question.system) {
        this.runMessage(question.trigger)
      }
    }, 1000)
  }

  onSend(data, trigger) {
    const messages = [
      {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          ...data
      }
    ]
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
        text: null
      }
    })

    
    if(trigger) {
      this.runMessage(trigger)
    }
  }

  botAnswer(messages) {
    this.setState((previousState) => {
      return {
        typingText: `${config.bot.name} is typing ...`
      }
    })

    setTimeout(() => {
      this.onReceive({
        text: 'Alright!'
      })

      this.setState((previousState) => {
        return {
          typingText: null,
        }
      })
    }, 1000)
  }

  onReceive(data) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          user: config.bot,
          ...data
        }),
      }
    })
  }

  renderBubble(props) {
    return (
      <View>
        <Bubbles size={3} color="#999" />
      </View>
    )
  }

  renderSystemMessage = (props) => {
    const state_id = _.get(this.state, 'current_question.id', null)
    const props_id = _.get(props, 'currentMessage.question.id', null)
    const mode = _.get(props, 'currentMessage.question.input.mode', null)
    return (
      <View>
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
        {
          mode == 'PRODUCT-CARD' && <ProductCardQuestion question={props.currentMessage.question} />
        }
        {
          mode == 'OPTION-FEATURE' && <OptionFeatureQuestion question={props.currentMessage.question} />
        }
        {
          mode == 'CIRCLE-CARD' && <CircleCardQuestion question={props.currentMessage.question} />
        }
        {
          state_id.toString() != props_id.toString() && <View style={{ height: 15, }} />
        }
      </View>
    )
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    )
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      )
    }
    return null
  }

  renderInputToolbar = (props) => {
   return null
  }

  renderChatFooter = () => {
    const input = _.get(this.state, 'current_question.input', null)
    const mode = _.get(this.state, 'current_question.input.mode', null)
    if(mode == "INPUT") {
      return (
        <TextInputQuestion onSend={this.onSend} question={this.state.current_question}/>
      )
    } else if(mode == 'BUTTON') {
      return (
        <ButtonQuestion onSend={this.onSend} question={this.state.current_question} />
      )
    } else if(mode == 'CALENDAR') {
      return (
        <CalendarQuestion onSend={this.onSend} question={this.state.current_question} />
      )
    } else if(mode == 'CHECKBOX') {
      return (
        <CheckboxQuestion onSend={this.onSend} question={this.state.current_question} />
      )
    } else if(mode == 'MULTI-INPUT') {
      return (
        <MultiInputQuestion onSend={this.onSend} question={this.state.current_question} />
      )
    } else if(mode == 'PRODUCT-CARD') {
      return (
        <ProductCardAction onSend={this.onSend} question={this.state.current_question} />
      )
    } else if(mode == 'OPTION-FEATURE') {
      return (
        <OptionFeatureAction onSend={this.onSend} question={this.state.current_question} />
      )
    } else if(mode == 'CIRCLE-CARD') {
      return (
        <CircleCardAction onSend={this.onSend} question={this.state.current_question} />
      )
    } else {
      return <View style={{ height: 15 }} />
    }
  }

  renderContainerFooter = () => {
    return (
      <View  style={{ maxHeight: '50%' }}>
        { this.renderChatFooter() }
      </View>
    )
  }

  render() {
    return (
      <Container>
        
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          renderChatFooter={this.renderContainerFooter}
          renderInputToolbar={this.renderInputToolbar}
          minInputToolbarHeight={0}
          alwaysShowSend={true}

          user={{
            _id: 1,
          }}

          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          renderFooter={this.renderFooter}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  textInput: {
    height: 45,
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingLeft: 10, 
    paddingRight: 10,
    marginLeft: 5, 
    marginRight: 5, 
    marginBottom: 5, 
    backgroundColor: 'white', 
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 8,
    backgroundColor: '#f2f2f2'
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: 30, color: '#4B4B4B',
  },
})
