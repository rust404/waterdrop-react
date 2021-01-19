import {RootState} from "../reducers";

export const getCategoryState = (state: RootState) => state.categories

export const getCategoryById = (categories: Category[], id: string) => {
  return categories.filter(category => category.id === id)[0]
}
