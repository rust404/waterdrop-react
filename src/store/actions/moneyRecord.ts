import {IAddRecordAction, IDeleteRecordAction, IModifyRecordAction} from "../moneyRecordReducer";

export const addRecord:ActionCreator<IAddRecordAction> = (payload) => ({type: 'addRecord', payload})
export const deleteRecord:ActionCreator<IDeleteRecordAction> = (payload) => ({type: 'deleteRecord', payload})
export const modifyRecord:ActionCreator<IModifyRecordAction> = (payload) => ({type: 'modifyRecord', payload})
