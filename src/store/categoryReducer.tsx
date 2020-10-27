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

export type ICategoryAction =
  | IAddCategoryAction
  | IDeleteCategoryAction
  | IModifyCategoryAction;

type ICategoryReducer<T extends ICategoryAction> = React.Reducer<ICategoryItem[],
  T>;

const defaultCategoryList: Omit<ICategoryItem, 'id'>[] = [
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

export interface IAddCategoryAction {
  type: "addCategory";
  payload: Omit<ICategoryItem, 'id'>;
}

const addCategory: ICategoryReducer<IAddCategoryAction> = (state, action) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i].name === action.payload.name) return state;
  }
  const newList = state.concat();
  const {name, moneyType, icon} = action.payload;
  newList.push({
    name,
    icon,
    id: generateCategoryId(),
    moneyType
  });
  saveCategory(newList)
  return newList;
};

export interface IDeleteCategoryAction {
  type: "deleteCategory";
  payload: Pick<ICategoryItem, "id">;
}

const deleteCategory: ICategoryReducer<IDeleteCategoryAction> = (
  state,
  action
) => {
  const newState = state.filter(item => {
    return item.id !== action.payload.id;
  });
  saveCategory(newState)
  return newState
};

export interface IModifyCategoryAction {
  type: "modifyCategory";
  payload: Pick<ICategoryItem, "id"> & Partial<ICategoryItem>;
}

const modifyCategory: ICategoryReducer<IModifyCategoryAction> = (
  state,
  action
) => {
  const newState = state.concat();
  const index = state.findIndex(({id}) => action.payload.id === id);
  if (index === -1) {
    return state;
  }
  newState.splice(index, 1, {
    ...state[index],
    ...action.payload
  });
  saveCategory(newState)
  return newState;
};

export const loadCategory = () => {
  const categoryStr = window.localStorage.getItem(CATEGORY_KEY);
  let category: ICategoryItem[];
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

export const saveCategory = (category: ICategoryItem[]) => {
  window.localStorage.setItem(CATEGORY_KEY, JSON.stringify(category));
}

const categoryReducer: ICategoryReducer<ICategoryAction> = (state, action) => {
  switch (action.type) {
    case "addCategory":
      return addCategory(state, action);
    case "deleteCategory":
      return deleteCategory(state, action);
    case "modifyCategory":
      return modifyCategory(state, action);
    default:
      return state;
  }
};

export default categoryReducer;
