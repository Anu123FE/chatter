import React, { Component } from 'react';

//import features from react-native
import { ImageBackground, StyleSheet, View, Text, TextInput, Button, Alert, Pressable } from 'react-native';

// import TouchableOpacity feature
import { TouchableOpacity } from 'react-native-gesture-handler';
import bgImage from "../assets/images/bg.jpeg";

export default class Start extends React.Component {

  //creating state object in the class constructor
 constructor(props) {
   super(props);
   this.state = { text: '', bgColor: '' };
 }

 alertMyText (input) {
  Alert.alert(input.text);
}

//adding colors for the Chat screen
colors = {
  orange: "#f44336",
  magenta: "#e91e63",
  fucsia: "#9c27b0",
  purple: "#673ab7",
};

 render() {
   return (

    //adding background image and text element under TextInput component to display user's text input
    //Also using View to wrap one component within another component
    //TouchableOpacity is used with onPress event to set states for chatscreen to different color swatches
    <View >
    <ImageBackground
     source={bgImage}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <Text style={styles.h1}>Texter</Text>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.name}
          placeholder="Your Name"
        />
        <View style={styles.colorSwatch}>
          <Text style={styles.subtitle}>Choose Background Color</Text>
          <View style={styles.swatches}>
            <TouchableOpacity
             onPress={() => this.setState({
               bgColor: this.colors.orange
             })}>
            <View style={styles.swatch1}></View>
            </TouchableOpacity>
           
            <TouchableOpacity
             onPress={() => this.setState({
               bgColor: this.colors.magenta
             })}>
            <View style={styles.swatch2}></View>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={() => this.setState({
               bgColor: this.colors.fucsia
             })}>
            <View style={styles.swatch3}></View>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={() => this.setState({
               bgColor: this.colors.purple
             })}>
            <View style={styles.swatch4}></View>
            </TouchableOpacity>

            </View>
        </View>
        <Button
        //adding onPress (callback function when user presses the button), title and styling to button
          style={styles.btn}
          title="Start Chatting"
          color={"#6705e9"}
          containerViewStyle={{ width: "100%", marginLeft: 0 }}
          onPress={() => this.props.navigation.navigate('Chat', {
            name: this.state.text,
            bgColor: this.state.bgColor
          })}
        />

{/* <Pressable
          style={styles.btn}
          // title="Start Chatting"
          // color={"#6705e9"}
          // containerViewStyle={{ width: "100%", marginLeft: 0 }}
          onPress={() => this.props.navigation.navigate('Chat', {
            name: this.state.text
          })}
        >
          <Text>Start Chatting</Text>
          </Pressable> */}

      </View>
    </ImageBackground>
  </View>
     
   );
   
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#151617",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bgImage: {
     resizeMode: 'cover', 
     width: '100%', 
     height: '100%',
     alignItems: 'center',
  },
  h1: {
    flexGrow: 1,
    flexShrink: 1,
    fontWeight: "800",
    color: "transparent",
    paddingTop: 60,
  },
  box: {
    backgroundColor: "#ffffffc4",
    flexGrow: 1,
    flexShrink: 0,
    width: "88%",
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 30,
    height: 260,
    minHeight: 260,
    maxHeight: 290,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    height: 50,
    maxHeight: 50,
    borderColor: "gray",
    borderWidth: 1,
    width: "88%",
    padding: 5,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },
  btn: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 10,
  },
  colorSwatch: {
    flex: 1,
    padding: 20,
    marginTop: 5,
  },
  swatches: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  swatch1: {
    width: 40,
    height: 40,
    backgroundColor: "#f44336",
    borderRadius: 40,
  },
  swatch2: {
    width: 40,
    height: 40,
    backgroundColor: "#e91e63",
    borderRadius: 40,
  },
  swatch3: {
    width: 40,
    height: 40,
    backgroundColor: "#9c27b0",
    borderRadius: 40,
  },
  swatch4: {
    width: 40,
    height: 40,
    backgroundColor: "#673ab7",
    borderRadius: 40,
  },
});