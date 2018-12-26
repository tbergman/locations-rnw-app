import React from 'react';
import {
  InteractionManager,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';

import MapView from '../lib/react-native-maps';
import Layout from '../constants/Layout';
import { ArrowRight  } from '../components/Buttons'

export class MapCard extends React.Component {
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

  render() {
    let { name } = this.props.location;

    return (
      <View style={[styles.card, styles.mapContainer]}>
        {this._maybeRenderMap()}
        {this._maybeRenderOverlay()}
        <TouchableHighlight
          onPress={this.props.onPress}
        >
          <View style={styles.cardAction}>
            <View style={styles.cardActionLabel}>
              <Text style={styles.cardActionText}>
                {name}
              </Text>
            </View>
            <View style={styles.arrowBtn}>
              <ArrowRight map />
            </View>
          </View>
        </TouchableHighlight>
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
    let { name, latitude, longitude } = this.props.location;

    return (
      <View pointerEvents='none'>
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

const styles = StyleSheet.create({
  map: {
    height: 150,
    width: Layout.window.width,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
    // backgroundColor: '#444',
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
    // color: '#313131',
    color: 'red',
  },
  cardAction: {
    paddingVertical: 8,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardActionLabel: {
    // flex: 2 / 5,
    paddingHorizontal: 12,
  },
  cardText: {
    fontSize: 14,
    // color: '#424242',
    color: 'red',
  },
  cardActionText: {
    fontSize: 13,
    color: 'red',
    // color: '#424242',
  },
  cardActionSubtitleText: {
    fontSize: 12,
    marginTop: -1,
    color: '#9E9E9E',
  },
  mapContainer: {
    marginTop: 15,
  },
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
  arrowBtn: {
    // flex:1,
  }
});
