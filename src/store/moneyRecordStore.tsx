import React, {FC, useReducer} from 'react'
import moneyRecordReducer, {RecordAction, loadRecords} from "./moneyRecordReducer";

export const MoneyRecordContext = React.createContext<{
  state: MoneyRecord[],
  dispatch: React.Dispatch<RecordAction>
}>({
  state: [],
  dispatch: () => {}
})

const MoneyRecordStore:FC = ({children}) => {
  const [state, dispatch] = useReducer(moneyRecordReducer, null, loadRecords)
  return (
    <MoneyRecordContext.Provider value={{state, dispatch}}>
      {children}
    </MoneyRecordContext.Provider>
  )
}

export default MoneyRecordStore
