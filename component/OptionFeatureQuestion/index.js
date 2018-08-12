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
import Modal from 'react-native-modal'

const interval_state = {}

class OptionFeaturePopup extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        const title = _.get(this.props.popup, 'title', null)
        const description = _.get(this.props.popup, 'description', null)
        const inputs = _.get(this.props.popup, 'inputs', [])
        const button = _.get(this.props.popup, 'button', {})

        return (
            <Modal isVisible={this.props.visible} avoidKeyboard={true} >
                <View style={styles.modalContent}>
                    <Button transparent style={{ position: 'absolute', right: 0, top: 0, zIndex: 999, }} onPress={() => {
                        this.props.on_close()
                        this.props.on_unchecked()
                    }}>
                        <Icon name='close' style={{ color: "#4B4B4B", fontSize: 35,  }} />
                    </Button>
                    <View style={{ padding: 15, paddingBottom: 5, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 15, }}>
                            <View style={{ padding: 5 }}>
                                <Text style={{ color: "#4B4B4B", fontSize: 15, fontWeight: 'bold' }} >{ title }</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", paddingBottom: 20, width: '100%', paddingLeft: 10, paddingRight: 10, }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', }}>{ description }</Text>
                            </View>
                        </View>
                        {
                            inputs.map((input, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: "row", paddingBottom: 10, width: '100%', }}>
                                        <Item regular style={[styles.textInput, { borderColor: "#DDD", flexDirection: "row" }]}>
                                            <Input {...input} value={_.get(this.state, index.toString(), '')} onChangeText={(text) => this.setState({ [index.toString()]: text })}  style={{ fontSize: 14, fontWeight: "bold", }}  placeholderTextColor={'#DDD'} />
                                        </Item>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <Button {...button} 
                    onPress={() => {
                        let valid = true
                        inputs.forEach((input, index) => {
                            if(!_.get(this.state, index.toString(), '') && _.get(input, 'require', true)) {
                                valid = false
                            }
                        })
                        if(valid) {
                            this.props.on_close()
                        }
                    }}
                    full light style={{ backgroundColor: "#FF006F", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, }}>
                    <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "bold", }} >{ this.props.button }</Text>
                </Button> 
            </Modal>
        )
    }
}

class OptionFeatureOption extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false,
        checked: false
      }
    }

    on_close = () => {
        this.setState((previousState) => {
            return {
                visible: false,
            }
        })
    }
    
    on_unchecked = () => {
        this.setState((previousState) => {
            return {
                checked: false,
            }
        })
    }

    render() {
        const option = _.get(this.props, 'option', {})
        const index = _.get(this.props, 'index', '')
        const id = _.get(this.props, 'id', '')

        return (
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
                        <Switch 
                            style={{ marginBottom: 15 }} 
                            value={ this.state.checked } 
                            onValueChange={(checked) => { 
                                const popup = _.get(option, 'popup', null)
                                this.setState({ 
                                    checked: checked,
                                    visible: checked && popup? true : false,
                                })

                                const total = _.get(interval_state, `${id}.total`, 0)
                                const on_update_total = _.get(interval_state, `${id}.on_update_total`, () => {})
                                if(checked) {
                                    _.set(interval_state, `${id}.total`, total + option.price) 
                                } else {
                                    _.set(interval_state, `${id}.total`, total - option.price)
                                }
                                on_update_total(_.get(interval_state, `${id}.total`, 0))
                            }} 
                        />
                        <Text style={{ color: "#999", fontSize: 12, fontWeight: "bold",  }} > { `+${option.currency}${option.price}/${option.per}` } </Text>
                    </View>
                    <OptionFeaturePopup visible={this.state.visible} on_unchecked={this.on_unchecked} on_close={this.on_close} popup={option.popup} button={`+${option.currency}${option.price}/${option.per}`}/>
                </CardItem>
            </Card>
        )
    }
}

class OptionFeatureQuestion extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render() {
        const options = _.get(this.props.question, 'input.options', [])
        const title = _.get(this.props.question, 'input.title', '')
        const id = _.get(this.props.question, 'id', '')

        return (
            <View style={{ backgroundColor: "#F2F2F2", paddingBottom: 15, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>{ title }</Text>
                {
                    options.map((option, index) => {
                        return (
                            <OptionFeatureOption id={id} key={index} option={option} index={index} />
                        )
                    })
                }
           </View>
        )
    }
}

class OptionFeatureAction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: _.get(props.question, 'input.button.default_number', 0),
        }

        const id = _.get(props.question, 'id', '')
        _.set(interval_state, `${id}.on_update_total`, this.on_update_total) 
    }

    on_update_total = (total) => {
        this.setState({
            total
        })
    }

    render() {
        const operation = _.get(this.props.question, 'input.button.operation', 'ADD')
        const per = _.get(this.props.question, 'input.button.per', 'MO')
        const key = _.get(this.props.question, 'input.button.key', '')
        const trigger = _.get(this.props.question, 'trigger', null)
        const message = _.get(this.props.question, 'message', '')

        return (
            <View style={{ flexDirection: 'row' }}>
                <Button full light onPress={() => {
                    this.props.onSend({ 
                        text: message.replace(`{${key}}`, this.state.total)
                    }, trigger)
                }} style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ `${operation} (+${this.state.total}/${per})` }</Text>
                </Button>
            </View>
        )
    }
}

export { 
    OptionFeatureAction,
    OptionFeatureQuestion
}