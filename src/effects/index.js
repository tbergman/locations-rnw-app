import ActionTypes from '../state/ActionTypes';
import { addCategory, deleteCategories } from './handleCategoriesAsync';
import { setLocationAsync, deleteLocationsAsync } from './handleLocationsAsync';

function genericErrorHandler({action, error}) {
  console.log({error, action});
}

export default [
  {action: ActionTypes.ADD_CATEGORY, effect: addCategory, error: genericErrorHandler},
  {action: ActionTypes.DELETE_CATEGORIES, effect: deleteCategories, error: genericErrorHandler},
  {action: ActionTypes.SET_LOCATION_ASYNC, effect: setLocationAsync, error: genericErrorHandler},
  {action: ActionTypes.DELETE_LOCATIONS_ASYNC, effect: deleteLocationsAsync, error: genericErrorHandler},
];
