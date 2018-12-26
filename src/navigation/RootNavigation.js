import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { capitalize } from 'lodash';

// Categories
import CategoriesListScreen from '../screens/CategoriesListScreen';
import CategoryFormScreen from '../screens/CategoryFormScreen';

// Locations
import LocationsListScreen from '../screens/LocationsListScreen';
import LocationFormScreen from '../screens/LocationFormScreen';
import MapScreen from '../screens/MapScreen';
import MapDisplayScreen from '../screens/MapDisplayScreen';
import LocationDetailsScreen from '../screens/LocationDetailsScreen';

import Colors from '../constants/Colors';
import { ListIcon  } from '../components/Buttons'

const LocationsStack = createStackNavigator(
  {
    locations: {
      screen: LocationsListScreen,
    },
    locationForm: {
      screen: LocationFormScreen,
    },
    locationDetails: {
      screen: LocationDetailsScreen,
    },
    Map: {
      screen: MapScreen,
    },
    MapDisplay: {
      screen: MapDisplayScreen,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

const CategoriesStack = createStackNavigator(
  {
    categories: {
      screen: CategoriesListScreen,
    },
    categoryForm: {
      screen: CategoryFormScreen,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

export default createBottomTabNavigator(
  {
    locations: {
      screen: LocationsStack,
    },
    categories: {
      screen: CategoriesStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let { routeName } = navigation.state;
      let tabBarLabel = capitalize(routeName);

      return {
        tabBarLabel,
        tabBarIcon: ({ focused }) => {
          return (
            <ListIcon
              size={22}
              style={{ marginBottom: 0 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          );
        },
      };
    },
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
  }
);