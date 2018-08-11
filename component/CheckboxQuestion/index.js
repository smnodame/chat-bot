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
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Body, CheckBox, Button, Item, Input, Card, CardItem, } from 'native-base'
import styles from '../styles'

export default class CheckboxQuestion extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    get_message = (chosen) => {
        return chosen.reduce((o, n, index) => {
            return `${o} ${index + 1}. ${n.value}\n`
        }, '')
    }

    render = () => {
        const trigger = _.get(this.props.question, 'trigger', null)
        const options = _.get(this.props.question, 'input.options', [])
        const min = _.get(this.props.question, 'input.min', null)
        const max = _.get(this.props.question, 'input.max', null)
        const text = _.get(this.props.question, 'input.button.text', 'SEND')
        const message_func = _.get(this.props.question, 'input.message_func', this.get_message)
        return (
            <View>
                <View style={{ backgroundColor: "#F8F8F8", marginBottom: 60 }}>
                    <ScrollView>
                        {
                            options.map((option, index) => (
                                <Button full light onPress={() => this.setState({ [index.toString()]: !this.state[index.toString()] })} style={{ backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, flexDirection: 'row', justifyContent: "flex-start", }}>
                                    <CheckBox checked={this.state[index.toString()]} style={{ marginLeft: 10, marginRight: 10, }} color="green" onPress={() => this.setState({ [index.toString()]: !this.state[index.toString()] })}/>
                                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ option.label.toUpperCase() }</Text>
                                </Button>
                            ))
                        }
                        
                    </ScrollView>
                </View>
                <Button full onPress={() => {
                        const chosen = options.filter((option, index) => {
                            return this.state[index.toString()]
                        })
                        if(max) {
                            if(chosen.length > max) {
                                return
                            }
                        }
                        if(min) {
                            if(chosen.length < min) {
                                return
                            }
                        }
                        this.props.onSend({ 
                            text: message_func(chosen)
                        }, trigger)
                    }}
                    style={{ backgroundColor: "#F8F8F8", borderColor: "#EEE", height: 60, borderWidth: 0.5, borderTopWidth: 1, position: 'absolute', bottom: 0, flex: 1, width: '100%', }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}> { text } </Text>
                </Button>
            </View>
        )
    }
}