import React from 'react';
import {
  ActivityIndicator,
  SectionList,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import isEqual from "react-fast-compare";

import Location from './Location';
import Actions from '../state/Actions';

import * as locationsSelectors from '../state/LocationsReducer';

class LocationsSectionList extends React.Component {

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
    let { locationsGroupedByCategory } = this.props

    return (
      <View onLayout={this.props.onLayout} style={styles.container}>
      {this.state.renderContents ? (
        <SectionList
          renderItem={this._renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          sections={locationsGroupedByCategory}
          keyExtractor={(item, index) => item + index}
          style={styles.container}
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
    )
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
    this.props.dispatch(Actions.toggleSelectedLocation(id));
};
}

const mapStateToProps = (state) => {
  return { 
    locations: locationsSelectors.getLocationsWithCategory(state),
    locationsGroupedByCategory: locationsSelectors.getLocationsGroupedByCategory(state),
    selectedLocationsIdArray: locationsSelectors.getSelectedLocationsIdArray(state),
  }; 
}

export default compose(withNavigation, connect(mapStateToProps))(LocationsSectionList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    top: 30,
  },
  sectionHeader: {
    fontWeight: 'bold',
    padding: 10,
    color: '#232',
    backgroundColor: '#ddd'
  }
});
