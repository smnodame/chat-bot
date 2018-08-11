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
import { ProductCardQuestion, ProductCardAction } from './component/ProductCardQuestion'

console.disableYellowBox = true

const config = {
  start_id: '1',
  bot: {
    name: 'Clave Host',
    _id: 2
  },
  steps: [
    {
      id: '1',
      question: 'What number I am thinking?',
      trigger: '2',
      system: true,
      message: `It's around {amount}, so you have to pay {price} bath per month.1`,
      input: {
        mode: 'PRODUCT-CARD',
        title: 'Coverage amounts',
        card: {
          image: require('./images/hamberger.svg'),
          title: 'Crabstick Cocktail',
          description: 'Parsley sausage, Crab stick, Mozzarella Cheese. With the choices of crust between Pan and Crispy Thin available ',
          min: 1000,
          max: 10000,
          unit: '$',
          default_number: 2000,
          increase_number: 1000,
          key: 'amount',
        },
        button: {
          operation: 'ADD',
          default_number: 0.75,
          increase_number: 0.75,
          unit: 'MO',
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
      input: {
        mode: 'CALENDAR',
        calendar: {
          mode: 'datetime'
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
    }
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

  renderSystemMessage(props) {
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
    // const mode = 7
    // if(mode == 1) {
    //   return (
    //     <List style={{ backgroundColor: "#F8F8F8", maxHeight: '40%' }}>
    //       <ScrollView>
    //       <ListItem>
    //         <CheckBox checked={false} color="green" />
    //         <Body>
    //           <Text>Simon Mignolet</Text>
    //         </Body>
    //         <Right>
    //         </Right>
    //       </ListItem>
    //       <ListItem>
    //         <CheckBox checked={false} color="green" />
    //         <Body>
    //           <Text>Nathaniel Clyne</Text>
    //         </Body>
    //         <Right>
    //         </Right>
    //       </ListItem>
    //       <ListItem>
    //         <CheckBox checked={true} color="green" />
    //         <Body>
    //           <Text>Daily Stand Up</Text>
    //         </Body>
    //         <Right>
    //         </Right>
    //       </ListItem>
    //       </ScrollView>
    //     </List>
    //   )
    // } else if(mode == 2) {
    //   return (
    //     <View style={{ flexDirection: "row" }}>
    //       <Button full light style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#F0F0F0", borderWidth: 1, }}>
    //         <Text style={{ color: "#4B4B4B", fontSize: 14, }}>{ 'Confirm'.toUpperCase() }</Text>
    //       </Button>
    //       <Button full light style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#F0F0F0", borderWidth: 1, }}>
    //         <Text style={{ color: "#4B4B4B", fontSize: 14, }}>{ 'Normal'.toUpperCase() }</Text>
    //       </Button>
    //       <Button full light style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#F0F0F0", borderWidth: 1, }}>
    //         <Text style={{ color: "#4B4B4B", fontSize: 14, }}>{ 'Cancle'.toUpperCase() }</Text>
    //       </Button>
    //     </View>
    //   )
    // } else if(mode == 3) {
    //   return (
    //     <List style={{ backgroundColor: "#F8F8F8", maxHeight: '40%' }}>
    //       <ScrollView>
    //       <ListItem>
    //         <Left>
    //           <Text>Simon Mignolet</Text>
    //         </Left>
    //         <Right>
    //         </Right>
    //       </ListItem>
    //       <ListItem>
    //         <Left>
    //           <Text>Nathaniel Clyne</Text>
    //         </Left>
    //         <Right>
    //         </Right>
    //       </ListItem>
    //       <ListItem>
    //         <Left>
    //           <Text>Daily Stand Up</Text>
    //         </Left>
    //         <Right>
    //         </Right>
    //       </ListItem>
    //       </ScrollView>
    //     </List>
    //   )
    // } else if(mode == 4) {
    //   return (
    //     <DatePicker 
    //       date={new Date()}
    //       mode={'date'}
    //       style={{ width: '100%' }}
    //       onDateChange={() => {
    //       }}
    //     />
    //   )
    // } else if(mode == 5) {
    //   return (
    //     <View style={{ backgroundColor: "#F2F2F2" }}>
    //       <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>Add Others To Your Policy</Text>
    //       <Card style={{ margin: 10 }}>
    //           <CardItem style={{ flexDirection: "row" }}>
    //             <View style={{ flex: 1, paddingRight: 10, }}>
    //               <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: "500", marginBottom: 10, }}>
    //                 Taylor Swift
    //               </Text>
    //               <Text style={{ color: "#CCC", fontSize: 12, fontWeight: "500", }}>
    //                 Taylor Alison Swift is an American singer-songwriter. One of the world's leading contemporary recording artists,
    //               </Text>
    //             </View>
    //             <View style={{ height: "100%", alignItems: 'center', }}>
    //               <Switch style={{ marginBottom: 15 }} />
    //               <Text style={{ color: "#999", fontSize: 12, fontWeight: "bold",  }} >+$1.67/MO</Text>
    //             </View>
    //           </CardItem>
    //       </Card>
    //     </View>
    //   )
    // } else if(mode == 6) {
    //   return (
    //     <View style={{ backgroundColor: "#F2F2F2" }}>
    //       <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>Coverage Amounts</Text>
    //       <Card style={{ margin: 10 }}>
    //           <CardItem style={{ flexDirection: "row" }}>
    //           <View style={{ padding: 5 }}>
    //             <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
    //               <SvgUri
    //                 width="60"
    //                 height="60"
    //                 source={require('./images/hamberger.svg')}
    //               />
    //             </View>
    //             <View>
    //               <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 16, fontWeight: 'bold' }}>
    //                 Gran Torino (2008)
    //               </Text>
    //             </View> 
                
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                 }}>

    //                 <Button transparent>
    //                     <Icon name="ios-remove-circle-outline" style={styles.icon}/>
    //                 </Button>
    //                 <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#4B4B4B', textAlign: "center", flex: 1, }}>
    //                   $ 10000
    //                 </Text>
    //                 <Button transparent
    //                 >
    //                     <Icon name="ios-add-circle-outline" style={styles.icon}/>
    //                 </Button>
    //             </View>
    //             <View style={{ marginBottom: 10 }}>
    //               <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 14 }}>
    //                 Drama .... Angelina Jolie at an event for Gran Torino (2008) Alison Eastwood at an event for Gran Torino (2008)
    //               </Text>
    //             </View> 
    //           </View>
    //           </CardItem>
    //       </Card>
    //     </View>
    //   )
    // } else {
    //   return null
    // }
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
        {/* <Modal isVisible={true}> */}
          {/* <View style={styles.modalContent}>
            <Button transparent style={{ position: 'absolute', right: 0, top: 0, }}>
              <Icon name='close' style={{ color: "#4B4B4B", fontSize: 35,  }} />
            </Button>
              <View style={{ padding: 15 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                  <SvgUri
                    width="60"
                    height="60"
                    svgXmlData={'<svg viewBox="1 -16 511.999 511" xmlns="http://www.w3.org/2000/svg"><path d="m454.183594 295.21875h-396.191406c-13.609376 0-24.644532 11.03125-24.644532 24.644531v21.585938c0 5.355469 4.34375 9.699219 9.703125 9.699219h426.078125c5.355469 0 9.699219-4.34375 9.699219-9.699219v-21.585938c0-13.613281-11.03125-24.644531-24.644531-24.644531zm0 0" fill="#912c2c"/><path d="m454.183594 295.21875h-33.195313v55.933594h48.140625c5.359375 0 9.699219-4.34375 9.699219-9.703125v-21.585938c0-13.613281-11.03125-24.644531-24.644531-24.644531zm0 0" fill="#7c1e1e"/><path d="m470.757812 265.777344c12.832032 0 23.648438 10.65625 23.660157 24.035156.011719 19.105469-21.769531 29.214844-47.070313 25.511719-23.632812-3.457031-23.929687-14.332031-47.863281-14.332031-23.929687 0-23.929687 14.332031-47.863281 14.332031-23.929688 0-23.929688-14.332031-47.859375-14.332031-23.929688 0-23.929688 14.332031-47.859375 14.332031-23.933594 0-23.929688-14.332031-47.863282-14.332031-23.929687 0-23.929687 14.332031-47.859374 14.332031-23.929688 0-23.929688-14.332031-47.863282-14.332031-23.929687 0-24.230468 10.871093-47.859375 14.332031-25.304687 3.703125-47.082031-6.40625-47.070312-25.511719.007812-13.378906 10.824219-24.035156 23.65625-24.035156zm0 0" fill="#a0e557"/><path d="m494.417969 289.8125c-.011719-13.378906-10.828125-24.035156-23.660157-24.035156h-35.910156v46.457031c3.394532 1.253906 7.402344 2.34375 12.5 3.089844 25.300782 3.703125 47.082032-6.40625 47.070313-25.511719zm0 0" fill="#93cc4a"/><path d="m484.3125 346.183594h-456.625c-11.144531 0-20.175781 9.035156-20.175781 20.175781 0 57.929687 46.960937 104.890625 104.890625 104.890625h287.195312c57.929688 0 104.890625-46.960938 104.890625-104.890625 0-11.140625-9.035156-20.175781-20.175781-20.175781zm0 0" fill="#efa335"/><path d="m484.3125 346.183594h-37.5625v40.355468c0 46.785157-37.929688 84.714844-84.714844 84.714844h37.5625c57.929688 0 104.890625-46.964844 104.890625-104.894531 0-11.140625-9.035156-20.175781-20.175781-20.175781zm0 0" fill="#fd8f31"/><path d="m454.09375 240.09375h-396.1875c-13.613281 0-24.644531-11.03125-24.644531-24.644531v-21.585938c0-5.359375 4.34375-9.703125 9.699219-9.703125h426.078124c5.355469 0 9.699219 4.34375 9.699219 9.703125v21.585938c0 13.613281-11.03125 24.644531-24.644531 24.644531zm0 0" fill="#fc4e51"/><path d="m469.039062 184.160156h-47.964843v40.992188c0 8.25-6.6875 14.941406-14.941407 14.941406h47.964844c13.609375 0 24.644532-11.03125 24.644532-24.644531v-21.585938c-.003907-5.359375-4.347657-9.703125-9.703126-9.703125zm0 0" fill="#ea3942"/><path d="m474.90625 235.410156h-437.347656c-9.917969 0-18.339844 8.117188-18.15625 18.03125.179687 9.617188 8.03125 17.355469 17.691406 17.355469h277.875c4.515625 0 8.878906 1.613281 12.308594 4.550781l39.4375 33.792969c11.519531 9.871094 28.714844 9.128906 39.347656-1.691406l30.449219-30.992188c3.554687-3.621093 8.417969-5.660156 13.492187-5.660156h24.441406c9.914063 0 18.339844-8.113281 18.152344-18.03125-.179687-9.617187-8.03125-17.355469-17.691406-17.355469zm0 0" fill="#fccf3f"/><path d="m256 8.011719c-231.359375.085937-248.488281 152.707031-248.488281 174.320312 0 11.144531 9.035156 20.175781 20.175781 20.175781h456.625c11.140625 0 20.175781-9.03125 20.175781-20.175781 0-21.613281-17.128906-174.234375-248.488281-174.320312zm0 0" fill="#efa335"/><path d="m504.484375 181.757812c0-.0625-.003906-.128906-.003906-.195312 0-.144531-.003907-.292969-.007813-.445312-.003906-.070313-.003906-.144532-.007812-.21875-.003906-.15625-.007813-.320313-.015625-.484376 0-.078124-.003907-.152343-.007813-.230468-.007812-.179688-.015625-.363282-.023437-.550782-.003907-.070312-.007813-.136718-.011719-.203124-.007812-.222657-.023438-.449219-.035156-.683594-.003906-.042969-.003906-.082032-.007813-.121094-.085937-1.460938-.226562-3.160156-.433593-5.0625 0-.003906 0-.007812 0-.007812-4.242188-38.996094-37.328126-165.464844-247.929688-165.542969-10.023438.003906-19.636719.300781-28.871094.851562 140.160156 8.398438 191.402344 77.425781 209.742188 126.488281 7.714844 20.644532-7.722656 42.621094-29.757813 42.621094h-379.425781c-8.308594 0-15.441406-5.027344-18.535156-12.203125-1.285156 7.65625-1.640625 13.460938-1.640625 16.5625 0 11.144531 9.035156 20.175781 20.175781 20.175781h456.625c11.140625 0 20.175781-9.03125 20.175781-20.175781 0-.179687 0-.375-.003906-.574219zm0 0" fill="#fd8f31"/><path d="m474.90625 235.410156h-40.058594v42.738282l1.664063-1.691407c3.554687-3.621093 8.417969-5.660156 13.492187-5.660156h24.441406c9.914063 0 18.339844-8.117187 18.152344-18.03125-.179687-9.617187-8.03125-17.355469-17.691406-17.355469zm0 0" fill="#efc03c"/><path d="m486.339844 338.753906v-18.890625c0-1.132812-.082032-2.261719-.199219-3.378906 1.863281-1.117187 3.59375-2.351563 5.164063-3.710937 6.957031-6.015626 10.628906-13.957032 10.621093-22.964844-.003906-7.707032-2.839843-15.054688-7.742187-20.730469 3.847656-4.570313 6.035156-10.390625 5.921875-16.453125-.199219-10.769531-7.296875-19.949219-16.992188-23.332031 2.011719-4.195313 3.136719-8.890625 3.136719-13.84375v-5.503907c14.367188-1 25.75-13 25.75-27.613281 0-2.113281-.445312-52.308593-39.167969-99.96875-19.679687-24.222656-45.730469-43.40625-77.4375-57.019531-38.351562-16.464844-85.25-24.824219-139.398437-24.84375-68.199219.023438-124.515625 13.210938-167.386719 39.1875-3.550781 2.152344-4.683594 6.769531-2.535156 10.316406 2.152343 3.546875 6.769531 4.683594 10.316406 2.53125 40.496094-24.535156 94.195313-36.988281 159.605469-37.011718 52.097656.019531 97 7.964843 133.472656 23.625 29.449219 12.644531 53.574219 30.371093 71.703125 52.6875 35.398437 43.566406 35.804687 88.601562 35.804687 90.496093 0 6.984375-5.679687 12.664063-12.664062 12.664063h-456.625c-6.984375 0-12.664062-5.679688-12.664062-12.664063 0-1.886719.246093-19.125 8.835937-42.816406 9.394531-25.921875 24.679687-48.464844 45.421875-67 3.09375-2.765625 3.363281-7.515625.597656-10.605469-2.765625-3.09375-7.511718-3.359375-10.605468-.597656-58.597657 52.367188-59.273438 118.242188-59.273438 121.019531 0 14.613281 11.382812 26.613281 25.746094 27.613281v5.503907c0 4.996093 1.148437 9.730469 3.191406 13.953125-3.675781 1.3125-7.0625 3.445312-9.835938 6.269531-4.773437 4.863281-7.332031 11.226563-7.207031 17.910156.105469 5.792969 2.179688 11.210938 5.71875 15.507813-4.898437 5.675781-7.730469 13.023437-7.734375 20.71875-.007812 9.007812 3.664063 16.949218 10.621094 22.964844 1.667969 1.441406 3.519531 2.742187 5.511719 3.910156-.105469 1.054687-.175781 2.113281-.175781 3.179687v18.875c-14.40625.960938-25.835938 12.976563-25.835938 27.621094 0 61.980469 50.425781 112.402344 112.402344 112.402344h287.195312c61.976563 0 112.402344-50.421875 112.402344-112.402344 0-14.582031-11.335938-26.5625-25.660156-27.605469zm-4.859375-37.34375c-6.90625 5.972656-19.566407 8.457032-33.046875 6.484375-9.542969-1.398437-14.566406-4.054687-19.882813-6.871093-1.222656-.644532-2.457031-1.300782-3.746093-1.9375l17.0625-17.367188c2.128906-2.167969 5.09375-3.410156 8.136718-3.410156h24.4375c2.335938 0 4.632813-.316406 6.867188-.945313 3.507812 3.117188 5.59375 7.65625 5.597656 12.457031 0 4.574219-1.824219 8.476563-5.425781 11.589844zm-440.710938-91.386718h430.460938v5.425781c0 5.832031-2.933594 10.988281-7.398438 14.082031-.125.089844-.253906.171875-.382812.253906-.320313.210938-.648438.410156-.980469.597656-.117188.066407-.230469.132813-.34375.195313-.425781.226563-.859375.4375-1.304688.628906-.027343.011719-.050781.023438-.074218.035157-.496094.207031-1.003906.394531-1.523438.554687-.058594.019531-.117187.035156-.175781.050781-.433594.132813-.875.246094-1.324219.339844-.140625.03125-.277344.058594-.417968.085938-.386719.070312-.777344.132812-1.171876.179687-.148437.015625-.292968.035156-.441406.050781-.527344.050782-1.058594.082032-1.597656.082032h-396.191406c-9.445313 0-17.132813-7.6875-17.132813-17.132813zm-10.945312 36.171874c2.042969-2.078124 4.859375-3.273437 7.734375-3.273437h3.648437c4.871094 2.96875 10.585938 4.683594 16.699219 4.683594h396.1875c.667969 0 1.328125-.027344 1.984375-.066407.210937-.011718.417969-.03125.625-.046874.460937-.039063.921875-.085938 1.378906-.144532.222657-.027344.449219-.050781.671875-.082031.585938-.085937 1.167969-.183594 1.742188-.300781.242187-.050782.480468-.109375.722656-.164063.394531-.089843.789062-.183593 1.179688-.289062.296874-.078125.59375-.164063.886718-.25.316406-.09375.628906-.199219.941406-.300781.300782-.097657.597657-.195313.894532-.300782.511718-.191406 1.019531-.390625 1.519531-.601562.300781-.128906.597656-.269532.894531-.40625.28125-.128906.558594-.261719.832032-.398438.292968-.148437.585937-.292968.875-.449218.328124-.175782.652343-.363282.976562-.550782.195312-.113281.394531-.214844.589844-.332031h4.097656c5.511719 0 10.078125 4.480469 10.179688 9.984375.074218 3.835938-2.269532 7.480469-5.964844 9.277344 0 0 0 0-.003906 0-1.503907.730468-3.078126 1.105468-4.675782 1.105468h-24.441406c-7.042969 0-13.914062 2.878907-18.851562 7.90625l-30.449219 30.992188c-7.257813 7.390625-18.765625 8.390625-27.167969 2.707031-.183594-.125-.363281-.25-.542969-.378906-.46875-.335937-.933593-.6875-1.382812-1.070313 0-.003906-.003907-.007812-.007813-.007812l-39.4375-33.792969c-4.785156-4.097656-10.890625-6.355469-17.191406-6.355469h-277.875c-1.546875 0-3.046875-.355468-4.464844-1.050781h-.003906c-3.453125-1.695312-5.640625-5.121093-5.710938-8.9375-.050781-2.617187.984376-5.140625 2.910157-7.105469zm-4.921875 43.621094c0-4.769531 2.066406-9.285156 5.542968-12.402344 2.15625.59375 4.378907.894532 6.648438.894532h277.875c2.722656 0 5.355469.976562 7.421875 2.742187l31.1875 26.726563c-.625.023437-1.277344.035156-1.953125.035156-9.886719 0-14.382812-2.691406-20.070312-6.097656-6.445313-3.859375-13.75-8.234375-27.792969-8.234375-14.039063 0-21.34375 4.375-27.789063 8.234375-5.6875 3.40625-10.179687 6.097656-20.070312 6.097656s-14.382813-2.691406-20.070313-6.097656c-6.445312-3.859375-13.75-8.234375-27.789062-8.234375-14.042969 0-21.347657 4.375-27.792969 8.234375-5.6875 3.40625-10.179688 6.097656-20.070312 6.097656-9.890626 0-14.382813-2.691406-20.070313-6.097656-6.445313-3.859375-13.75-8.234375-27.792969-8.234375-14.835937 0-22.074218 3.835937-29.074218 7.542969-5.3125 2.8125-10.332032 5.472656-19.875 6.867187-13.480469 1.972656-26.140626-.511719-33.042969-6.480469-3.601563-3.113281-5.425781-7.015625-5.421875-11.59375zm374.695312 173.925782h-287.195312c-53.695313 0-97.378906-43.6875-97.378906-97.382813 0-6.984375 5.679687-12.664063 12.664062-12.664063h336.730469c4.148437 0 7.511719-3.363281 7.511719-7.511718 0-4.148438-3.363282-7.511719-7.511719-7.511719h-323.558594v-16.449219c4.269531.890625 8.816406 1.359375 13.539063 1.359375 3.632812 0 7.367187-.273437 11.148437-.824219 12.105469-1.773437 18.8125-5.324218 24.730469-8.457031 6.113281-3.238281 10.941406-5.796875 22.042968-5.796875 9.886719 0 14.382813 2.691406 20.070313 6.097656 6.445313 3.859376 13.75 8.234376 27.792969 8.234376 14.039062 0 21.34375-4.375 27.789062-8.234376 5.6875-3.40625 10.179688-6.097656 20.070313-6.097656s14.382812 2.691406 20.070312 6.097656c6.445313 3.859376 13.75 8.234376 27.792969 8.234376 14.039062 0 21.34375-4.375 27.789062-8.234376 5.6875-3.40625 10.179688-6.097656 20.070313-6.097656s14.382813 2.691406 20.070313 6.097656c6.445312 3.859376 13.75 8.234376 27.789062 8.234376 6.6875 0 12.296875-.96875 17.6875-3.054688 5.082031 2.515625 10.617188 3.773438 16.152344 3.773438 9.457031 0 18.890625-3.648438 25.957031-10.839844l2.101563-2.136719c2.824218.996094 5.289062 2.289063 8.007812 3.726563 5.917969 3.132812 12.625 6.679687 24.730469 8.453124 3.78125.554688 7.515625.824219 11.148437.824219 4.859375 0 9.53125-.496093 13.910156-1.4375v16.527344h-71.949218c-4.148438 0-7.511719 3.363281-7.511719 7.511719 0 4.148437 3.363281 7.511718 7.511719 7.511718h84.941406c6.984375 0 12.667969 5.679688 12.667969 12.664063-.003907 53.695313-43.6875 97.382813-97.382813 97.382813zm0 0"/></svg>'}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 16, fontWeight: 'bold' }}>
                    Gran Torino (2008)
                  </Text>
                </View> 
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 14 }}>
                    Drama .... Angelina Jolie at an event for Gran Torino (2008) Alison Eastwood at an event for Gran Torino (2008)
                  </Text>
                </View> 
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <Button transparent>
                        <Icon name="ios-remove-circle-outline" style={styles.icon}/>
                    </Button>
                    <Item regular style={[styles.textInput, { borderColor: "#999", flexDirection: "row" }]}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#999' }}>
                          $
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B4B4B', flex: 1, textAlign: "center" }}>
                          1,000
                        </Text>
                    </Item>
                    <Button transparent
                    >
                        <Icon name="ios-add-circle-outline" style={styles.icon}/>
                    </Button>
                </View>
              </View>
              
          </View>
          <Button full success style={{ backgroundColor: "#FF006F", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, padding: 0, margin: 0, }}>
              <Text>ADD (+0.75 / MO)</Text>
          </Button>  */}

          {/* <View style={styles.modalContent}>
            <Button transparent style={{ position: 'absolute', left: 0, top: 0, }}>
              <Icon name='arrow-back' style={{ color: "#4B4B4B", }} />
            </Button>
              <View style={{ padding: 15 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 10, }}>
                  <View style={{ padding: 5 }}>
                    <Text style={{ color: "#4B4B4B", fontSize: 15, fontWeight: 'bold' }} >IMPORTANT</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", padding: 10, width: '100%', }}>
                  <SvgUri
                    style={{ paddingRight: 18, paddingTop: 5, }}
                    width="20"
                    height="20"
                    source={require('./images/phone.svg')}
                  />
                  <View style={{ flex: 1 }}>
                  <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', }}>Taylor Swift Reputation Stadium a Tour with special guests Camlia Cabello and CharliXOX</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", padding: 10, width: '100%', }}>
                  <SvgUri
                    style={{ paddingRight: 18, paddingTop: 5, }}
                    width="20"
                    height="20"
                    source={require('./images/location.svg')} 
                  />
                  <View style={{ flex: 1 }}>
                  <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', }}>Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter</Text>
                  </View>
                </View>
              </View>
          </View>
          <Button full light style={{ backgroundColor: "#F8F8F8", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, borderTopWidth: 1, borderColor: "#DDD" }}>
              <Text style={{ color: "#4B4B4B", fontSize: 14, }} >GOT IT</Text>
          </Button>  */}

          {/* <View style={styles.modalContent}>
              <Button transparent style={{ position: 'absolute', right: 0, top: 0, }}>
                <Icon name='close' style={{ color: "#4B4B4B", fontSize: 35,  }} />
              </Button>
              <View style={{ padding: 15 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 20, }}>
                  <View style={{ padding: 5 }}>
                    <Text style={{ color: "#4B4B4B", fontSize: 15, fontWeight: 'bold' }} >ADD YOUR SIGNIFICANT OTHER</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingBottom: 15, width: '100%', paddingLeft: 10, paddingRight: 10, }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', }}>Taylor Swift Reputation Stadium a Tour with special guests Camlia Cabello and CharliXOX</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", paddingBottom: 10, width: '100%', }}>
                  <Item regular style={[styles.textInput, { borderColor: "#DDD", flexDirection: "row" }]}>
                      <Input style={{ fontSize: 16, fontWeight: "bold", }} placeholder="FIRST NAME" placeholderTextColor={'#DDD'} />
                  </Item>
                </View>
                <View style={{ flexDirection: "row", paddingBottom: 10, width: '100%', }}>
                  <Item regular style={[styles.textInput, { borderColor: "#DDD", flexDirection: "row" }]}>
                      <Input style={{ fontSize: 16, fontWeight: "bold", }} placeholder="LAST NAME" placeholderTextColor={'#DDD'} />
                  </Item>
                </View>
              </View>
          </View>
          <Button full light style={{ backgroundColor: "#999", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, borderTopWidth: 1, borderColor: "#DDD" }}>
              <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "bold", }} >CONFIRM</Text>
          </Button>  */}
        {/* </Modal> */}
        
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
