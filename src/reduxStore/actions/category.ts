import {ActionCreator, ADD_CATEGORY, DELETE_CATEGORY, MODIFY_CATEGORY} from "../constants/ActionTypes";

interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Omit<Category, "id">;
}
interface DeleteCategoryAction {
  type: typeof DELETE_CATEGORY;
  payload: Pick<Category, "id">;
}
interface ModifyCategoryAction {
  type: typeof MODIFY_CATEGORY;
  payload: Pick<Category, "id"> & Partial<Category>;
}

export type CategoryAction = AddCategoryAction | DeleteCategoryAction | ModifyCategoryAction

export const addCategory:ActionCreator<AddCategoryAction> = (payload) => ({type: ADD_CATEGORY, payload})
export const deleteCategory:ActionCreator<DeleteCategoryAction> = (payload) => ({type: DELETE_CATEGORY, payload})
export const modifyCategory:ActionCreator<ModifyCategoryAction> = (payload) => ({type: MODIFY_CATEGORY, payload})
