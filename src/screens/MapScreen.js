import React from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';

import MapView from '../lib/react-native-maps';
import Layout from '../constants/Layout';
import { CheckButton  } from '../components/Buttons'

class MapScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  state = {
    latitude: null,
    longitude: null,
  };


  _handlePressAddLatLng = () => {
    let { latitude, longitude } = this.state
    this.props.navigation.navigate('locationForm',
     { updateLatLngFromMap: true, latitude, longitude });

  }

  _onSelectLocation = (obj) => {
    this.setState({latitude: obj.latLng.lat().toFixed(3), longitude: obj.latLng.lng().toFixed(3)})
  }

  _renderNavigationBar() {
    let { latitude, longitude } = this.state
    return (
      <View key="navbar" style={styles.navigationBarContainer}>
        <View style={styles.navigationBarTitleContainer}>
          <TouchableWithoutFeedback
            hitSlop={{ left: 40, top: 30, right: 40, bottom: 10 }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.navigationBarTitle}>
                Pick Coordinates
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.latLng}>
          {latitude && <Text style={{fontSize: 12, color: 'red'}}>Latitude: {latitude}</Text>}
          {longitude && <Text style={{fontSize: 12, color: 'red'}}>Longtitue: {longitude}</Text>}
        </View>
        <View style={styles.navigationBarAddButton}>
          {latitude && <TouchableHighlight 
            onPress={this._handlePressAddLatLng}
          >
            <CheckButton />
          </TouchableHighlight>}
        </View>
      </View>
    );
  }

  render() {
    return (
      <React.Fragment>
      {this._renderNavigationBar()}
      <View
        style={styles.map}
      >
        <MapView region={{ latitude: 32.072, longitude: 34.780 }} 
        onPress={this._onSelectLocation}
        >
          <MapView.Marker
            coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
          />
        </MapView>
        </View>
      </React.Fragment>
    );
  }
  
}

const mapStateToProps = (state) => {
  return { 
    locations: state.locations,
  }; 
}

export default compose(withNavigation, connect(mapStateToProps))(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',

    height: 400,
    width: 500,
    top: 50,
    zIndex: 10,
  },
  navigationBarContainer: {
    backgroundColor: '#fff',
    height: Layout.HEADER_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'absolute',
    overflow: 'hidden',
    // paddingTop: Constants.statusBarHeight,
    top: 0,
    left: 0,
    right: 0,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navigationBarTitleContainer: {
    flex: 1/2,
    // flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    // justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
    justifyContent: 'flex-start',
  },
  navigationBarTitle: {
    fontSize: 17,
    letterSpacing: -0.5,
  },
  latLng: {
    alignSelf: 'center',
    flex: 1,
    marginLeft: 25,
  },
  navigationBarAddButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    bottom: 0,
    // top: Constants.statusBarHeight,
    flex: 1,
    alignSelf: 'center',

  },
});

