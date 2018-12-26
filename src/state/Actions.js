import ActionTypes from './ActionTypes';

export default class Actions {

  static setLocations(locations) {
    return {
      type: ActionTypes.SET_LOCATIONS,
      locations,
    }
  }

  // For adding and updating location
  static setLocation(location) {
    return {
      type: ActionTypes.SET_LOCATION_ASYNC,
      location,
    }
  }

  static saveLocation(location) {
    return {
      type: ActionTypes.SAVE_LOCATION,
      location,
    }
  }

  static toggleSelectedLocation(id) {
    return {
      type: ActionTypes.SET_SELECTED_LOCATION,
      id,
    }
  }

  static setCategories(categories) {
    return {
      type: ActionTypes.SET_CATEGORIES,
      categories,
    }
  }

  static toggleSelectedCategory(id) {
    return {
      type: ActionTypes.SET_SELECTED_CATEGORY,
      id,
    }
  }

  static setCategory(category) {
    return {
      type: ActionTypes.SET_CATEGORY,
      category,
    }
  }

  // For adding and updating category
  static addCategory(category) {
    return {
      type: ActionTypes.ADD_CATEGORY,
      category,
    }
  }

  static deleteCategories(ids) {
    return {
      type: ActionTypes.DELETE_CATEGORIES,
      ids,
    }
  }

  static deleteCategoriesFromState(ids) {
    return {
      type: ActionTypes.DELETE_CATEGORIES_FROM_STATE,
      ids,
    }
  }

  static deleteLocationsAsync(ids) {
    return {
      type: ActionTypes.DELETE_LOCATIONS_ASYNC,
      ids,
    }
  }

  static deleteLocations(ids) {
    return {
      type: ActionTypes.DELETE_LOCATIONS,
      ids,
    }
  }

}

