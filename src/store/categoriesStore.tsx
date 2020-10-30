import React, {FC, useReducer} from 'react'
import categoriesReducer, {
  AddCategoryAction,
  CategoryAction, DeleteCategoryAction,
  loadCategories,
  ModifyCategoryAction
} from "./categoriesReducer";
import {bindActionCreator, noop, reducerWithLocalStorage} from "./utils";
import {CATEGORY_KEY} from "./constants";
import {addCategoryActionCreator, deleteCategoryActionCreator, modifyCategoryActionCreator} from "./actions/category";

export const CategoriesContext = React.createContext<{
  categories: Category[],
  dispatchCategories: React.Dispatch<CategoryAction>,
  addCategory: BoundActionCreator<AddCategoryAction>,
  modifyCategory: BoundActionCreator<ModifyCategoryAction>,
  deleteCategory: BoundActionCreator<DeleteCategoryAction>
}>({
  categories: [],
  dispatchCategories: noop,
  addCategory: noop,
  modifyCategory: noop,
  deleteCategory: noop,
})

const reducer = reducerWithLocalStorage(categoriesReducer, CATEGORY_KEY)

const CategoriesStore: FC = ({children}) => {
  const [categories, dispatchCategories] = useReducer(
    reducer,
    null,
    loadCategories
  )
  const addCategory = bindActionCreator(dispatchCategories, addCategoryActionCreator)
  const modifyCategory = bindActionCreator(dispatchCategories, modifyCategoryActionCreator)
  const deleteCategory = bindActionCreator(dispatchCategories, deleteCategoryActionCreator)
  return (
    <CategoriesContext.Provider value={{
      categories,
      dispatchCategories,
      addCategory,
      modifyCategory,
      deleteCategory
    }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesStore
