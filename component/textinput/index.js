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

export default class TextInput extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          text: '',
      }
    }

    render() {
        props = this.props
        return (
            <View style={styles.footer}>
                <Item regular style={[styles.textInput]}>
                    <Input style={{ fontSize: 15 }} ref={'chatInputRef'}  returnKeyType={'send'} 
                    blurOnSubmit={false} value={this.state.text} onChangeText={(text) => this.setState({text})} 
                    placeholderTextColor={'#999'} placeholder={'ADD A MESSAGE ...'}
                    {...props.input} />
                </Item>
                <TouchableOpacity 
                disabled={!this.state.text}
                onPress={() => {
                    props.onFinish({
                        text: this.state.text,
                    }, props.question.trigger)
                    this.setState({
                        text: ''
                    })
                }} 
                style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                    <Icon ios='md-send' android="md-send" style={{fontSize: 30, color: '#FF006F'}}/>
                </TouchableOpacity>
            </View>
        )
    }
}