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

export default class OptionFeatureQuestion extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render() {
        const options = _.get(this.props.question, 'input.options', [])
        const title = _.get(this.props.question, 'input.title', '')
        return (
            <View style={{ backgroundColor: "#F2F2F2", paddingBottom: 15, marginBottom: 15, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>{ title }</Text>
                {
                    options.map((option) => (
                        <Card style={{ margin: 10 }}>
                            <CardItem style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, paddingRight: 10, }}>
                                <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: "500", marginBottom: 10, }}>
                                    { option.title }
                                </Text>
                                <Text style={{ color: "#CCC", fontSize: 12, fontWeight: "500", }}>
                                    { option.description }
                                </Text>
                            </View>
                            <View style={{ height: "100%", alignItems: 'center', }}> +$1.67/MO
                                <Switch style={{ marginBottom: 15 }} />
                                <Text style={{ color: "#999", fontSize: 12, fontWeight: "bold",  }} > { `+${option.currency}${option.price}/${option.per}` } </Text>
                            </View>
                            </CardItem>
                        </Card>
                    ))
                }
           </View>
        )
    }
}