import React from 'react'
import {ICatagoryItem, ICatagoryAction} from 'store/catagoryReducer'
import {IRecord, IRecordAction} from './moneyRecordReducer'

const Context = React.createContext<{
  state: ICatagoryItem[],
  dispatch: React.Dispatch<ICatagoryAction>
}>({
  state: [],
  dispatch: () => {}
})

export const RecordContext = React.createContext<{
  state: IRecord[],
  dispatch: React.Dispatch<IRecordAction>
}>({
  state: [],
  dispatch: () => {}
})

export default Context

