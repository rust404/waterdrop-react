import React, {FC, useReducer} from 'react'
import moneyRecordsReducer, {RecordAction, loadRecords} from "./moneyRecordsReducer";
import {reducerWithLocalStorage} from "./utils";
import {RECORD_KEY} from "./constants";

export const MoneyRecordsContext = React.createContext<{
  moneyRecords: MoneyRecord[],
  dispatchMoneyRecords: React.Dispatch<RecordAction>
}>({
  moneyRecords: [],
  dispatchMoneyRecords: () => {}
})

const reducer = reducerWithLocalStorage(moneyRecordsReducer, RECORD_KEY)

const MoneyRecordsStore:FC = ({children}) => {
  const [moneyRecords, dispatchMoneyRecords] = useReducer(
    reducer,
    null,
    loadRecords
  )
  return (
    <MoneyRecordsContext.Provider value={{moneyRecords, dispatchMoneyRecords}}>
      {children}
    </MoneyRecordsContext.Provider>
  )
}

export default MoneyRecordsStore
