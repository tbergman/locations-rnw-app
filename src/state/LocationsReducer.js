import _ from 'lodash';
import ActionTypes from './ActionTypes';

const initialState = {
  locations: {}
}

class LocationsReducer {
  static reduce(state = initialState.locations, action) {
    if (LocationsReducer[action.type]) {
      return LocationsReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_LOCATIONS](state, action) {
    return {...state, ...action.locations};
  }

  static [ActionTypes.SAVE_LOCATION](state, action) {
    let { location } = action
    let newLocationObj = {}
    newLocationObj[location.id] = {...location, selected: false }
    return {...state, ...newLocationObj };
  }

  static [ActionTypes.SET_SELECTED_LOCATION](state, action) {
    let updatedLocations = {...state}
    updatedLocations[action.id].selected = !updatedLocations[action.id].selected
    return updatedLocations
  }
  
  static [ActionTypes.DELETE_LOCATIONS](state, action) {
    let newState = _.omit(state, action.ids);
    return {...newState}
  }

  static [ActionTypes.ADD_LOCATION_COORDINATES](state, action) {
    return {...state, latLng: action.latLngArr}
  }
}

export default LocationsReducer.reduce



// SELECTORS

export function getLocationsWithCategory(state) {
  if (_.isEmpty(state.locations)) return []
  return Object.entries(state.locations).filter(item => item[1].category !== undefined).map(item => item[1])
}

// Group by category - according to SectionList format
export function getLocationsGroupedByCategory(state) {
  if (_.isEmpty(state.locations)) return []

  let groupedByCategories = _(Object.entries(state.locations).filter(l => l[1].category !== undefined).map(l => l[1])).groupBy(l => l.category).value()

  let dataForDisplay = Object.entries(groupedByCategories).reduce((acc, ctg) => {
    return acc.concat(
      {
       'title': ctg[0], 
       'data': ctg[1]
      })
    },[])

  return dataForDisplay
}

// Selected locations ids
export function getSelectedLocationsIdArray(state) {
  return _.keys(_.pickBy(state.locations, (location) => location.selected));  
}

export function getSortedLocationsAsc(state) {
  return _.orderBy(getLocationsWithCategory(state), location => location.name, 'asc' )
}

export function getSortedLocationsDesc(state) {
  return _.orderBy(getLocationsWithCategory(state), location => location.name, 'desc' )
}