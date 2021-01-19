import {ActionCreator, ADD_RECORD, DELETE_RECORD, MODIFY_RECORD} from "../constants/ActionTypes";

export interface AddRecordAction {
  type: typeof ADD_RECORD;
  payload: Pick<MoneyRecord, "time" | "moneyType" | "categoryId" | "amount" | "remarks">;
}

export interface ModifyRecordAction {
  type: typeof MODIFY_RECORD;
  payload: Pick<MoneyRecord, "id"> & Partial<MoneyRecord>;
}

export interface DeleteRecordAction {
  type: typeof DELETE_RECORD;
  payload: Pick<MoneyRecord, "id">;
}

export type RecordAction = AddRecordAction | ModifyRecordAction | DeleteRecordAction

export const addRecord:ActionCreator<AddRecordAction> = (payload) => ({type: ADD_RECORD, payload})
export const deleteRecord:ActionCreator<DeleteRecordAction> = (payload) => ({type: DELETE_RECORD, payload})
export const modifyRecord:ActionCreator<ModifyRecordAction> = (payload) => ({type: MODIFY_RECORD, payload})
