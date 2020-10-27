import React, {FC, useReducer} from 'react'
import moneyRecordsReducer, {RecordAction, loadRecords} from "./moneyRecordsReducer";

export const MoneyRecordsContext = React.createContext<{
  moneyRecords: MoneyRecord[],
  dispatchMoneyRecords: React.Dispatch<RecordAction>
}>({
  moneyRecords: [],
  dispatchMoneyRecords: () => {}
})

const MoneyRecordsStore:FC = ({children}) => {
  const [moneyRecords, dispatchMoneyRecords] = useReducer(moneyRecordsReducer, null, loadRecords)
  return (
    <MoneyRecordsContext.Provider value={{moneyRecords, dispatchMoneyRecords}}>
      {children}
    </MoneyRecordsContext.Provider>
  )
}

export default MoneyRecordsStore
