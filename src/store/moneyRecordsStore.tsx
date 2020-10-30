import React, {FC, useReducer} from 'react'
import moneyRecordsReducer, {
  RecordAction,
  loadRecords,
  AddRecordAction,
  ModifyRecordAction, DeleteRecordAction
} from "./moneyRecordsReducer";
import {bindActionCreator, noop, reducerWithLocalStorage} from "./utils";
import {RECORD_KEY} from "./constants";
import {addRecordActionCreator, deleteRecordActionCreator, modifyRecordActionCreator} from "./actions/moneyRecord";

export const MoneyRecordsContext = React.createContext<{
  moneyRecords: MoneyRecord[],
  dispatchMoneyRecords: React.Dispatch<RecordAction>,
  addRecord: BoundActionCreator<AddRecordAction>,
  modifyRecord: BoundActionCreator<ModifyRecordAction>,
  deleteRecord: BoundActionCreator<DeleteRecordAction>
}>({
  moneyRecords: [],
  dispatchMoneyRecords: noop,
  addRecord: noop,
  modifyRecord: noop,
  deleteRecord: noop
})

const reducer = reducerWithLocalStorage(moneyRecordsReducer, RECORD_KEY)

const MoneyRecordsStore:FC = ({children}) => {
  const [moneyRecords, dispatchMoneyRecords] = useReducer(
    reducer,
    null,
    loadRecords
  )
  const addRecord = bindActionCreator(dispatchMoneyRecords, addRecordActionCreator)
  const modifyRecord = bindActionCreator(dispatchMoneyRecords, modifyRecordActionCreator)
  const deleteRecord = bindActionCreator(dispatchMoneyRecords, deleteRecordActionCreator)
  return (
    <MoneyRecordsContext.Provider value={{
      moneyRecords,
      dispatchMoneyRecords,
      addRecord,
      modifyRecord,
      deleteRecord
    }}>
      {children}
    </MoneyRecordsContext.Provider>
  )
}

export default MoneyRecordsStore
