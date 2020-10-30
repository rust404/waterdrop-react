import {AddRecordAction, DeleteRecordAction, ModifyRecordAction} from "../moneyRecordsReducer";

export const addRecordActionCreator:ActionCreator<AddRecordAction> = (payload) => ({type: 'addRecord', payload})
export const deleteRecordActionCreator:ActionCreator<DeleteRecordAction> = (payload) => ({type: 'deleteRecord', payload})
export const modifyRecordActionCreator:ActionCreator<ModifyRecordAction> = (payload) => ({type: 'modifyRecord', payload})
