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

export default class ButtonQuestion extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        const options = _.get(this.props.question, 'input.options', [])
        const layout = _.get(this.props.question, 'input.layout', 'horizontal')
        if(layout == 'vertical') {
            return (
                <ScrollView>
                    {
                        options.map((option) => (
                            <Button full light onPress={() => this.props.onSend({ text: option.value }, option.trigger)}  style={{ backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, }}>
                                <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ option.label.toUpperCase() }</Text>
                            </Button>
                        ))
                    }
                </ScrollView>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row' }}>
                    {
                        options.map((option) => (
                            <Button full light onPress={() => this.props.onSend({ text: option.value }, option.trigger)} style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, }}>
                                <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ option.label.toUpperCase() }</Text>
                            </Button>
                        ))
                    }
                </View>
            )
        }
    }
}