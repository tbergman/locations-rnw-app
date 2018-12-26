import Actions from '../state/Actions';
import LocalStorage from '../state/LocalStorage';
import GenerateId from '../util/generateId'

export async function setLocationAsync({ action, dispatch }) {
  let { location } = action;
  if (!location.id) {
    location.id = GenerateId()
  }
  let locationWithId = {...location, 'id': location.id }

  await LocalStorage.saveLocation(locationWithId);
  dispatch(Actions.saveLocation(locationWithId));
}

export async function deleteLocationsAsync({action, dispatch}) {
  let { ids } = action;

  await LocalStorage.deleteLocations(ids);
  dispatch(Actions.deleteLocations(ids));
}
