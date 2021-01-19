import {createStore} from "redux";
import {rootReducer} from "./reducers";
import {loadCategories, loadRecords, saveCategories, saveRecords} from "./persist";

export interface MoneyRecord {
  time: string;
  moneyType: MoneyType;
  categoryId: string;
  id: string;
  amount: number;
  remarks: string;
  [index: string]: number | string | MoneyType | undefined;
}

export interface Category {
  name: string;
  icon: string;
  id: string;
  moneyType: MoneyType;
}

export const store = createStore(rootReducer, {
  categories: loadCategories(),
  moneyRecords: loadRecords()
})

// 数据持久化
store.subscribe(() => {
  saveCategories(store.getState().categories)
  saveRecords(store.getState().moneyRecords)
})
