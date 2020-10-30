import React, {FC, useReducer} from 'react'
import categoriesReducer, {CategoryAction, loadCategories} from "./categoriesReducer";
import {reducerWithLocalStorage} from "./utils";
import {CATEGORY_KEY} from "./constants";

export const CategoriesContext = React.createContext<{
  categories: Category[],
  dispatchCategories: React.Dispatch<CategoryAction>
}>({
  categories: [],
  dispatchCategories: () => {
  }
})

const reducer = reducerWithLocalStorage(categoriesReducer, CATEGORY_KEY)

const CategoriesStore: FC = ({children}) => {
  const [categories, dispatchCategories] = useReducer(
    reducer,
    null,
    loadCategories
  )
  return (
    <CategoriesContext.Provider value={{categories, dispatchCategories}}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesStore
