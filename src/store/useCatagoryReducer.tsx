import {useReducer} from "react";

let cid = 0;

export enum MoneyDirection {
  INCOME = "INCOME",
  EXPENDITURE = "EXPENDITURE"
}

export interface ICatagoryItem {
  name: string;
  icon: string;
  id: number;
  direction: MoneyDirection;
}

export interface IAction<T extends keyof ICatagoryItem> {
  type: string;
  payload: Pick<ICatagoryItem, T>
}

interface IReducer<T extends keyof ICatagoryItem> {
  (state: ICatagoryItem[], action: IAction<T>): ICatagoryItem[];
}

const defaultCatagoryList = [
  {name: "餐饮", icon: "canyin", direction: MoneyDirection.EXPENDITURE},
  {name: "服饰", icon: "fushi", direction: MoneyDirection.EXPENDITURE},
  {name: "读书", icon: "dushu", direction: MoneyDirection.EXPENDITURE},
  {name: "交通", icon: "jiaotong", direction: MoneyDirection.EXPENDITURE},
  {name: "旅行", icon: "lvxing", direction: MoneyDirection.EXPENDITURE},
  {
    name: "日用",
    icon: "riyongpin",
    direction: MoneyDirection.EXPENDITURE
  },
  {name: "工资", icon: "gongzi", direction: MoneyDirection.INCOME},
  {name: "兼职", icon: "jianzhi", direction: MoneyDirection.INCOME},
  {name: "理财", icon: "licai", direction: MoneyDirection.INCOME}
];

const addCatagory: IReducer<'name' | 'direction'> = (state, action) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i].name === action.payload.name) return state;
  }
  const newList = state.concat();
  newList.push({
    name: action.payload.name,
    icon: "custom",
    id: cid++,
    direction: action.payload.direction
  });
  return newList;
}
const deleteCatagory: IReducer<'id'> = (state, action) => {
  return state.filter(item => {
    return item.id !== action.payload.id
  })
};
const modifyCatagory: IReducer<'id' | Partial<keyof ICatagoryItem>> = (state, action) => {
  const newState = state.concat()
  const index = state.findIndex(({id}) => action.payload.id === id)
  if (index === -1) {
    return state
  }
  newState.splice(index, 1, {
    ...state[index],
    ...action.payload

  })
  return newState
};
const loadCatagory = () => {
  const catagoryStr = window.localStorage.getItem("catagory");
  let catagory: ICatagoryItem[];
  if (!catagoryStr) {
    catagory = defaultCatagoryList.map(item => {
      return {
        ...item,
        direction: item.direction,
        id: cid++
      };
    });
  } else {
    catagory = JSON.parse(catagoryStr);
    cid = Math.max(...catagory.map(item => item.id)) + 1;
  }
  return catagory;
};

const reducer: IReducer<keyof ICatagoryItem> = (state, action) => {
  switch (action.type) {
    case "addCatagory":
      return addCatagory(state, action);
    case "deleteCatagory":
      return deleteCatagory(state, action);
    case "modifyCatagory":
      return modifyCatagory(state, action);
    case "loadCatagory":
      return loadCatagory();
    default:
      return state;
  }
};

export default () => useReducer(reducer, null, loadCatagory);
