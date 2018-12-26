import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { effectsMiddleware } from 'redux-effex';

import LocationsReducer from './LocationsReducer';
import CategoriesReducer from './CategoriesReducer';
import Effects from '../effects';

export default createStore(
  combineReducers({
    locations: LocationsReducer,
    categories: CategoriesReducer,
  }),
  composeWithDevTools(applyMiddleware(effectsMiddleware(Effects))),
);