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
                                    <View style={{ flexDirection: "row", paddingBottom: 10, width: '100%', }}>
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
                    }}
                    full light style={{ backgroundColor: "#999", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, borderTopWidth: 1, borderColor: "#DDD" }}>
                    <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "bold", }} >{ this.props.button }</Text>
                </Button> 
            </Modal>
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

        return (
            <View style={{ backgroundColor: "#F2F2F2", paddingBottom: 15, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>{ title }</Text>
                {
                    options.map((option, index) => (
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
                                <Switch style={{ marginBottom: 15 }} value={ this.state[index.toString()] } 
                                onValueChange={(checked) => { 
                                    const popup = _.get(option, 'popup', null)
                                    this.setState({ 
                                        [index.toString()]: checked,
                                        visible: popup? true : false,
                                    })
                                }} 
                                />
                                <Text style={{ color: "#999", fontSize: 12, fontWeight: "bold",  }} > { `+${option.currency}${option.price}/${option.per}` } </Text>
                            </View>
                            <OptionFeaturePopup visible={this.state.visible} popup={option.popup} button={`+${option.currency}${option.price}/${option.per}`}/>
                            </CardItem>
                        </Card>
                    ))
                }
           </View>
        )
    }
}

class OptionFeatureAction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Button full light onPress={() => {
                }} style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ `ADD (+35/MO)` }</Text>
                </Button>
            </View>
        )
    }
}

export { 
    OptionFeatureAction,
    OptionFeatureQuestion
}