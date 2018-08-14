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
  FlatList,
} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Body, CheckBox, Button, Item, Input, Card, CardItem, } from 'native-base'
import SvgUri from 'react-native-svg-uri'
import Modal from 'react-native-modal'
import styles from '../styles'


class CircleCardModal extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        price: _.get(props.popup, 'default_number', 0),
        charges: _.get(props.popup, 'button.default_number', 0),
    }
    }

    render = () => {
        const image = _.get(this.props.popup, 'image', null)
        const title = _.get(this.props.popup, 'title', null)
        const description = _.get(this.props.popup, 'description', null)
        
        const currency = _.get(this.props.popup, 'currency', '฿')
        const increase_number = _.get(this.props.popup, 'increase_number', 1)
        const min = _.get(this.props.popup, 'min', null)
        const max = _.get(this.props.popup, 'max', null)

        const button = _.get(this.props.popup, 'button', {})
        const increase_charges =  _.get(this.props.popup, 'button.increase_number', 1)
        return (
            <Modal isVisible={_.get(this.props, 'show', false)} onBackdropPress={() => { }}>
                <View style={styles.modalContent}>
                    <Button transparent style={{ position: 'absolute', right: 0, top: 0, zIndex: 999, }} 
                        onPress={() => { this.props.on_close() }}
                    >
                        <Icon name='close' style={{ color: "#4B4B4B", fontSize: 35,  }} />
                    </Button>
                    <View style={{ padding: 15 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                        <SvgUri
                            width="60"
                            height="60"
                            source={image}
                        />
                        </View>
                        <View>
                        <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 16, fontWeight: 'bold' }}>
                            { title }
                        </Text>
                        </View> 
                        <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 14 }}>
                            { description }
                        </Text>
                        </View> 
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            <Button transparent onPress={() => {
                                    const price = this.state.price - increase_number
                                    const charges = this.state.charges - increase_charges
                                    if(min) {
                                        if(price < min) {
                                            return
                                        }
                                    }
                                    this.setState((previousState) => {
                                        return {
                                            price: price,
                                            charges: charges,
                                        }
                                    })
                                }}
                            >
                                <Icon name="ios-remove-circle-outline" style={styles.icon}/>
                            </Button>
                            <Item regular style={[styles.textInput, { borderColor: "#999", flexDirection: "row" }]}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#999' }}>
                                    { currency }
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B4B4B', flex: 1, textAlign: "center" }}>
                                    { this.state.price }
                                </Text>
                            </Item>
                            <Button transparent onPress={() => {
                                    const price = this.state.price + increase_number
                                    const charges = this.state.charges + increase_charges
                                    if(max) {
                                        if(price > max) {
                                            return
                                        }
                                    }
                                    this.setState((previousState) => {
                                        return {
                                            price: price,
                                            charges: charges,
                                        }
                                    })
                                }}
                            >
                                <Icon name="ios-add-circle-outline" style={styles.icon}/>
                            </Button>
                        </View>
                    </View>
                    
                </View>
                <Button full success style={{ backgroundColor: "#FF006F", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, padding: 0, margin: 0, }}>
                    <Text>{ `${button.operation} (+${this.state.charges} / ${button.per})`}</Text>
                </Button>
        </Modal>
        )
    }
}
class CircleCard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          show: false
      }
    }

    on_close = () => {
        this.setState({
            show: false
        })
    }

    render = () => {
        const item = this.props.item
        return (
            <View style={{ width: 165, paddingLeft: 10, }} key={item.key}>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        show: true,
                    })
                }}>
                    {
                        item.selected && <SvgUri
                            width="160"
                            height="160"
                            source={require('../../images/added.svg')}
                        />
                    }
                    {
                        !item.selected && <SvgUri
                            width="160"
                            height="160"
                            source={require('../../images/blank.svg')}
                        />
                    }
                    <SvgUri
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
                        width="60"
                        height="60"
                        source={item.image}
                    />
                    {
                        item.selected && <SvgUri
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}
                            width="160"
                            height="160"
                            source={require('../../images/ribbon.svg')}
                        />
                    }
                    {
                        item.selected && <Text style={{ position: 'absolute', textAlign: 'center', width: '100%', top: 100, color: 'white', }}>
                            { `${item.currency} ${item.price}` }
                        </Text>
                    }
                    
                </TouchableOpacity>
                <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', textAlign: 'center', }}>{ item.name }</Text>
                <CircleCardModal show={this.state.show} on_close={this.on_close} popup={item.popup} />
            </View>
        )
    }
}


export default class CircleCardQuestion extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render = () => {
        const title = _.get(this.props.question, 'input.title', '')
        const description = _.get(this.props.question, 'input.description', '')
        const options = _.get(this.props.question, 'input.options', [])
        return (
            <View style={{ backgroundColor: "#F8F8F8", paddingBottom: 20, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>{ title }</Text>
                <View style={{ flexDirection: "row", paddingBottom: 20, width: '100%', paddingLeft: 10, paddingRight: 10, }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#4B4B4B", fontSize: 12, fontWeight: '400', textAlign: 'center', }}>{ description }</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={options}
                        renderItem={({item}) => (
                            <CircleCard item={item} />
                        )}
                    />
                </View>
            </View>
        )
    }
}