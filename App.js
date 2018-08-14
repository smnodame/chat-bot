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

import TextInputQuestion from './component/TextInputQuestion'
import ButtonQuestion from './component/ButtonQuestion'
import CalendarQuestion from './component/CalendarQuestion'
import CheckboxQuestion from './component/CheckboxQuestion'
import MultiInputQuestion from './component/MultiInputQuestion'
import { CircleCardQuestion, CircleCardAction } from './component/CircleCardQuestion'
import { ProductCardQuestion, ProductCardAction } from './component/ProductCardQuestion'
import { OptionFeatureQuestion, OptionFeatureAction }  from './component/OptionFeatureQuestion'

console.disableYellowBox = true

const config = {
  start_id: '16',
  bot: {
    name: 'Clave Host',
    _id: 2
  },
  steps: [
    {
      id: '1',
      question: 'What number I am thinking?',
      trigger: '15',
      system: true,
      message: `It's around {amount}, so you have to pay {price} bath per month.`,
      input: {
        mode: 'PRODUCT-CARD',
        title: 'Coverage amounts',
        card: {
          image: require('./images/hamberger.svg'),
          title: 'Crabstick Cocktail',
          description: 'Parsley sausage, Crab stick, Mozzarella Cheese. With the choices of crust between Pan and Crispy Thin available.',
          min: 1000,
          max: 10000,
          currency: '$',
          default_number: 2000,
          increase_number: 1000,
          key: 'amount',
        },
        button: {
          operation: 'ADD',
          default_number: 0.75,
          increase_number: 0.75,
          per: 'MO',
          key: 'price',
        }
      }
    },
    {
      id: '2',
      message: 'Awesome! You are a telepath!',
      trigger: '3',
      image: 'http://smnodame.com/public/profile.jpg',
    },
    {
      id: '3',
      message: 'Nice place!',
      location: {
        latitude: 48.864601,
        longitude: 2.398704
      },
      trigger: '4'
    },
    {
      id: '4',
      trigger: '5',
      message: 'your number is {number}',
      input: {
        mode: 'INPUT',
        textinput: {
          type: 'number',
          min: 0,
          max: 100,
          placeholder: 'ADD SOME WORD ...',
          keyboardType: 'number-pad',
          key: 'number',
        },
      }
    },
    {
      id: '5',
      message: 'What number I am thinking?',
      trigger: '6',
    },
    {
      id: '6',
      message: 'I am {answer}',
      input: {
        mode: 'INPUT',
        textinput: {
          placeholder: 'เพิ่มคำตอบ',
          key: 'answer',
        },
      },
      trigger: '7',
    },
    {
      id: '7',
      message: 'I AM OK?',
      trigger: '8',
    },
    {
      id: '8',
      input: {
        mode: 'BUTTON',
        layout: 'vertical',
        options: [{
          label: 'CHIANG MAI',
          value: 'I AM IN CHIANG MAI',
          trigger: '9',
        }, {
          label: 'BANGKOK',
          value: 'I AM IN BANGKOK',
          trigger: '10',
        }, {
          label: 'KORAT',
          value: 'I AM IN KORAT',
          trigger: '11',
        }]
      }
    },
    {
      id: '9',
      message: 'the date is {date}',
      input: {
        mode: 'CALENDAR',
        calendar: {
          mode: 'datetime',
          key: 'date',
        },
        button: {
          text: 'CHOOSE'
        }
      },
      trigger: '12'
    },
    {
      id: '10',
      message: 'you choose BANGKOK',
      trigger: '13'
    },
    {
      id: '11',
      message: 'you choose Korat',
      trigger: '14'
    },
    {
      id: '12',
      message: 'Thank you for you info!'
    },
    {
      id: '13',
      input: {
        min: 1,
        max: 2,
        message_func: (chosen) => {
          return chosen.reduce((o, n, index) => {
              return `${o} ${index + 1}. ${n.value}\n`
            }, '')
        },
        mode: 'CHECKBOX',
        options: [{
          label: 'CM',
          value: 'CHIANG MAI',
          key: 'CM',
        }, {
          label: 'BKK',
          value: 'BANGKOK',
          key: 'BKK',
        }, {
          label: 'KR',
          value: 'KORAT',
          key: 'KR',
        }],
        button: {
          text: 'CHOOSE'
        },
      },
      trigger: '12',
    },
    {
      id: '14',
      message: 'Your text is {TEXT} and number is {NUMBER}',
      input: {
        mode: 'MULTI-INPUT',
        title: 'Taylor Swift',
        description: 'Taylor Alison Swift is an American singer-songwriter.',
        inputs: [{
          placeholder: 'THIS IS TEXT',
          key: 'TEXT',
        }, {
          placeholder: 'THIS IS NUMBER PAD',
          keyboardType: 'number-pad',
          key: 'NUMBER',
        }],
        button: {
          text: 'TAKE IT'
        }
      },
      trigger: '12',
    },
    {
      id: '15',
      question: 'choose you option!',
      message: 'You have to pay more {total}',
      input: {
        mode: 'OPTION-FEATURE',
        title: 'Add Others To Your Policy',
        message_func: (chosen) => {
          return `We enabled ${chosen.length} items.`
        },
        options: [{
          title: 'Icon Button',
          description: 'The Icon Buttons, can take text and/or icon as child elements inside the Button.',
          price: 0,
          per: 'MO',
          checked: false,
          currency: '$',
          key: 'icon_button',
          popup: {
            title: 'Taylor Swift',
            description: 'Taylor Alison Swift is an American singer-songwriter.',
            inputs: [{
              placeholder: 'THIS IS TEXT',
              key: 'TEXT',
              require: true,
            }, {
              placeholder: 'THIS IS NUMBER PAD',
              keyboardType: 'number-pad',
              key: 'NUMBER',
              require: false,
            }],
            button: {
              text: 'TAKE IT'
            },
          },
        }, {
          title: 'Button Size',
          description: 'Include the following props with your Button',
          price: 52,
          per: 'MI',
          checked: false,
          currency: '฿',
          key: 'button_size',
        }, {
          title: 'Disabled Button',
          description: 'A disabled button is unusable and un-clickable.',
          price: 20,
          per: 'S',
          checked: true,
          currency: '$',
          key: 'disabled_button',
        }],
        button: {
          operation: 'ADD',
          default_number: 0,
          per: 'MO',
          key: 'total',
        }
      },
      system: true,
      trigger: '2',
    },
    {
      id: '16',
      question: 'choose you option!',
      input: {
        mode: 'CIRCLE-CARD',
        title: 'Add Extra Coverage',
        description: 'Parsley sausage, Crab stick, Mozzarella Cheese. With the choices of crust between Pan and Crispy Thin available.',
        options: [
            {
                key: 1,
                image: require('./images/gallery.svg'),
                name: 'GALLERY',
                price: 1000,
                currency: '$',
                selected: true,
                popup: {
                  image: require('./images/gallery.svg'),
                  title: 'GALLERY',
                  description: 'Gallery may refer to: Contents.',
                  min: 1000,
                  max: 10000,
                  currency: '$',
                  default_number: 2000,
                  increase_number: 1000,
                  button: {
                    operation: 'ADD',
                    default_number: 0.75,
                    increase_number: 0.75,
                    per: 'MO',
                    key: 'price',
                  },
                },
            },
            {
                key: 2,
                image: require('./images/calendar.svg'),
                name: 'CALENDAR',
                price: 200,
                currency: '$',
                selected: false,
            },
            {
                key: 2,
                image: require('./images/video.svg'),
                name: 'VIDEO',
                price: 500,
                currency: '฿',
                selected: false,
            }
        ]
      },
      system: true,
    },
  ]
}

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
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
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
          mode == 'CIRCLE-CARD' && <CircleCardQuestion question={this.state.current_question} />
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
