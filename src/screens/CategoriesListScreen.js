import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import { MdAdd, MdModeEdit, MdDelete } from "react-icons/md";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import Actions from '../state/Actions';
import CategoriesList from '../components/CategoriesList';
import Layout from '../constants/Layout';
import * as categoriesSelectors from '../state/CategoriesReducer';

class AddButton extends React.Component {
  setNativeProps(nativeProps) {
    this._addBtn.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._addBtn = component}>
        <MdAdd size={22}/>
      </View>
    )
  }
}

class EditButton extends React.PureComponent {

  setNativeProps(nativeProps) {
    this._editBtn.setNativeProps(nativeProps)
  }
  render() {
    return (
      <View ref={component => this._editBtn = component}>
        <MdModeEdit
          size={22}
          style={{color: this.props.disabled ? 'gray' : 'red'}}
        />
      </View>
    )
  }
}

class DeleteButton extends React.Component {
  setNativeProps(nativeProps) {
    this._deleteBtn.setNativeProps(nativeProps)
  }
  render() {
    return (
      <View ref={component => this._deleteBtn = component}>
        <MdDelete size={22} style={{color: this.props.disabled ? 'gray' : 'red'}}/>
      </View>
    )
  }
}


class CategoriesListScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  state = {
    menuValue: new Animated.Value(0),
  };

  render() {
    let defaultLocationsProps = {
      key: 'categories',
      setRef: view => {
        this._categoriesList = view;
      },
      contentContainerStyle: { paddingTop: Layout.HEADER_HEIGHT },
    };

    return (
      <View style={styles.container}>
        <CategoriesList {...defaultLocationsProps} />
        {this._renderNavigationBar()}
      </View>
    );
  }

  _navigationBarAnimatedStyles = {};

  _renderNavigationBar() {
    let { selectedCategoriesIdArray } = this.props;

    return (
      <View key="navbar" style={styles.navigationBarContainer}>
        <View style={styles.navigationBarTitleContainer}>
          <TouchableWithoutFeedback
            hitSlop={{ left: 40, top: 30, right: 40, bottom: 10 }}
          >
            <View style={{ flexDirection: 'row', flexGrow: 1 }}>
              <Text style={styles.navigationBarTitle}>
                Categories
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.navigationBarAddButton}>
          <TouchableHighlight 
            onPress={this._handlePressAddCategory}
          >
            <AddButton />
          </TouchableHighlight>
        </View>
        <View style={styles.navigationBarEditButton}>
          <TouchableHighlight 
            onPress={this._handlePressUpdateCategory}
            disabled={selectedCategoriesIdArray.length !== 1}
          >
            <EditButton disabled={selectedCategoriesIdArray.length !== 1} />
          </TouchableHighlight>
        </View>
        <View style={styles.navigationBarDeleteButton}>
          <TouchableHighlight onPress={this._handlePressDeleteCategory} disabled={selectedCategoriesIdArray.length === 0}>
            <DeleteButton disabled={selectedCategoriesIdArray.length === 0} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _handlePressAddCategory = () => {
    this.props.navigation.navigate('categoryForm', { type: 'add'});
  };

  _handlePressUpdateCategory = () => {
    let { selectedCategoriesIdArray } = this.props;
    this.props.navigation.navigate('categoryForm', { type: 'edit', itemId: selectedCategoriesIdArray.toString()});
  };

  _handlePressDeleteCategory = () => {
    let { selectedCategoriesIdArray } = this.props;
    this.props.dispatch(Actions.deleteCategories(selectedCategoriesIdArray));
  };

}

const mapStateToProps = (state) => {
  return { 
    categories: state.categories,
    selectedCategoriesIdArray: categoriesSelectors.getSelectedCategoriesIdArray(state)
  }; 
}
export default compose(withNavigation, connect(mapStateToProps))(CategoriesListScreen);

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
  navigationBarEditButton: {
    position: 'absolute',
    top: 0,
    right: 85,
    bottom: 0,
    // top: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  navigationBarDeleteButton: {
    position: 'absolute',
    top: 0,
    right: 25,
    bottom: 0,
    // top: Constants.statusBarHeight,
    justifyContent: 'center',
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
  addLocationModal: {
    top: 100,
    width: 200,
    backgroundColor: 'gray',
    // overflow: 'hidden',
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
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

