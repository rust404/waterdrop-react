import React, {FC, useReducer} from 'react'
import categoryReducer, {ICategoryAction, loadCategory} from "./categoryReducer";

export const CategoryContext = React.createContext<{
  state: ICategoryItem[],
  dispatch: React.Dispatch<ICategoryAction>
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
