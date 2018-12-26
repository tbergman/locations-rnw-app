import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Layout from '../constants/Layout';

export default class Category extends React.Component {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    let { name, selected } = this.props.category
    let textColor = selected ? "red" : "black";

    return (
      <TouchableHighlight
        onPress={this._onPress}
        delayPressIn={80}
        style={styles.container}
        fallback={TouchableHighlight}
        underlayColor="#ccc">

        <View style={styles.infoContainer}>
          <Text style={{ color: textColor }}>{name}</Text>
        </View>

      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 60,
    padding: 15,
  },
  name: {
    fontSize: 16,
    color: 'black'
  },
  buttonContainer: {
    paddingRight: 5,
  },
});
