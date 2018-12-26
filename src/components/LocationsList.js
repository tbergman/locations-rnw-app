import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Vibration,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import isEqual from "react-fast-compare";

import Location from './Location';
import Actions from '../state/Actions';
import * as locationsSelectors from '../state/LocationsReducer';

class LocationsList extends React.Component {
  static getDataProps(data, props) {
    if (props.latest) {
      return locationsSelectors.getLocationsWithCategory(data)
    } else if (props.asc) {
      return locationsSelectors.getSortedLocationsAsc(data)
    } else if (props.desc) {
      return locationsSelectors.getSortedLocationsDesc(data)
    } else {
      return locationsSelectors.getLocationsWithCategory(data)
    }
  }

  state = {
    renderContents: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.setRef && this.props.setRef(this);
    setTimeout(() => {
      this._isMounted && this.setState({ renderContents: true });
    }, 100);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    this.props.setRef && this.props.setRef(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(nextProps.locations, this.props.locations) ||
      nextProps.selectedLocationsIdArray.length !== this.props.selectedLocationsIdArray.length ||
      nextState.renderContents !== this.state.renderContents
    );
  }

  scrollTo(opts) {
    this._scrollView._component.scrollTo(opts);
  }

  _keyExtractor = item => item.id;

  render() {
    let { locations } = this.props

    return (
      <View onLayout={this.props.onLayout} style={styles.container}>

        {this.state.renderContents ? (
          <FlatList
            ref={view => {
              this._scrollView = view;
            }}
            contentContainerStyle={this.props.contentContainerStyle}
            renderItem={this._renderItem}
            style={styles.container}
            data={locations}
            keyExtractor={this._keyExtractor}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 75,
            }}>
            <ActivityIndicator />
          </View>
        )}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <Location
        id={item.id}
        onPressItem={this._onPressItem}
        onLongPressItem={this._onLongPressItem}
        location={item}
      />
    );
  }

  // Navigate to Location screen + map
  _onPressItem = location => {
    this.props.navigation.navigate('locationDetails', { locationId: location.id });
  };

  // Set selected item
  _onLongPressItem = id => {
    Vibration.vibrate()
    this.props.dispatch(Actions.toggleSelectedLocation(id));
};
}

const mapStateToProps = (state, props) => {
  return { 
    locations: LocationsList.getDataProps(state, props),
    selectedLocationsIdArray: locationsSelectors.getSelectedLocationsIdArray(state),
  }; 
}

export default compose(withNavigation, connect(mapStateToProps))(LocationsList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
