import React from 'react';
import { View, Text, KeyboardAvoidingView  } from 'react-native';
//importing GiftedChat
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';
//importing Firestore
import firebase from 'firebase';
import 'firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
        uid: 0,
        user: {
          _id: "",
          name: "",
          avatar: "",
        },
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
          user: {
            _id: data.user._id,
            name: data.user.name,
            //avatar: data.user.avatar,
            avatar: "https://placeimg.com/140/140/any"
          },
          image: data.image || null,
          location: data.location || null,
        });
      });
      this.setState({
        messages,
      });
      console.log(this.state.messages)
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
            position={this.state.messages.filter(x=>x.user.name == this.props.route.params.name) ? 'right' : 'left'}
            // position={this.state.messages.filter(x=>x._id==this.props.route.params.name) ? 'right': 'left'}
            textStyle={{
                right: {
                    color: 'white',
                    fontSize: 15
                },
                left: {
                    color: 'black',
                    fontSize: 16
                },

            }}
            wrapperStyle={{
                   right: {
                   color: 'black',
                    backgroundColor: 'blue',
                    marginRight: 5,
                    marginVertical: 5
                },
                left: {
                    marginVertical: 5
                },
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
        console.log(message)
        this.referenceChatMessages.add({
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt,
          user: {
            _id: Math.random(),
            avatar: 'https://placeimg.com/140/140/any',
            name: this.props.route.params.name
          },
        })
      })
    }


    componentWillUnmount() {
      console.log(this.state.messages)
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
