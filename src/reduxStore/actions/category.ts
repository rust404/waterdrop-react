import {ADD_CATEGORY, DELETE_CATEGORY, MODIFY_CATEGORY} from "../constants/ActionTypes";
import {Category} from "../index";

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

export const addCategoryActionCreator:ActionCreator<AddCategoryAction> = (payload) => ({type: ADD_CATEGORY, payload})
export const deleteCategoryActionCreator:ActionCreator<DeleteCategoryAction> = (payload) => ({type: DELETE_CATEGORY, payload})
export const modifyCategoryActionCreator:ActionCreator<ModifyCategoryAction> = (payload) => ({type: MODIFY_CATEGORY, payload})
