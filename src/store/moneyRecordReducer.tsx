import React from "react";
import {MoneyDirection} from "./useCatagoryReducer";

let recordId = 0;
export interface IRecord {
  time: string;
  direction: MoneyDirection;
  catagoryId: number;
  id: number;
  amount: number;
  [index: string]: number | string | MoneyDirection | undefined;
}
interface IRecordBaseAction {
  type: "addRecord" | "deleteRecord" | "modifyRecord";
  payload: Partial<IRecord> & {
    [index: string]: number | string | MoneyDirection | undefined;
  };
}

type IRecordReducer<T extends IRecordBaseAction> = React.Reducer<IRecord[], T>;

type IAddRecordAction = IRecordBaseAction & {
  payload: Pick<IRecord, "time" | "direction" | "catagoryId" | "amount">;
};

const addRecord: IRecordReducer<IAddRecordAction> = (state, action) => {
  console.log("hello");
  return [
    ...state,
    {
      ...action.payload,
      id: recordId++
    }
  ];
};

type IModifyRecordAction = IRecordBaseAction & {
  payload: Pick<IRecord, "id"> & Partial<IRecord>;
};
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
type IDeleteRecordAction = IRecordBaseAction & {
  payload: Pick<IRecord, "id">;
};
const deleteRecord: IRecordReducer<IDeleteRecordAction> = (state, action) => {
  for (let i = 0; i < state.length; i++) {
    if (action.payload.id === state[i].id) {
      const newState = [...state]
      newState.splice(i, 1);
      return newState;
    }
  }
  return state;
};
const findRecord = (records: IRecord[], id: number): IRecord | null => {
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

export type IRecordAction = IRecordBaseAction;

const moneyRecordReducer: IRecordReducer<IRecordAction> = (state, action) => {
  switch (action.type) {
    case "addRecord":
      return addRecord(state, action as IAddRecordAction);
    case "deleteRecord":
      return deleteRecord(state, action as IDeleteRecordAction);
    case "modifyRecord":
      return modifyRecord(state, action as IModifyRecordAction);
  }
};

export default moneyRecordReducer;
