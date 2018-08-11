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
import DatePicker from 'react-native-date-picker-x'
import dateFormat from 'dateformat'

export default class CalendarQuestion extends React.Component {
    constructor(props) {
      super(props)
    }

    get_message = () => {
        const mode = _.get(this.props.question, 'input.calendar.mode', 'date')
        const date = mode == 'date'? dateFormat(this.date, "dddd, mmmm dS, yyyy") : dateFormat(this.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")
        
        const message = _.get(this.props.question, 'message', '{}')
        const key = _.get(this.props.question, 'input.calendar.key', '')
        return message? message.replace(`{${key}}`, date) : date
    }

    render = () => {
        const trigger = _.get(this.props.question, 'trigger', null)
        const mode = _.get(this.props.question, 'input.calendar.mode', 'date')
        const text = _.get(this.props.question, 'input.button.text', 'CHOOSE')
        this.date = _.get(this.props.question, 'input.calendar.date', new Date())
        return (
            <View>
                <DatePicker 
                    date={this.date}
                    mode={mode}
                    style={{ width: '100%' }}
                    onDateChange={(date) => {
                        this.date = date
                    }}
                />
                <Button full onPress={() => {
                        this.props.onSend({ 
                            text: this.get_message()
                        }, trigger)} 
                    } 
                    style={{ backgroundColor: "#F8F8F8", borderColor: "#EEE", height: 60, borderWidth: 0.5, borderTopWidth: 1, }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{  text }</Text>
                </Button>
            </View>
        )
    }
}