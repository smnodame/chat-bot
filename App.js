import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {GiftedChat, Actions, Bubble, SystemMessage, InputToolBar, Send, } from 'react-native-gifted-chat';
import CustomActions from './screens/CustomActions';
import CustomView from './screens/CustomView';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Body, CheckBox, Button, Item, Input, } from 'native-base';
import Modal from 'react-native-modal';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  async componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('./data/messages.js'),
      };
    });

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderInputToolbar = (props) => {
    return (
      <View style={styles.footer}>
        <Item regular style={[styles.textInput]}>
            <Input style={{ fontSize: 15 }} ref={'chatInputRef'}  returnKeyType={'send'} 
              blurOnSubmit={false} value={this.state.text} onChangeText={(text) => this.setState({text})} 
              placeholder="ADD A MESSAGE ..." placeholderTextColor={'#999'} />
        </Item>
        <TouchableOpacity onPress={() => this.setState({ show: true })} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <Icon ios='md-send' android="md-farward" style={{fontSize: 30, color: '#FF006F'}}/>
        </TouchableOpacity>
    </View>
    )
  }

  renderChatFooter(props) {
    const option = 3
    if(option == 1) {
      return (
        <List style={{ backgroundColor: "#F8F8F8", maxHeight: '40%' }}>
          <ScrollView>
          <ListItem>
            <CheckBox checked={false} color="green" />
            <Body>
              <Text>Simon Mignolet</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} color="green" />
            <Body>
              <Text>Nathaniel Clyne</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem>
            <CheckBox checked={true} color="green" />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          </ScrollView>
        </List>
      )
    } else if(option == 2) {
      return (
        <View style={{ flexDirection: "row" }}>
          <Button full light style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#F0F0F0", borderWidth: 1, }}>
            <Text style={{ color: "#4B4B4B"}}>{ 'Confirm'.toUpperCase() }</Text>
          </Button>
          <Button full light style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#F0F0F0", borderWidth: 1, }}>
            <Text style={{ color: "#4B4B4B"}}>{ 'Normal'.toUpperCase() }</Text>
          </Button>
          <Button full light style={{ flex: 1, backgroundColor: "#F8F8F8", borderColor: "#F0F0F0", borderWidth: 1, }}>
            <Text style={{ color: "#4B4B4B"}}>{ 'Cancle'.toUpperCase() }</Text>
          </Button>
        </View>
      )
    } else if(option == 3) {
      return (
        <List style={{ backgroundColor: "#F8F8F8", maxHeight: '40%' }}>
          <ScrollView>
          <ListItem>
            <Left>
              <Text>Simon Mignolet</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Nathaniel Clyne</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Daily Stand Up</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
          </ScrollView>
        </List>
      )
    }
  }

  render() {
    return (
      <Container>
        
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          renderChatFooter={this.renderChatFooter}
          isLoadingEarlier={this.state.isLoadingEarlier}
          renderInputToolbar={this.renderInputToolbar}
          minInputToolbarHeight={60}
          alwaysShowSend={true}

          user={{
            _id: 1, // sent messages should have same user._id
          }}

          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          renderFooter={this.renderFooter}
        />
        <Modal isVisible={this.state.show}>
          <View style={styles.modalContent}>
              <View style={{ padding: 15 }}>
                <View>
                  <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 16, fontWeight: 'bold' }}>
                    Gran Torino (2008)
                  </Text>
                </View> 
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center', padding: 5, color: "#4B4B4B", fontSize: 14 }}>
                    Drama .... Angelina Jolie at an event for Gran Torino (2008) Alison Eastwood at an event for Gran Torino (2008)
                  </Text>
                </View> 
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <Button transparent>
                        <Icon name="ios-remove-circle-outline" style={styles.icon}/>
                    </Button>
                    <Item regular style={[styles.textInput, { borderColor: "#999", flexDirection: "row" }]}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#999' }}>
                          $
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B4B4B', flex: 1, textAlign: "center" }}>
                          1,000
                        </Text>
                    </Item>
                    <Button transparent
                    >
                        <Icon name="ios-add-circle-outline" style={styles.icon}/>
                    </Button>
                </View>
              </View>
              <Button full success style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0, padding: 0, margin: 0, }}>
                  <Text>ADD (+0.75 / MO)</Text>
              </Button>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  textInput: {
    height: 45,
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingLeft: 10, 
    paddingRight: 10,
    marginLeft: 5, 
    marginRight: 5, 
    marginBottom: 5, 
    backgroundColor: 'white', 
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2'
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: 30, color: '#4B4B4B',
  },
});

// import Modal from 'react-native-modal';
// <Modal isVisible={this.state.billModal}>{this.renderBillModal()}</Modal>