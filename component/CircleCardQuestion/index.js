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
  TouchableWithoutFeedback,
} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Body, CheckBox, Button, Item, Input, Card, CardItem, } from 'native-base'
import SvgUri from 'react-native-svg-uri'
import Modal from 'react-native-modal'
import styles from '../styles'

const interval_state = {}

class CircleCardModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: _.get(props.popup.step_1, 'default_number', 0),
            charges: _.get(props.popup.step_1, 'button.default_number', 0),
            step: 1,
        }
    }

    render = () => {
        // step 1
        const image = _.get(this.props.popup.step_1, 'image', null)
        const title = _.get(this.props.popup.step_1, 'title', null)
        const description = _.get(this.props.popup.step_1, 'description', null)
        
        const currency = _.get(this.props.popup.step_1, 'currency', '฿')
        const increase_number = _.get(this.props.popup.step_1, 'increase_number', 1)
        const min = _.get(this.props.popup.step_1, 'min', null)
        const max = _.get(this.props.popup.step_1, 'max', null)

        const button = _.get(this.props.popup.step_1, 'button', {})
        const increase_charges =  _.get(this.props.popup.step_1, 'button.increase_number', 1)

        // step 2
        const step_2_title = _.get(this.props.popup.step_2, 'title', null) 
        const step_2_description = _.get(this.props.popup.step_2, 'description', null) 
        const step_2_items = _.get(this.props.popup.step_2, 'items', []) 
        const step_2_button = _.get(this.props.popup.step_2, 'button', {})

        return (
                <Modal isVisible={_.get(this.props, 'show', false)} onBackdropPress={() => { }}>
                    {
                    this.state.step == 1 && <View>
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
                        <Button 
                            full success 
                            style={{ 
                                backgroundColor: "#FF006F", borderBottomLeftRadius: 5, 
                                borderBottomRightRadius: 5, borderWidth: 0, padding: 0, margin: 0, 
                            }}
                            onPress={() => {
                                this.setState({
                                    step: 2,
                                })
                            }}
                        >
                            <Text>{ `${button.operation} (+${this.state.charges} / ${button.per})`}</Text>
                        </Button>
                    </View>
                }
                {
                    this.state.step == 2 && <View>
                        <View style={styles.modalContent}>
                            <Button transparent style={{ position: 'absolute', left: 0, top: 0, padding: 5, zIndex: 9999 }} onPress={() => {
                                this.setState({
                                    step: 1,
                                })
                            }}>
                                <Icon name='arrow-back' style={{ color: "#4B4B4B", }} />
                            </Button>
                            <View style={{ padding: 15 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 10, }}>
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ color: "#4B4B4B", fontSize: 15, fontWeight: 'bold' }} >{ step_2_title }</Text>
                                    </View>
                                </View>
                                {
                                    step_2_items.map((item) => {
                                        return (
                                            <View style={{ flexDirection: "row", padding: 10, width: '100%', }}>
                                                <SvgUri
                                                    style={{ paddingRight: 18, paddingTop: 5, }}
                                                    width="20"
                                                    height="20"
                                                    source={item.image}
                                                />
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', }}>{ item.description }</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <Button full light 
                            onPress={() => {
                                this.setState({
                                    step: 1,
                                }, () => {
                                    this.props.on_selected(this.state.price, this.state.charges)
                                    this.props.on_close()
                                })
                            }}
                            style={{ backgroundColor: "#F8F8F8", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, borderTopWidth: 1, borderColor: "#DDD" }}>
                            <Text style={{ color: "#4B4B4B", fontSize: 14, }} >{ step_2_button.text }</Text>
                        </Button> 
                    </View>
                }
        </Modal>
        )
    }
}

class CircleCard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          show: false,
          selected: this.props.item.selected,
          selected_price: _.get(this.props.item, 'popup.step_1.default_number', 0),
          index: this.props.index
      }
    }

    on_close = () => {
        this.setState({
            show: false
        })
    }
    
    on_selected = (selected_price, selected_charges) => {
        this.setState({
            selected: true,
            selected_price,
            selected_charges,
        })

        const id = this.props.id
        const total = _.get(interval_state, `${id}.total`, 0)
        const on_update_total = _.get(interval_state, `${id}.on_update_total`, () => {})
        _.set(interval_state, `${id}.total`, total + selected_charges) 
        _.set(interval_state, `${id}.chosen.${this.state.index}`, true)
        on_update_total(_.get(interval_state, `${id}.total`, 0))
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
                        this.state.selected && <SvgUri
                            width="160"
                            height="160"
                            source={require('../../images/added.svg')}
                        />
                    }
                    {
                        !this.state.selected && <SvgUri
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
                        this.state.selected && <Button transparent light 
                            onPress={() => {
                                this.setState({
                                    selected: false,
                                }, () => {
                                    const id = this.props.id
                                    const total = _.get(interval_state, `${id}.total`, 0)
                                    const on_update_total = _.get(interval_state, `${id}.on_update_total`, () => {})
                                    _.set(interval_state, `${id}.total`, total - this.state.selected_charges) 
                                    _.set(interval_state, `${id}.chosen.${this.state.index}`, false)
                                    on_update_total(_.get(interval_state, `${id}.total`, 0))
                                })
                            }}
                            style={{ zIndex: 9999, position: 'absolute', top: 0, left: 0, width: 60, height: 60, }}>
                            <View />
                        </Button>
                    }
                    {
                        this.state.selected && <SvgUri
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}
                            width="160"
                            height="160"
                            source={require('../../images/ribbon.svg')}
                        />
                    }
                    {
                        this.state.selected && <Text style={{ position: 'absolute', textAlign: 'center', width: '100%', top: 100, color: 'white', }}>
                            { `${item.currency} ${this.state.selected_price}` }
                        </Text>
                    }
                    
                </TouchableOpacity>
                <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', textAlign: 'center', }}>{ item.name }</Text>
                <CircleCardModal show={this.state.show} on_close={this.on_close} popup={item.popup} on_selected={this.on_selected} />
            </View>
        )
    }
}


class CircleCardQuestion extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render = () => {
        const id = _.get(this.props.question, 'id', null)
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
                        renderItem={({item, index}) => (
                            <CircleCard item={item} id={id} index={index} />
                        )}
                    />
                </View>
            </View>
        )
    }
}

class CircleCardAction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: _.get(props.question, 'input.button.default_number', 0),
            operation: _.get(props.question, 'input.button.operation', 'ADD'),
            per: _.get(props.question, 'input.button.per', 'MO')
        }

        const id = _.get(props.question, 'id', '')
        _.set(interval_state, `${id}.on_update_total`, this.on_update_total)
        _.set(interval_state, `${id}.total`, this.state.total)  
    }

    on_update_total = (total) => {
        this.setState({
            total
        })
    }

    get_message = () => {
        const key = _.get(this.props.question, 'input.button.key', '')
        const message = _.get(this.props.question, 'message', '')

        return message.replace(`{${key}}`, this.state.total)
    }

    render() {
        const trigger = _.get(this.props.question, 'trigger', null)
        const message_func = _.get(this.props.question, 'input.message_func', this.get_message)
        const id = _.get(this.props.question, 'id', '')

        return (
            <View style={{ flexDirection: 'row' }}>
                <Button full light onPress={() => { 
                    const chosen = _.get(interval_state, `${id}.chosen`, {})
                    const args = Object.keys(chosen).filter((key) => {
                        return chosen[key]
                    }).map((key) => {
                        return this.props.question.input.options[parseInt(key)]
                    })
                    this.props.onSend({ 
                        text: message_func(args, this.state.total)
                    }, trigger)
                }} style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#EEE", borderWidth: 0.5, height: 60, borderTopWidth: 1, }}>
                    <Text numberOfLines={1} style={{ color: "#4B4B4B", fontSize: 14, }}>{ `${this.state.operation} (+${this.state.total}/${this.state.per})` }</Text>
                </Button>
            </View>
        )
    }
}

export {
    CircleCardQuestion,
    CircleCardAction
}
