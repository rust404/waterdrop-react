import {AddRecordAction, DeleteRecordAction, ModifyRecordAction} from "../moneyRecordsReducer";

export const addRecord:ActionCreator<AddRecordAction> = (payload) => ({type: 'addRecord', payload})
export const deleteRecord:ActionCreator<DeleteRecordAction> = (payload) => ({type: 'deleteRecord', payload})
export const modifyRecord:ActionCreator<ModifyRecordAction> = (payload) => ({type: 'modifyRecord', payload})
