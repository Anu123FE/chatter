import React from "react";
import Start from "./src/Start";
// import Chat from "./src/Chat";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default class App extends React.Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ title: "Welcome to Chatter!" }}
          />
          {/* <Stack.Screen name="Chat" component={Chat} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}