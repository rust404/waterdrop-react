import {RootState} from "../reducers";

export const getCategoryState = (store: RootState) => store.categories

export const getCategoryById = (store: RootState, id: string) => {
  const categories = getCategoryState(store)
  return categories.filter(category => category.id === id)[0]
}
