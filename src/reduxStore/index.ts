import {createStore} from "redux";
import {rootReducer} from "./reducers";
import {loadCategories, loadRecords, saveCategories, saveRecords} from "./persist";

export const store = createStore(rootReducer, {
  categories: loadCategories(),
  moneyRecords: loadRecords()
})

// 数据持久化
store.subscribe(() => {
  saveCategories(store.getState().categories)
  saveRecords(store.getState().moneyRecords)
})
