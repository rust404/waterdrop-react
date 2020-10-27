import React from "react";
import {getKeyWithPrefix} from "./utils";
import {PREFIX} from "./constants";

let recordId: number | undefined;
const MAX_RECORD_ID_KEY = getKeyWithPrefix('maxRecordId', PREFIX)
const RECORD_KEY = getKeyWithPrefix('record', PREFIX)


type MoneyRecordReducer<T extends RecordAction> = React.Reducer<MoneyRecord[], T>;

const generateRecordId = () => {
  if (recordId === undefined) {
    const id = parseInt(window.localStorage.getItem(MAX_RECORD_ID_KEY) || '')
    recordId = isNaN(id) ? 0 : id + 1
  } else {
    recordId++
  }
  saveRecordId()
  return recordId
}

const saveRecordId = () => {
  window.localStorage.setItem(MAX_RECORD_ID_KEY, recordId + '')
}

export interface AddRecordAction {
  type: "addRecord";
  payload: Pick<MoneyRecord, "time" | "moneyType" | "categoryId" | "amount" | "remarks">;
}

export interface ModifyRecordAction {
  type: "modifyRecord";
  payload: Pick<MoneyRecord, "id"> & Partial<MoneyRecord>;
}

export interface DeleteRecordAction {
  type: "deleteRecord";
  payload: Pick<MoneyRecord, "id">;
}

export const loadRecords = (): MoneyRecord[] => {
  let recordsStr = window.localStorage.getItem(RECORD_KEY);
  if (!recordsStr) {
    return [];
  }
  const records = JSON.parse(recordsStr);
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }
  return records;
};

export const saveRecords = (records: MoneyRecord[]) => {
  window.localStorage.setItem(RECORD_KEY, JSON.stringify(records));
}

export type RecordAction = AddRecordAction | ModifyRecordAction | DeleteRecordAction;

const moneyRecordReducer: MoneyRecordReducer<RecordAction> = (state, action) => {
  let newState = state
  switch (action.type) {
    case "addRecord":
      newState = [
        ...state,
        {
          ...action.payload,
          id: generateRecordId()
        }
      ];
      break
    case "deleteRecord":
      newState = state.filter(moneyRecord => moneyRecord.id !== action.payload.id)
      break
    case "modifyRecord":
      newState = state.map(moneyRecord => moneyRecord.id === action.payload.id ? {...moneyRecord, ...action.payload} : moneyRecord)
      break
  }
  saveRecords(newState)
  return newState
};

export default moneyRecordReducer;
