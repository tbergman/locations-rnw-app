import _ from 'lodash';

import ActionTypes from './ActionTypes';

class CategoriesReducer {
  static reduce(state = {}, action) {
    if (CategoriesReducer[action.type]) {
      return CategoriesReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_CATEGORIES](state, action) {
    return Object.assign({}, state, action.categories);
  }

  static [ActionTypes.SET_SELECTED_CATEGORY](state, action) {
    let updatedCategories = {...state}
    updatedCategories[action.id].selected = !updatedCategories[action.id].selected

    return updatedCategories
  }

  static [ActionTypes.SET_CATEGORY](state, action) {
    let { name, id } = action.category
    let newCategoryObj = {}
    newCategoryObj[id] = {id: id, name: name, selected: false }

    return {...state, ...newCategoryObj };
  }
  static [ActionTypes.EDIT_CATEGORY](state, action) {

  }
  static [ActionTypes.DELETE_CATEGORIES_FROM_STATE](state, action) {
    let newState = _.omit(state, action.ids);

    return {...newState}
  }
}

export default CategoriesReducer.reduce


// SELECTORS

// Selector for selected categories ids
export function getSelectedCategoriesIdArray(state) {
  return _.keys(_.pickBy(state.categories, (category) => category.selected));  
}

export function getCategoriesNamesArray(state) {
  return Object.entries(state.categories).reduce((acc, item) => {
    return acc.concat(item[1].name)
  },[])
}

export function getSortedCategoriesNamesArray(state) {
  return Object.entries(state.categories).reduce((acc, item) => {
    return acc.concat(item[1].name)
  },[]).sort()
}