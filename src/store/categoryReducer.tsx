let cid = 0;

export enum MoneyDirection {
  INCOME = "INCOME",
  EXPENDITURE = "EXPENDITURE"
}
export function isMoneyDirection(type: string) {
  return type in MoneyDirection;
}

export interface ICategoryItem {
  name: string;
  icon: string;
  id: number;
  direction: MoneyDirection;
}

export type ICategoryAction =
  | IAddCategoryAction
  | IDeleteCategoryAction
  | IModifyCategoryAction;

type ICategoryReducer<T extends ICategoryAction> = React.Reducer<
  ICategoryItem[],
  T
>;

const defaultCategoryList = [
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

interface IAddCategoryAction {
  type: "addCategory";
  payload: Pick<ICategoryItem, "name" | "direction" | "icon">;
}

const addCategory: ICategoryReducer<IAddCategoryAction> = (state, action) => {
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

interface IDeleteCategoryAction {
  type: "deleteCategory";
  payload: Pick<ICategoryItem, "id">;
}
const deleteCategory: ICategoryReducer<IDeleteCategoryAction> = (
  state,
  action
) => {
  return state.filter(item => {
    return item.id !== action.payload.id;
  });
};

interface IModifyCategoryAction {
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
  return newState;
};

export const loadCategory = () => {
  const categoryStr = window.localStorage.getItem("category");
  let category: ICategoryItem[];
  if (!categoryStr) {
    category = defaultCategoryList.map(item => {
      return {
        ...item,
        direction: item.direction,
        id: cid++
      };
    });
  } else {
    category = JSON.parse(categoryStr);
    cid = Math.max(...category.map(item => item.id)) + 1;
  }
  return category;
};

export const findCategory = (
  state: ICategoryItem[],
  id: number
) => {
  return state.filter(item => item.id === id)[0];
};

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
