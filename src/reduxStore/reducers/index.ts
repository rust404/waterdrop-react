import {combineReducers} from "redux";
import {categoryReducer} from "./category";
import {moneyRecordReducer} from "./moneyRecord";

export const rootReducer = combineReducers({
  categories: categoryReducer,
  moneyRecords: moneyRecordReducer
})

export type RootState = ReturnType<typeof rootReducer>
