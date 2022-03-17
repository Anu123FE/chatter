import React from 'react';
import { View, Text, } from 'react-native';
//importing GiftedChat
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

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

    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

  render() {
    return (
      //adding View to wrap one component within another component along with text element
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.route.params.bgColor }}>
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
      </View>
    )
  }
}
