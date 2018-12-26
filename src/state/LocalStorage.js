import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const Keys = {
  Categories: 'Categories',
  Locations: 'Locations',
};

async function getCategories() {
  let results = await AsyncStorage.getItem(Keys.Categories);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

async function saveCategory(location) {
  let results = await AsyncStorage.getItem(Keys.Categories);
  results = results ? JSON.parse(results) : {};
  
  let newLocationObj = {}
  newLocationObj[location.id] = {id: location.id, name: location.name }

  try {
    return AsyncStorage.setItem(Keys.Categories, JSON.stringify({...results, ...newLocationObj }));
  } catch(e) {
    console.log('Category was not saved -> error:', e);
  }
}

async function deleteCategories(ids) {
  let currCategories = await AsyncStorage.getItem(Keys.Categories);
  currCategories = currCategories ? JSON.parse(currCategories) : {}
  let nextCategories = _.omit(currCategories, ids);

  try {
    return AsyncStorage.setItem(Keys.Categories, JSON.stringify({...nextCategories }));
  } catch(e) {
    console.log('Categories were not deleted - see error:', e);
  }
}

async function getLocations() {
  let results = await AsyncStorage.getItem(Keys.Locations);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

// For adding and updating 
async function saveLocation(location) {
  let results = await AsyncStorage.getItem(Keys.Locations);
  results = results ? JSON.parse(results) : {};
  
  let newLocationObj = {}
  newLocationObj[location.id] = {id: location.id, name: location.name, address: location.address, latitude: location.latitude, longitude: location.longitude, category: location.category }

  try {
    return AsyncStorage.setItem(Keys.Locations, JSON.stringify({...results, ...newLocationObj }));
  } catch(e) {
    console.log('Location was not saved - see error:', e);
  }
}

async function deleteLocations(ids) {
  let currLocations = await AsyncStorage.getItem(Keys.Locations);
  currLocations = currLocations ? JSON.parse(currLocations) : {}
  let nextLocations = _.omit(currLocations, ids);


  try {
    return AsyncStorage.setItem(Keys.Locations, JSON.stringify({...nextLocations }));
  } catch(e) {
    console.log('Locations were not deleted - see error:', e);
  }
}

export default {
  getCategories,
  saveCategory,
  deleteCategories,
  getLocations,
  saveLocation,
  deleteLocations,
};
