import React from 'react';
import { View, Text, KeyboardAvoidingView  } from 'react-native';
//importing GiftedChat
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    
  //setting the state to null
    constructor() {
      super();
      this.state = {
        messages: [],
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      }
    }
    //setting the message state - static system message and a normal message
    componentDidMount() {
     this.props.navigation.setOptions({title: this.props.route.params.name})
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: 'You have entered the chat',
            createdAt: new Date(),
            system: true,
          },
        ],
      })
    }
   
    //adding message bubbles
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#000'
            }
          }}
        />
      )
    }
    //adding onSend to get the message to be sent upon clicking "Send"
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

  render() {
    return (
      //adding View to wrap one component within another component along with text element and adding GiftedChat and KeyboardAvoidingView for Android
      <View style={{flex:1, backgroundColor: this.props.route.params.bgColor }}>
        <GiftedChat
           renderBubble={this.renderBubble.bind(this)}
           messages={this.state.messages}
           onSend={messages => this.onSend(messages)}
             user={{
                  _id: 1,
                  name: this.state.name,
                  avatar: 'user'
                  }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
      </View>
    )
  }
}
