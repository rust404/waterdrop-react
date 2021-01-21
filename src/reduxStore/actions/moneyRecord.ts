import {ADD_RECORD, DELETE_RECORD, MODIFY_RECORD} from "../constants/ActionTypes";
import {createAction} from "@reduxjs/toolkit";

export const addRecord = createAction<Pick<
  MoneyRecord,
  "time" | "moneyType" | "categoryId" | "amount" | "remarks"
  >>(ADD_RECORD)
export const deleteRecord = createAction<Pick<MoneyRecord, "id">>(DELETE_RECORD)
export const modifyRecord = createAction<Pick<MoneyRecord, "id"> & Partial<MoneyRecord>>(MODIFY_RECORD)
