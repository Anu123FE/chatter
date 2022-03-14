import React from 'react';
import { View, Text} from 'react-native';

export default class Chat extends React.Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.route.params.bgColor }}>
        <Text>Hello Chat! {this.props.route.params.name}</Text>
      </View>
    )
  }
}
