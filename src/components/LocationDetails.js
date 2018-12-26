import React from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { withNavigation, HeaderBackButton } from 'react-navigation';

import {
  MapCard,
} from './DetailCards';
import Layout from '../constants/Layout';

class LocationDetails extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
  };

  render() {
    let { location } = this.props;
    let { scrollY } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: -50 }}>
          {this._renderHeroHeader()}

          <Animated.ScrollView
            scrollEventThrottle={16}
            style={StyleSheet.absoluteFill}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              // { useNativeDriver: true }
            )}>
            <View style={styles.heroSpacer} />

            <View style={styles.contentContainerStyle}>
              <MapCard
                location={location}
                onPress={this._handlePressMap}
              />
            </View>
          </Animated.ScrollView>
        </View>
        {this._renderNavigationBar()}

        <StatusBar barStyle={styles.barStyle} />
      </View>
    );
  }

  _renderHeroHeader() {
    let { scrollY } = this.state;

    let heroBackgroundTranslateY = scrollY.interpolate({
      inputRange: [-1, 0, 200, 201],
      outputRange: [0, 0, -400, -400],
    });

    let gradientTranslateY = scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, -1],
    });
    return (
      <View>
        <Animated.View
          style={[
            styles.heroBackground,
            {
              transform: [{ translateY: heroBackgroundTranslateY }],
            },
          ]}
        />

        <View style={styles.hero}>
          <Animated.View
            style={[
              styles.heroBottomGradientContainer,
              { transform: [{ translateY: gradientTranslateY }] },
            ]}>
          </Animated.View>
        </View>
      </View>
    );
  }

  _renderNavigationBar() {
    return (
      <Animated.View style={[styles.navigationBar]}>
        <View style={[styles.navigationBarAction, { marginLeft: -5 }]}>
          <HeaderBackButton
            onPress={() => this.props.navigation.goBack()}
            title={null}
          />
        </View>

        <View style={styles.navigationBarTitle}>
          {this._renderNavigationBarTitle()}
        </View>
      </Animated.View>
    );
  }

  _renderNavigationBarTitle() {
    let {
      name,
      address,
      category,
      latitude,
      longitude,
    } = this.props.location;

    let { scrollY } = this.state;

    let titleTranslateY = scrollY.interpolate({
      inputRange: [-1, 0, 300, 301],
      outputRange: [0, 0, 3, 3],
    });

    let subtitleScale = scrollY.interpolate({
      inputRange: [-1, 0, 300, 301],
      outputRange: [1, 1, 0.75, 0.75],
    });

    let subtitleTranslateY = scrollY.interpolate({
      inputRange: [-1, 0, 300, 301],
      outputRange: [-10, -10, -1, -1],
    });

    return (
      <View>
        <Animated.View
          style={{
            top: 20,
            transform: [{ translateY: titleTranslateY }],
          }}>
          <Text
            style={[styles.navigationBarTitleText]}>
            {name}
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            top: 35,
            backgroundColor: 'transparent',
            
            transform: [
              { scale: subtitleScale },
              { translateY: subtitleTranslateY },
            ],
          }}>
          <Text
            style={[styles.navigationBarTitleText]}>
            {`Address: ${address}`}
          </Text>
          <Text
          style={[styles.navigationBarTitleText]}>
          {`Category: ${category}`}
        </Text>
        <Text
          style={[styles.navigationBarTitleText]}
        >
          {`Coordinates: ${latitude}, ${longitude}`}
        </Text>
        </Animated.View>
      </View>
    );
  }

  _handlePressMap = () => {
    this.props.navigation.navigate('MapDisplay', {
      locationId: this.props.location.id,
    })
  }
}

export default withNavigation(LocationDetails);

const HeroHeight = 165;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainerStyle: {
    paddingBottom: 20,
    backgroundColor: '#FAFAFA',
    minHeight: Layout.window.height - HeroHeight,
  },
  heroSpacer: {
    // marginTop:50,
    width: Layout.window.width,
    height: HeroHeight,
    backgroundColor: 'transparent',
  },
  heroImage: {
    width: 210,
    height: 190,
    marginTop: 80,
  },
  heroBackground: {
    height: HeroHeight + 250,
  },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HeroHeight,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBottomGradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navigationBarTitleText: {
    color: 'black',
    textAlign: 'center',
    // marginBottom: 8,
  },
  navigationBarAction: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBarTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBarShadowContainer: {
    position: 'absolute',
    top: Layout.HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: 15,
    bottom: 0,
  },
  navigationBarShadow: {
    height: 15,
    width: Layout.window.width,
  },
  navigationBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Layout.HEADER_HEIGHT,
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 5,
  },
});