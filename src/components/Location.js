import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Layout from '../constants/Layout';
import { ArrowRight  } from '../components/Buttons'

export default class Location extends React.Component {

  _onPress = () => {
    this.props.onPressItem(this.props.location);
  };

  _onLongPress = () => {
    this.props.onLongPressItem(this.props.id);
  };

  render() {
    let { name, selected } = this.props.location;
    let textColor = selected ? "red" : "black";

    return (
      <TouchableHighlight
        onPress={this._onPress}
        onLongPress={this._onLongPress}
        delayPressIn={80}
        style={styles.container}
        underlayColor="#ccc">
        <View style={styles.containerWrapper}>
          <View style={styles.infoContainer}>
            <Text 
            style={{ color: textColor }}
            >{name}</Text>

            <Text style={styles.address}>
              {this._renderAddressText()}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <ArrowRight />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _renderAddressText() {
    let { address } = this.props.location;
    let addressText = address;
    return addressText;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width,
  },
  containerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 75,
    padding: 15,
    paddingBottom: 25,
  },
  name: {
    fontSize: 16,
  },
  address: {
    fontSize: 12,
  },
  buttonContainer: {
    paddingRight: 5,
    alignSelf: 'center'
  },
});
