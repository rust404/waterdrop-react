import {AddCategoryAction, DeleteCategoryAction, ModifyCategoryAction} from "../categoriesReducer";

export const addCategory:ActionCreator<AddCategoryAction> = (payload) => ({type: 'addCategory', payload})
export const deleteCategory:ActionCreator<DeleteCategoryAction> = (payload) => ({type: 'deleteCategory', payload})
export const modifyCategory:ActionCreator<ModifyCategoryAction> = (payload) => ({type: 'modifyCategory', payload})
