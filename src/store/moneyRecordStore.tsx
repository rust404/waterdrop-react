import React, {FC, useReducer} from 'react'
import moneyRecordReducer, {IRecordAction, loadRecords} from "./moneyRecordReducer";

export const MoneyRecordContext = React.createContext<{
  state: MoneyRecord[],
  dispatch: React.Dispatch<IRecordAction>
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
