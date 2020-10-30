import {AddCategoryAction, DeleteCategoryAction, ModifyCategoryAction} from "../categoriesReducer";

export const addCategoryActionCreator:ActionCreator<AddCategoryAction> = (payload) => ({type: 'addCategory', payload})
export const deleteCategoryActionCreator:ActionCreator<DeleteCategoryAction> = (payload) => ({type: 'deleteCategory', payload})
export const modifyCategoryActionCreator:ActionCreator<ModifyCategoryAction> = (payload) => ({type: 'modifyCategory', payload})
