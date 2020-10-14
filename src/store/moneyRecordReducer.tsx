import React from "react";
import {MoneyType} from "./categoryReducer";

let recordId = 0;
export interface IRecord {
  time: string;
  moneyType: MoneyType;
  categoryId: number;
  id: number;
  amount: number;
  [index: string]: number | string | MoneyType | undefined;
}

type IRecordReducer<T extends IRecordAction> = React.Reducer<IRecord[], T>;

interface IAddRecordAction {
  type: "addRecord";
  payload: Pick<IRecord, "time" | "moneyType" | "categoryId" | "amount">;
}

const addRecord: IRecordReducer<IAddRecordAction> = (state, action) => {
  return [
    ...state,
    {
      ...action.payload,
      id: recordId++
    }
  ];
};

interface IModifyRecordAction {
  type: "modifyRecord";
  payload: Pick<IRecord, "id"> & Partial<IRecord>;
}

const modifyRecord: IRecordReducer<IModifyRecordAction> = (state, action) => {
  const record = findRecord(state, action.payload.id);
  if (!record) {
    return state;
  }
  for (let i in action.payload) {
    if (action.payload[i] === undefined) continue;
    record[i] = action.payload[i];
  }
  return [...state];
};

interface IDeleteRecordAction {
  type: "deleteRecord";
  payload: Pick<IRecord, "id">;
}

const deleteRecord: IRecordReducer<IDeleteRecordAction> = (state, action) => {
  for (let i = 0; i < state.length; i++) {
    if (action.payload.id === state[i].id) {
      const newState = [...state];
      newState.splice(i, 1);
      return newState;
    }
  }
  return state;
};
export const findRecord = (records: IRecord[], id: number): IRecord | null => {
  return records.filter(record => record.id === id)[0];
};

export const loadRecords = (): IRecord[] => {
  let recordsStr = window.localStorage.getItem("records");
  if (!recordsStr) {
    return [];
  }
  const records = JSON.parse(recordsStr);
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }
  recordId = Math.max(...records.map(record => record.id)) + 1;
  return records;
};

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
