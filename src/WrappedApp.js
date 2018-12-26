import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Actions from './state/Actions';
import LocalStorage from './state/LocalStorage';
import RootNavigation from './navigation/RootNavigation';


class App extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount(){
    this._loadDataAndAssetsAsync()
  }
  
  _loadCacheAsync = async () => {
    // Get categories from LocalStorage and dispatch to store
    let categories = await LocalStorage.getCategories();
    this.props.dispatch(Actions.setCategories(categories));

    // Get locations from LocalStorage and dispatch to store
    let locations = await LocalStorage.getLocations();
    this.props.dispatch(Actions.setLocations(locations));
  };

  _loadDataAndAssetsAsync = async () => {
    return Promise.all([/*this._loadAssetsAsync(), */ this._loadCacheAsync()]);
  };

  render() {
    return (
      <View style={styles.container}>
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height
    // height: Dimensions.get('window').height - Header.HEIGHT
  },
});

export default connect()(App)