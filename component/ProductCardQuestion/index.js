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
import SvgUri from 'react-native-svg-uri'

const interval_state = {

}

class ProductCardQuestion extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          price: _.get(props.question, 'input.card.default_number', 0)
      }

      _.set(interval_state, `${props.question.id.toString()}.card`, this)
    }

    render = () => {
        const trigger = _.get(this.props.question, 'trigger', null)
        const grobal_title = _.get(this.props.question, 'input.title', '')

        const card_title = _.get(this.props.question, 'input.card.title', '')
        const currency = _.get(this.props.question, 'input.card.currency', '฿')
        const description = _.get(this.props.question, 'input.card.description', '')
        const increase_number = _.get(this.props.question, 'input.card.increase_number', 1)
        const image = _.get(this.props.question, 'input.card.image', '')
        const min = _.get(this.props.question, 'input.card.min', null)
        const max = _.get(this.props.question, 'input.card.max', null)
        return (
            <View style={{ backgroundColor: "#F2F2F2", paddingBottom: 15, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>{ grobal_title }</Text>
                <Card style={{ margin: 10 }}>
                    <CardItem style={{ flexDirection: "row" }}>
                    <View style={{ padding: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                        <SvgUri
                            width="60"
                            height="60"
                            source={image}
                        />
                        </View>
                        <View>
                        <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 16, fontWeight: 'bold' }}>
                            { card_title }
                        </Text>
                        </View> 
                        
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            <Button transparent
                                onPress={() => {
                                    const price = this.state.price - increase_number
                                    if(min) {
                                        if(price < min) {
                                            return
                                        }
                                    }
                                    this.setState((previousState) => {
                                        return {
                                            price: price,
                                        }
                                    })

                                    const button = _.get(interval_state, `${this.props.question.id.toString()}.button`)
                                    button.setState((previousState) => {
                                        return {
                                            price: previousState.price - _.get(button.props.question, 'input.button.increase_number', 1),
                                        }
                                    })
                                }}
                            >
                                <Icon name="ios-remove-circle-outline" style={[styles.icon, { color: min && this.state.price - increase_number < min ? '#DDD' : '#4B4B4B' }]} />
                            </Button>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#4B4B4B', textAlign: "center", flex: 1, }}>
                            { currency + ' ' + this.state.price }
                            </Text>
                            <Button transparent
                                onPress={() => {
                                    const price = this.state.price + increase_number
                                    if(max) {
                                        if(price > max) {
                                            return
                                        }
                                    }
                                    this.setState((previousState) => {
                                        return {
                                            price: price,
                                        }
                                    })

                                    const button = _.get(interval_state, `${this.props.question.id.toString()}.button`)
                                    button.setState((previousState) => {
                                        return {
                                            price: previousState.price + _.get(button.props.question, 'input.button.increase_number', 1),
                                        }
                                    })
                                }}
                            >
                                <Icon name="ios-add-circle-outline" style={[styles.icon, { color: max && this.state.price + increase_number > max ? '#DDD' : '#4B4B4B' }]}/>
                            </Button>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 14 }}>
                            { description } 
                        </Text>
                        </View> 
                    </View>
                    </CardItem>
                </Card>
            </View>
        )
    }
}


class ProductCardAction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: _.get(props.question, 'input.button.default_number', 0)
        }
        _.set(interval_state, `${props.question.id.toString()}.button`, this)

        this.card = _.get(interval_state, `${props.question.id.toString()}.card`)
    }

    get_message = () => {
        const message = _.get(this.props.question, 'message', '')
        const key1 = _.get(this.props.question, 'input.card.key', 'null')
        const key2 = _.get(this.props.question, 'input.button.key', 'null')

        const card = _.get(interval_state, `${this.props.question.id.toString()}.card`)
        return message.replace(`{${key1}}`, card.state.price).replace(`{${key2}}`, this.state.price)
    }

    render() {
        const operation = _.get(this.props.question, 'input.button.operation', 'ADD')
        const per = _.get(this.props.question, 'input.button.per', 'MO')
        const trigger = _.get(this.props.question, 'trigger', null)
        return (
            <View style={{ flexDirection: 'row' }}>
                <Button full light onPress={() => { 
                    this.props.onSend({ 
                        text: this.get_message()
                    }, trigger)
                }} style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ `${operation} (+${this.state.price}/${per})` }</Text>
                </Button>
            </View>
        )
    }
}

export { 
    ProductCardAction,
    ProductCardQuestion
}