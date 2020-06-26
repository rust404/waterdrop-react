import React from 'react'
import {ICatagoryItem, ICatagoryAction} from 'store/catagoryReducer'
import {IRecord, IRecordAction} from './moneyRecordReducer'

export const CatagoryContext = React.createContext<{
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

