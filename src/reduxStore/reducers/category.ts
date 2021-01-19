import {Category} from "../index";
import {CategoryAction} from "../actions/category";
import {generateId} from "../../store/utils";
import {ADD_CATEGORY, DELETE_CATEGORY, MODIFY_CATEGORY} from "../constants/ActionTypes";

export const categoryReducer = (state: Category[] = [], action: CategoryAction):Category[] => {
  switch (action.type) {
    case ADD_CATEGORY:
      if (state.some(category => category.name === action.payload.name)) {
        return state
      }
      return [...state, {
        id: generateId(),
        ...action.payload
      }];
    case DELETE_CATEGORY:
      return state.filter(item => item.id !== action.payload.id);
    case MODIFY_CATEGORY:
      return state.map(category => category.id === action.payload.id ? {...category, ...action.payload} : category)
    default:
      return state
  }
}
