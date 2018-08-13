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

export default class CircleCardQuestion extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render = () => {
        return (
            <View style={{ backgroundColor: "#F8F8F8", paddingBottom: 20, }}>
                <Text style={{ color: "#4B4B4B", fontSize: 16, fontWeight: "bold", padding: 10, textAlign: "center",  }}>Add Extra Coverage</Text>
                <View style={{ flexDirection: "row", paddingBottom: 20, width: '100%', paddingLeft: 10, paddingRight: 10, }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#4B4B4B", fontSize: 12, fontWeight: '400', textAlign: 'center', }}>Parsley sausage, Crab stick, Mozzarella Cheese. With the choices of crust between Pan and Crispy Thin available.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={[
                            {
                                key: 1,
                                image: require('../../images/gallery.svg'),
                                name: 'GALLERY',
                            },
                            {
                                key: 2,
                                image: require('../../images/calendar.svg'),
                                name: 'CALENDAR',
                            },
                            {
                                key: 2,
                                image: require('../../images/video.svg'),
                                name: 'VIDEO',
                            }
                        ]}
                        renderItem={({item}) => (
                            <View style={{ width: 165, paddingLeft: 10, }} key={item.key}>
                                <View>
                                    <SvgUri
                                        width="160"
                                        height="160"
                                        source={require('../../images/added.svg')}
                                    />
                                    <SvgUri
                                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
                                        width="60"
                                        height="60"
                                        source={item.image}
                                    />
                                </View>
                                <Text style={{ color: "#4B4B4B", fontSize: 14, fontWeight: '400', textAlign: 'center', }}>{ item.name }</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}