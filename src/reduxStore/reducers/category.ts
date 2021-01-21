import {addCategory, deleteCategory, modifyCategory} from "../actions/category";
import {generateId} from "../utils";
import {createReducer} from "@reduxjs/toolkit";

export const categoryReducer = createReducer<Category[]>([], builder => {
  builder.addCase(addCategory, (state, action) => {
    if (state.some(category => category.name === action.payload.name)) {
      return state
    }
    return [...state, {
      id: generateId(),
      ...action.payload
    }];
  })
  builder.addCase(deleteCategory, (state, action) => {
    return state.filter(item => item.id !== action.payload.id);
  })
  builder.addCase(modifyCategory, (state, action) => {
    return state.map(category => category.id === action.payload.id ? {...category, ...action.payload} : category)
  })
})
