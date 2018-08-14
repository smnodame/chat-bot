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
import styles from '../styles'

class CircleCard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render = () => {
        const item = this.props.item
        return (
            <View style={{ width: 165, paddingLeft: 10, }} key={item.key}>
                <TouchableOpacity onPress={() => {
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