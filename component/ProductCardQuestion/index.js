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

export default class ProductCardQuestion extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          price: _.get(props.question, 'input.card.default_number', 0)
      }
    }

    render = () => {
        const trigger = _.get(this.props.question, 'trigger', null)
        const grobal_title = _.get(this.props.question, 'input.title', '')

        const card_title = _.get(this.props.question, 'input.card.title', '')
        const unit = _.get(this.props.question, 'input.card.unit', '฿')
        const description = _.get(this.props.question, 'input.card.description', '')
        const increase_number = _.get(this.props.question, 'input.card.increase_number', 1)
        return (
            <View style={{ backgroundColor: "#F2F2F2", paddingBottom: 15, marginBottom: 15, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>{ grobal_title }</Text>
                <Card style={{ margin: 10 }}>
                    <CardItem style={{ flexDirection: "row" }}>
                    <View style={{ padding: 5 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                        <SvgUri
                            width="60"
                            height="60"
                            source={require('../../images/hamberger.svg')}
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
                                    this.setState((previousState) => {
                                        return {
                                            price: previousState.price - increase_number,
                                        }
                                    })
                                }}
                            >
                                <Icon name="ios-remove-circle-outline" style={styles.icon}/>
                            </Button>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#4B4B4B', textAlign: "center", flex: 1, }}>
                            { unit + ' ' + this.state.price }
                            </Text>
                            <Button transparent
                                onPress={() => {
                                    this.setState((previousState) => {
                                        return {
                                            price: previousState.price + increase_number,
                                        }
                                    })
                                }}
                            >
                                <Icon name="ios-add-circle-outline" style={styles.icon}/>
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