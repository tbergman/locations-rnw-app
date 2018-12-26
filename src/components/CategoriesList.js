import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import isEqual from "react-fast-compare";

import Category from './Category';
import Actions from '../state/Actions';

import * as categoriesSelectors from '../state/CategoriesReducer';

class CategoriesList extends React.Component {
  static prepareData(data) {
    if (!data) return []
    return Object.entries(data).map(category => category[1])
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
      !isEqual(nextProps.categories, this.props.categories) ||
      nextProps.selectedCategoriesIdArray.length !== this.props.selectedCategoriesIdArray.length ||
      nextState.renderContents !== this.state.renderContents
    );
  }

  scrollTo(opts) {
    this._scrollView._component.scrollTo(opts);
  }

  _keyExtractor = item => item.id;

  render() {
    if (!this.props.categories) return null
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
            data={CategoriesList.prepareData(this.props.categories)}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
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
      <Category
        id={item.id}
        onPressItem={this._onPressItem}
        category={item}
      />
    );
  }

  _onPressItem = id => {
    this.props.dispatch(Actions.toggleSelectedCategory(id));
  };
}

const mapStateToProps = (state) => {
  return { 
    categories: state.categories,
    selectedCategoriesIdArray: categoriesSelectors.getSelectedCategoriesIdArray(state)
  }; 
}

export default connect(mapStateToProps)(CategoriesList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
