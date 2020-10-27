import React, {FC, useReducer} from 'react'
import categoryReducer, {CategoryAction, loadCategory} from "./categoryReducer";

export const CategoryContext = React.createContext<{
  state: CategoryItem[],
  dispatch: React.Dispatch<CategoryAction>
}>({
  state: [],
  dispatch: () => {}
})

const CategoryStore:FC = ({children}) => {
  const [state, dispatch] = useReducer(categoryReducer, null, loadCategory)
  return (
    <CategoryContext.Provider value={{state, dispatch}}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryStore
