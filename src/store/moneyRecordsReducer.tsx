import {generateId} from "./utils";
import {RECORD_KEY} from "./constants";

type MoneyRecordsReducer<T extends RecordAction> = React.Reducer<MoneyRecord[], T>;

export type RecordAction = AddRecordAction | ModifyRecordAction | DeleteRecordAction;

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

const moneyRecordsReducer: MoneyRecordsReducer<RecordAction> = (state, action) => {
  let newState = state
  switch (action.type) {
    case "addRecord":
      newState = [
        ...state,
        {
          ...action.payload,
          id: generateId()
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
  return newState
};

export default moneyRecordsReducer;
