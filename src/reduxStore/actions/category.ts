import {ADD_CATEGORY, DELETE_CATEGORY, MODIFY_CATEGORY} from "../constants/ActionTypes";
import {createAction} from "@reduxjs/toolkit";

export const addCategory = createAction<Omit<Category, "id">>(ADD_CATEGORY)
export const deleteCategory = createAction<Pick<Category, "id">>(DELETE_CATEGORY)
export const modifyCategory = createAction<Pick<Category, "id"> & Partial<Category>>(MODIFY_CATEGORY)
