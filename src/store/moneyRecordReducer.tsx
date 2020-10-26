import React from "react";
import dayjs from "dayjs";
import {PREFIX} from "./constant";
import {getKeyWithPrefix} from "./utils";

let recordId: number | undefined;
const MAX_RECORD_ID_KEY = getKeyWithPrefix('maxRecordId', PREFIX)
const RECORD_KEY = getKeyWithPrefix('record', PREFIX)


type IRecordReducer<T extends IRecordAction> = React.Reducer<MoneyRecord[], T>;

interface IAddRecordAction {
  type: "addRecord";
  payload: Pick<MoneyRecord, "time" | "moneyType" | "categoryId" | "amount" | "remarks">;
}

const getRecordId = () => {
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

const addRecord: IRecordReducer<IAddRecordAction> = (state, action) => {
  const newState = [
    ...state,
    {
      ...action.payload,
      id: getRecordId()
    }
  ];
  saveRecords(newState)
  return newState
};

interface IModifyRecordAction {
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

interface IDeleteRecordAction {
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
export const getRecordById = (records: MoneyRecord[], id: number): MoneyRecord | null => {
  return records.filter(record => record.id === id)[0];
};

export const getRecordsByTime = (records: MoneyRecord[], time: Date, unit: dayjs.UnitType) => {
  return records.filter(record => {
    return dayjs(time).isSame(record.time, unit)
  })
}
export const getRecords = (records: MoneyRecord[], option: Partial<MoneyRecord>) => {
  return records.filter(record => {
    for (const key in option) {
      if (!Object.prototype.hasOwnProperty.call(option, key)) continue
      if (record[key] !== option[key]) return false
    }
    return true
  })
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
