export default defineActionConstants([
  // Categories
  'SET_CATEGORIES',
  'DELETE_CATEGORIES',
  'DELETE_CATEGORIES_FROM_STATE',
  'SET_SELECTED_CATEGORY',
  'SET_CATEGORY',
  'ADD_CATEGORY',

  // Locations
  'SET_LOCATIONS',
  'ADD_LOCATION_COORDINATES',
  'SET_LOCATION_ASYNC',
  'SAVE_LOCATION',
  'SET_SELECTED_LOCATION',
  'DELETE_LOCATION_ASYNC',
  'DELETE_LOCATIONS',
  'DELETE_LOCATIONS_ASYNC',
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
