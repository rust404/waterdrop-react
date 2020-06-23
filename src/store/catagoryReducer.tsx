let cid = 0;

export enum MoneyDirection {
  INCOME = "INCOME",
  EXPENDITURE = "EXPENDITURE"
}
export function isMoneyDirection(type: string) {
  return type in MoneyDirection;
}

export interface ICatagoryItem {
  name: string;
  icon: string;
  id: number;
  direction: MoneyDirection;
}

export type ICatagoryAction =
  | IAddCatagoryAction
  | IDeleteCatagoryAction
  | IModifyCatagoryAction;

type ICatagoryReducer<T extends ICatagoryAction> = React.Reducer<ICatagoryItem[], T>;

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

interface IAddCatagoryAction {
  type: "addCatagory";
  payload: Pick<ICatagoryItem, "name" | "direction" | "icon">;
}

const addCatagory: ICatagoryReducer<IAddCatagoryAction> = (
  state,
  action
) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i].name === action.payload.name) return state;
  }
  const newList = state.concat();
  const {name, direction, icon} = action.payload;
  newList.push({
    name,
    icon,
    id: cid++,
    direction
  });
  return newList;
};

interface IDeleteCatagoryAction {
  type: "deleteCatagory";
  payload: Pick<ICatagoryItem, 'id'>;
}
const deleteCatagory: ICatagoryReducer<IDeleteCatagoryAction> = (state, action) => {
  return state.filter(item => {
    return item.id !== action.payload.id;
  });
};

interface IModifyCatagoryAction {
  type: "modifyCatagory";
  payload: Pick<ICatagoryItem, 'id'> & Partial<ICatagoryItem>;
}
const modifyCatagory: ICatagoryReducer<IModifyCatagoryAction> = (
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
  return newState;
};

export const loadCatagory = () => {
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

const catagoryReducer: ICatagoryReducer<ICatagoryAction> = (state, action) => {
  switch (action.type) {
    case "addCatagory":
      return addCatagory(state, action);
    case "deleteCatagory":
      return deleteCatagory(state, action);
    case "modifyCatagory":
      return modifyCatagory(state, action);
    default:
      return state;
  }
};

export default catagoryReducer
