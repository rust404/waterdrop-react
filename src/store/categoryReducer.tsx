let cid = 0;

export enum MoneyType {
  INCOME = "INCOME",
  EXPENDITURE = "EXPENDITURE"
}
export function isMoneyType(type: string) {
  return type in MoneyType;
}

export interface ICategoryItem {
  name: string;
  icon: string;
  id: number;
  moneyType: MoneyType;
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
  {name: "餐饮", icon: "canyin", moneyType: MoneyType.EXPENDITURE},
  {name: "服饰", icon: "fushi", moneyType: MoneyType.EXPENDITURE},
  {name: "读书", icon: "dushu", moneyType: MoneyType.EXPENDITURE},
  {name: "交通", icon: "jiaotong", moneyType: MoneyType.EXPENDITURE},
  {name: "旅行", icon: "lvxing", moneyType: MoneyType.EXPENDITURE},
  {
    name: "日用",
    icon: "riyongpin",
    moneyType: MoneyType.EXPENDITURE
  },
  {name: "工资", icon: "gongzi", moneyType: MoneyType.INCOME},
  {name: "兼职", icon: "jianzhi", moneyType: MoneyType.INCOME},
  {name: "理财", icon: "licai", moneyType: MoneyType.INCOME}
];

interface IAddCategoryAction {
  type: "addCategory";
  payload: Pick<ICategoryItem, "name" | "moneyType" | "icon">;
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
    id: cid++,
    moneyType
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
        moneyType: item.moneyType,
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
