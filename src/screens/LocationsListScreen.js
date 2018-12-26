import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import Actions from '../state/Actions';
import LocationsList from '../components/LocationsList';
import LocationsSectionList from '../components/LocationsSectionList';
import Layout from '../constants/Layout';
import * as locationsSelectors from '../state/LocationsReducer';

import { DropdownArrow, AddButton, EditButton, DeleteButton  } from '../components/Buttons'

class LocationsListScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  state = {
    menuValue: new Animated.Value(0),
    selectedOption: 'latest',
  };

  render() {
    let { selectedOption } = this.state;
    let defaultLocationsProps = {
      key: 'locations',
      setRef: view => {
        this._locationsList = view;
      },
      contentContainerStyle: { paddingTop: Layout.HEADER_HEIGHT },
    };

    return (
      <View style={styles.container}>
        {selectedOption === 'latest' && <LocationsList {...defaultLocationsProps} latest />}
        {selectedOption === 'asc' && <LocationsList {...defaultLocationsProps} asc />}
        {selectedOption === 'desc' && <LocationsList {...defaultLocationsProps} desc />}
        {selectedOption === 'grouped' && <LocationsSectionList {...defaultLocationsProps} grouped />}
        {this._renderNavigationBar()}
        {this._renderMenu()}
      </View>
    );
  }

  openMenu = () => {
    this.menu.open();
  }

  onRef = r => {
    this.menu = r;
  }

  _renderMenu() {
    let translateY = this.state.menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0],
    });

    return (
      <Animated.View style={[styles.menu, { transform: [{ translateY }] }]}>
          <Menu
            rendererProps={{ anchorStyle: styles.anchorStyle }}
            style={{ height: 300 }}
            ref={this.onRef}
            renderer={renderers.SlideInMenu}
          >
            <MenuTrigger text='Select action' />
            <MenuOptions style={styles.menuModal}>
            <MenuOption onSelect={() => this.setState({ selectedOption: 'latest'})} value='latest' >
              <Text>Latest</Text>
            </MenuOption>
              <MenuOption onSelect={() => this.setState({ selectedOption: 'asc'})} value='asc' >
                <Text>Asc</Text>
              </MenuOption>
              <MenuOption onSelect={() => this.setState({ selectedOption: 'desc'})} value='desc' >
                <Text>Desc</Text>
              </MenuOption>
              <MenuOption onSelect={() => this.setState({ selectedOption: 'grouped'})} value='grouped' >
                <Text>Grouped</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        
      </Animated.View>
    );
  }

  _navigationBarAnimatedStyles = {};

  _renderNavigationBar() {
    let { menuValue } = this.state;
    let { selectedLocationsIdArray } = this.props;

    let arrowRotation = menuValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '-90deg'],
    });
    return (
      <View key="navbar" style={styles.navigationBarContainer}>
        <View style={styles.navigationBarTitleContainer}>
          <TouchableWithoutFeedback
            hitSlop={{ left: 40, top: 30, right: 40, bottom: 10 }}
            onPress={() => this.openMenu()}
          >
            <View style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.navigationBarTitle}>
                Locations
              </Text>

              <Animated.View
                style={{
                  marginLeft: 12,
                  transform: [{ rotate: arrowRotation }],
                }}>
                <DropdownArrow />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.navigationBarAddButton}>
          <TouchableHighlight 
            onPress={this._handlePressAddLocation}
          >
            <AddButton />
          </TouchableHighlight>
        </View>
        <View style={styles.navigationBarEditButton}>
          <TouchableHighlight 
            onPress={this._handlePressUpdateLocation}
            disabled={selectedLocationsIdArray.length !== 1}
          >
            <EditButton disabled={selectedLocationsIdArray.length !== 1} />
          </TouchableHighlight>
        </View>
        <View style={styles.navigationBarDeleteButton}>
          <TouchableHighlight onPress={this._handlePressDeleteLocations} disabled={selectedLocationsIdArray.length === 0}>
            <DeleteButton disabled={selectedLocationsIdArray.length === 0} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _handlePressAddLocation = () => {
    this.props.navigation.navigate('locationForm', { type: 'add'});
  };

  _handlePressUpdateLocation = () => {
    let { selectedLocationsIdArray } = this.props;
    this.props.navigation.navigate('locationForm', { type: 'edit', itemId: selectedLocationsIdArray.toString()});
  };

  _handlePressDeleteLocations = () => {
    let { selectedLocationsIdArray } = this.props;
    this.props.dispatch(Actions.deleteLocationsAsync(selectedLocationsIdArray));
  };

}

const mapStateToProps = (state) => {
  return { 
    locations: state.locations,
    selectedLocationsIdArray: locationsSelectors.getSelectedLocationsIdArray(state)
  }; 
}

export default compose(withNavigation, connect(mapStateToProps))(LocationsListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center'
  },
  navigationBarTitleContainer: {
    flex: 2/5,
    // flexDirection: 'row',
    paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
    // justifyContent: 'flex-start',
    // alignSelf: 'stretch'
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
    flex: 1,
  },
  navigationBarEditButton: {
    position: 'absolute',
    top: 0,
    right: 85,
    bottom: 0,
    // top: Constants.statusBarHeight,
    justifyContent: 'center',
    flex: 1,
  },
  navigationBarDeleteButton: {
    position: 'absolute',
    top: 0,
    right: 25,
    bottom: 0,
    // top: Constants.statusBarHeight,
    justifyContent: 'center',
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  menuModal: {
    // ...StyleSheet.absoluteFillObject,
    // top: Layout.HEADER_HEIGHT,
    // backgroundColor: 'red',
    overflow: 'hidden',
    height: 300,
    // width: 300,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.window.width,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
});
