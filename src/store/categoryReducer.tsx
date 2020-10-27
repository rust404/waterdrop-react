import React from 'react'
import {getKeyWithPrefix} from "./utils";
import {PREFIX} from "./constants";

let cid = 0;
const MAX_CATEGORY_ID_KEY = getKeyWithPrefix('maxCategoryId', PREFIX)
const CATEGORY_KEY = getKeyWithPrefix('category', PREFIX)

export function isMoneyType(type: string) {
  return type === 'income' || type === 'expenditure';
}

const generateCategoryId = () => {
  if (cid === undefined) {
    const id = parseInt(window.localStorage.getItem(MAX_CATEGORY_ID_KEY) || '')
    cid = isNaN(id) ? 0 : id + 1
  } else {
    cid++
  }
  saveCategoryId()
  return cid
}

const saveCategoryId = () => {
  window.localStorage.setItem(MAX_CATEGORY_ID_KEY, cid + '')
}

export type CategoryAction =
  | AddCategoryAction
  | DeleteCategoryAction
  | ModifyCategoryAction;

type CategoryReducer<T extends CategoryAction> = React.Reducer<CategoryItem[], T>;

const defaultCategoryList: Omit<CategoryItem, 'id'>[] = [
  {name: "餐饮", icon: "canyin", moneyType: 'expenditure'},
  {name: "服饰", icon: "fushi", moneyType: 'expenditure'},
  {name: "读书", icon: "dushu", moneyType: 'expenditure'},
  {name: "交通", icon: "jiaotong", moneyType: 'expenditure'},
  {name: "旅行", icon: "lvxing", moneyType: 'expenditure'},
  {name: "日用", icon: "riyongpin", moneyType: 'expenditure'},
  {name: "工资", icon: "gongzi", moneyType: 'income'},
  {name: "兼职", icon: "jianzhi", moneyType: 'income'},
  {name: "理财", icon: "licai", moneyType: 'income'}
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
    category = defaultCategoryList.map(item => {
      return {
        ...item,
        moneyType: item.moneyType,
        id: generateCategoryId()
      };
    });
    saveCategory(category)
  } else {
    category = JSON.parse(categoryStr);
    cid = Math.max(...category.map(item => item.id)) + 1;
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
        id: generateCategoryId(),
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
