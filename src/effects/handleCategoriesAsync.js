import Actions from '../state/Actions';
import LocalStorage from '../state/LocalStorage';
import GenerateId from '../util/generateId'

export async function addCategory({ action, dispatch }) {
  let { category } = action;

  if (!category.id) {
    category.id = GenerateId()
  }

  let categoryWithId = {...category, 'id': category.id }

  await LocalStorage.saveCategory(categoryWithId);
  dispatch(Actions.setCategory(categoryWithId));
}

export async function updateCategory({action, dispatch}) {
  let { category } = action;

  await LocalStorage.saveCategory(category);
  dispatch(Actions.updateCategories(category));
}

export async function deleteCategories({action, dispatch}) {
  let { ids } = action;

  await LocalStorage.deleteCategories(ids);
  dispatch(Actions.deleteCategoriesFromState(ids));
}
