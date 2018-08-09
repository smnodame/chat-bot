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

    render = () => {
        const trigger = _.get(this.props.question, 'trigger', null)
        const options = _.get(this.props.question, 'input.options', [])
        const text = _.get(this.props.question, 'input.button.text', 'SEND')
        return (
            <View>
                <List style={{ backgroundColor: "#F8F8F8", marginBottom: 60 }}>
                    <ScrollView>
                        {
                            options.map((option, index) => (
                                <ListItem onPress={() => this.setState({ [index.toString()]: !this.state[index.toString()] })}>
                                    <CheckBox checked={this.state[index.toString()]} color="green" onPress={() => this.setState({ [index.toString()]: !this.state[index.toString()] })}/>
                                    <Body>
                                        <Text>{ option.label }</Text>
                                    </Body>
                                    <Right>
                                    </Right>
                                </ListItem>
                            ))
                        }
                        
                    </ScrollView>
                </List>
                <Button full onPress={() => {}}
                    style={{ backgroundColor: "#F8F8F8", borderColor: "#EEE", height: 60, borderWidth: 0.5, borderTopWidth: 1, position: 'absolute', bottom: 0, flex: 1, width: '100%', }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}> { text } </Text>
                </Button>
            </View>
        )
    }
}