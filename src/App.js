// import { AppLoading, Font } from 'expo';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import Store from './state/Store';
import WrappedApp from './WrappedApp';


export default class AppContainer extends React.Component {
  render() {
    return (
        <ReduxProvider store={Store}>
          <MenuProvider>
            <WrappedApp {...this.props} />
          </MenuProvider>
        </ReduxProvider>
    );
  }
}
