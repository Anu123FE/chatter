import React from 'react';
import { View, Text, KeyboardAvoidingView  } from 'react-native';
//importing GiftedChat
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';
//importing Firestore
import firebase from 'firebase';
import 'firebase/firestore';

export default class Chat extends React.Component {
    
  //setting the state to null
    constructor() {
      super();
      const firebaseConfig = {
        apiKey: "AIzaSyBnC3DuJo06ZvH808y5ActI5ZjWgMOo8RE",
        authDomain: "chatter-e798d.firebaseapp.com",
        projectId: "chatter-e798d",
        storageBucket: "chatter-e798d.appspot.com",
        messagingSenderId: "660443184971",
        appId: "1:660443184971:web:7cddc906ddbabc8ce0f2ce",
        measurementId: "G-KLQ4BSWJV0"
      };
      if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        }
        this.referenceChatMessages = firebase.firestore().collection("messages");
      
      this.state = {
        messages: [],
        user: {
          _id: 22,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      }
    }
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        });
      });
      this.setState({
        messages,
      });
    };
    
    //setting the message state - static system message and a normal message
    //componentDidMount() {
    // this.props.navigation.setOptions({title: this.props.route.params.name})
      // this.setState({
      //   messages: [
      //     {
      //       _id: 1,
      //       text: 'Hello developer',
      //       createdAt: new Date(),
      //       user: {
      //         _id: 2,
      //         name: 'React Native',
      //         avatar: 'https://placeimg.com/140/140/any',
      //       },
      //     },
      //     {
      //       _id: 3,
      //       text: 'You have entered the chat',
      //       createdAt: new Date(),
      //       system: true,
      //     },
      //   ],
      // })
      //this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
    //}
   

    componentDidMount() {
      this.props.navigation.setOptions({title: this.props.route.params.name})
      this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
        });
       
      });
    }

    //adding message bubbles
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#000'
            },
            left: {
              backgroundColor: '#e2bff5'
            }
          }}
        />
      )
    }
    //adding onSend to get the message to be sent upon clicking "Send"
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      ()=> {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt,
          user: this.state.user,
        })
      })
    }


    componentWillUnmount() {
      this.unsubscribe();
   }

  render() {
    return (
      //adding View to wrap one component within another component along with text element and adding GiftedChat and KeyboardAvoidingView for Android
      <View style={{flex:1, backgroundColor: this.props.route.params.bgColor }}>
        <GiftedChat
           renderBubble={this.renderBubble.bind(this)}
           renderUsernameOnMessage={true}
           renderSystemMessage={(props)=><SystemMessage
            {...props}/>}
           messages={this.state.messages}
           onSend={messages => this.onSend(messages)}
             user={{
                  _id: Math.random(),
                  name: this.props.route.params.name,
                  avatar: "https://placeimg.com/140/140/any",
                  }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
 
      </View>
    )
  }
}
