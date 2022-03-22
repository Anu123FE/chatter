import React from "react";
// import the screens
import Start from "./src/Start";
import Chat from "./src/Chat";

// import react native gesture handler
import "react-native-gesture-handler";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import TextInput and TouchableOpacity for swatches
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

//importing firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class App extends React.Component {
  render() {
    
    // Create the navigator
    const Stack = createStackNavigator();
    return (

      //adding the list of stack screens within Stack.Navigator with each screen needing atleast 2 props-component and name
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ title: "Welcome to Chatter!" }}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}