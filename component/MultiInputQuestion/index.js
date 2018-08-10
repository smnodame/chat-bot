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
import Modal from 'react-native-modal'
import styles from '../styles'

export default class MultiInputQuestion extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        const title = _.get(this.props.question, 'input.title', null)
        const description = _.get(this.props.question, 'input.description', null)
        const trigger = _.get(this.props.question, 'trigger', null)
        const inputs = _.get(this.props.question, 'input.inputs', [])
        const text = _.get(this.props.question, 'input.button.text', 'CONFIRM')
        const button = _.get(this.props.question, 'input.button', {})

        return (
            <Modal isVisible={true}>
                <View style={styles.modalContent}>
                    <View style={{ padding: 15 }}>
                        {
                            title && <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 15, }}>
                                <View style={{ padding: 5 }}>
                                    <Text style={{ color: "#4B4B4B", fontSize: 15, fontWeight: 'bold' }} >{ title }</Text>
                                </View>
                            </View>
                        }
                        { 
                            description && <View style={{ flexDirection: "row", paddingBottom: 20, width: '100%', paddingLeft: 10, paddingRight: 10, }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', }}>{ description }</Text>
                                </View>
                            </View>
                        }
                        {
                            inputs.map((input) => {
                                return (
                                    <View style={{ flexDirection: "row", paddingBottom: 10, width: '100%', }}>
                                        <Item regular style={[styles.textInput, { borderColor: "#DDD", flexDirection: "row" }]}>
                                            <Input {...input} style={{ fontSize: 14, fontWeight: "bold", }}  placeholderTextColor={'#DDD'} />
                                        </Item>
                                    </View>
                                )
                            })
                            
                        }
                    </View>
                </View>
                <Button {...button} full light style={{ backgroundColor: "#999", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, borderTopWidth: 1, borderColor: "#DDD" }}>
                    <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "bold", }} >{ text }</Text>
                </Button> 
            </Modal>
        )
    }
}