import React from "react";
import {getKeyWithPrefix} from "./utils";
import {getRecordById} from "./selectors/moneyRecord";
import {PREFIX} from "./constants";

let recordId: number | undefined;
const MAX_RECORD_ID_KEY = getKeyWithPrefix('maxRecordId', PREFIX)
const RECORD_KEY = getKeyWithPrefix('record', PREFIX)


type IRecordReducer<T extends IRecordAction> = React.Reducer<MoneyRecord[], T>;

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

export interface IAddRecordAction {
  type: "addRecord";
  payload: Pick<MoneyRecord, "time" | "moneyType" | "categoryId" | "amount" | "remarks">;
}

const addRecord: IRecordReducer<IAddRecordAction> = (state, action) => {
  const newState = [
    ...state,
    {
      ...action.payload,
      id: generateRecordId()
    }
  ];
  saveRecords(newState)
  return newState
};

export interface IModifyRecordAction {
  type: "modifyRecord";
  payload: Pick<MoneyRecord, "id"> & Partial<MoneyRecord>;
}

const modifyRecord: IRecordReducer<IModifyRecordAction> = (state, action) => {
  const record = getRecordById(state, action.payload.id);
  if (!record) {
    return state;
  }
  for (let i of Object.keys(action.payload)) {
    if (action.payload[i] === undefined) continue;
    record[i] = action.payload[i];
  }
  const newState = [...state];
  saveRecords(newState)
  return newState
};


export interface IDeleteRecordAction {
  type: "deleteRecord";
  payload: Pick<MoneyRecord, "id">;
}

const deleteRecord: IRecordReducer<IDeleteRecordAction> = (state, action) => {
  for (let i = 0; i < state.length; i++) {
    if (action.payload.id === state[i].id) {
      const newState = [...state];
      newState.splice(i, 1);
      saveRecords(newState)
      return newState;
    }
  }
  return state;
};

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

export type IRecordAction =
  | IAddRecordAction
  | IModifyRecordAction
  | IDeleteRecordAction;

const moneyRecordReducer: IRecordReducer<IRecordAction> = (state, action) => {
  switch (action.type) {
    case "addRecord":
      return addRecord(state, action);
    case "deleteRecord":
      return deleteRecord(state, action);
    case "modifyRecord":
      return modifyRecord(state, action);
  }
};

export default moneyRecordReducer;
