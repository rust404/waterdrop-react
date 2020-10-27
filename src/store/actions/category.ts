import {IAddCategoryAction, IDeleteCategoryAction, IModifyCategoryAction} from "../categoryReducer";

export const addCategory:ActionCreator<IAddCategoryAction> = (payload) => ({type: 'addCategory', payload})
export const deleteCategory:ActionCreator<IDeleteCategoryAction> = (payload) => ({type: 'deleteCategory', payload})
export const modifyCategory:ActionCreator<IModifyCategoryAction> = (payload) => ({type: 'modifyCategory', payload})
