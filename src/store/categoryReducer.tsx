import React from 'react'
import {generateId, getKeyWithPrefix} from "./utils";
import {PREFIX} from "./constants";

const CATEGORY_KEY = getKeyWithPrefix('category', PREFIX)

export function isMoneyType(type: string) {
  return type === 'income' || type === 'expenditure';
}

export type CategoryAction =
  | AddCategoryAction
  | DeleteCategoryAction
  | ModifyCategoryAction;

type CategoryReducer<T extends CategoryAction> = React.Reducer<CategoryItem[], T>;

const defaultCategoryList: CategoryItem[] = [
  {name: "餐饮", icon: "canyin", moneyType: "expenditure", id: "1612b088-3730-429d-ada1-32d726c0593c"},
  {name: "服饰", icon: "fushi", moneyType: "expenditure", id: "ee47c60e-7d7d-4f77-8ea4-aaaed7749631"},
  {name: "读书", icon: "dushu", moneyType: "expenditure", id: "949f55ef-0f57-4bc7-b5bd-93be277d06e4"},
  {name: "交通", icon: "jiaotong", moneyType: "expenditure", id: "8c834353-b727-4039-8e5a-a196058f83db"},
  {name: "旅行", icon: "lvxing", moneyType: "expenditure", id: "ae684aa2-3302-47c0-b1f8-6eeeec5580d3"},
  {name: "日用", icon: "riyongpin", moneyType: "expenditure", id: "05b6a0f9-1e80-4d60-8c59-2ae7ecdcfe3c"},
  {name: "工资", icon: "gongzi", moneyType: "income", id: "1de75225-cf7c-4c34-88aa-ec2591d33909"},
  {name: "兼职", icon: "jianzhi", moneyType: "income", id: "5c04d58b-5112-4f2f-8b90-975833f41cc2"},
  {name: "理财", icon: "licai", moneyType: "income", id: "c6d471fe-4a33-46ac-9e41-f94960abfec2"}
];

export interface AddCategoryAction {
  type: "addCategory";
  payload: Omit<CategoryItem, 'id'>;
}

export interface DeleteCategoryAction {
  type: "deleteCategory";
  payload: Pick<CategoryItem, "id">;
}

export interface ModifyCategoryAction {
  type: "modifyCategory";
  payload: Pick<CategoryItem, "id"> & Partial<CategoryItem>;
}

export const loadCategory = () => {
  const categoryStr = window.localStorage.getItem(CATEGORY_KEY);
  let category: CategoryItem[];
  if (!categoryStr) {
    category = defaultCategoryList
    saveCategory(category)
  } else {
    category = JSON.parse(categoryStr);
  }
  return category;
};

export const saveCategory = (category: CategoryItem[]) => {
  window.localStorage.setItem(CATEGORY_KEY, JSON.stringify(category));
}

const categoryReducer: CategoryReducer<CategoryAction> = (state, action) => {
  let newState = state
  switch (action.type) {
    case "addCategory":
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.payload.name) return state;
      }
      newState = [...state, {
        id: generateId(),
        ...action.payload
      }];
      break
    case "deleteCategory":
      newState = state.filter(item => item.id !== action.payload.id);
      break
    case "modifyCategory":
      newState = state.map(category => category.id === action.payload.id ? {...category, ...action.payload} : category)
      break
    default:
      return state
  }
  // TODO
  // 是否可以用中间件来处理
  saveCategory(newState)
  return newState
};

export default categoryReducer;
