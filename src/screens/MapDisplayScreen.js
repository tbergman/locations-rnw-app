import React from 'react';
import { View, Animated, StyleSheet, InteractionManager } from 'react-native';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { withNavigation, HeaderBackButton } from 'react-navigation';

import MapView from '../lib/react-native-maps';
import Layout from '../constants/Layout';

class MapDisplayScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  state = {
    shouldRenderMap: false,
    shouldRenderOverlay: true,
  };

  componentDidMount() {
    this._isMounted = true;

    InteractionManager.runAfterInteractions(() => {
      this._isMounted && this.setState({ shouldRenderMap: true });
      setTimeout(() => {
        this._isMounted && this.setState({ shouldRenderOverlay: false });
      }, 700);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _renderNavigationBar() {
    return (
      <Animated.View style={[styles.navigationBar]}>
        <View style={[styles.navigationBarAction, { marginLeft: -5 }]}>
          <HeaderBackButton
            onPress={() => this.props.navigation.goBack()}
            title={null}
            style={[styles.navigationBarBackButton]}
          />
        </View>
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={[styles.card, styles.mapContainer]}>
      {this._renderNavigationBar()}
      {this._maybeRenderMap()}
      {this._maybeRenderOverlay()}
      </View>
    );
  }

  _maybeRenderOverlay() {
    if (!this.state.shouldRenderOverlay) {
      return;
    }

    if (this.state.shouldRenderMap) {
      return (
        <View
          style={[
            styles.map,
            {
              backgroundColor: '#f9f5ed',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            },
          ]}
        />
      );
    } else {
      return <View style={[styles.map, { backgroundColor: '#f9f5ed' }]} />;
    }
  }

  _maybeRenderMap() {
    if (!this.state.shouldRenderMap) {
      return;
    }
    let locationId = this.props.navigation.state.params.locationId;
    let location = this.props.locations[locationId]
    let { name, latitude, longitude } = location;

    return (
      <View>
        <MapView
          style={styles.map}
          region={{
            latitude : parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          >
          <MapView.Marker
            coordinate={{ latitude : parseFloat(latitude), longitude: parseFloat(longitude) }} title={name} 
          />
        </MapView>
      </View>
    );
  }
  
}

const mapStateToProps = (state) => {
  return { 
    locations: state.locations,
  }; 
}

export default compose(withNavigation, connect(mapStateToProps))(MapDisplayScreen);

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
  },
  navigationBarTitleContainer: {
    flex: 1,
    flexGrow: 1,
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
  navigationBarAddButton: {
    position: 'absolute',
    top: 0,
    right: 145,
    bottom: 0,
    // top: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  cardAction: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionLabel: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#424242',
  },
  cardActionText: {
    fontSize: 13,
    color: '#424242',
  },
  cardActionSubtitleText: {
    fontSize: 12,
    marginTop: -1,
    color: '#9E9E9E',
  },
  // mapContainer: {
  //   marginTop: 15,
  // },
  imageLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 125,
    marginVertical: 10,
  },
  instagramImage: {
    width: 125,
    height: 125,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  summaryContainer: {
    marginTop: 15,
  },
  visitedCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 9,
  },
  visitedCardText: {
    color: '#888',
    marginLeft: 5,
    marginBottom: 1,
  },
  navigationBar: {
    // backgroundColor: 'red',
    backgroundColor: '#FAFAFA',
    // position: 'absolute',
    // zIndex: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});

