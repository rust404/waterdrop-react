import {addRecord, deleteRecord, modifyRecord} from "../actions/moneyRecord";
import {generateId} from "../utils";
import {createReducer} from "@reduxjs/toolkit";

export const moneyRecordReducer = createReducer<MoneyRecord[]>([], builder => {
  builder.addCase(addRecord, (state, action) => {
    return [
      ...state,
      {
        ...action.payload,
        id: generateId()
      }
    ];
  })
  builder.addCase(modifyRecord, (state, action) => {
    return state.map(moneyRecord =>
      moneyRecord.id === action.payload.id ?
        {...moneyRecord, ...action.payload}
        : moneyRecord)
  })
  builder.addCase(deleteRecord, (state, action) => {
    return state.filter(moneyRecord => moneyRecord.id !== action.payload.id)
  })
})
