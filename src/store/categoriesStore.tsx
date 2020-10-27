import React, {FC, useReducer} from 'react'
import categoriesReducer, {CategoryAction, loadCategories} from "./categoriesReducer";

export const CategoriesContext = React.createContext<{
  categories: Category[],
  dispatchCategories: React.Dispatch<CategoryAction>
}>({
  categories: [],
  dispatchCategories: () => {}
})

const CategoriesStore:FC = ({children}) => {
  const [categories, dispatchCategories] = useReducer(categoriesReducer, null, loadCategories)
  return (
    <CategoriesContext.Provider value={{categories, dispatchCategories}}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesStore
