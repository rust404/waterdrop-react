import React from 'react'
import {ICategoryItem, ICategoryAction} from 'store/categoryReducer'
import {MoneyRecord, IRecordAction} from './moneyRecordReducer'

export const CategoryContext = React.createContext<{
  state: ICategoryItem[],
  dispatch: React.Dispatch<ICategoryAction>
}>({
  state: [],
  dispatch: () => {}
})

export const RecordContext = React.createContext<{
  state: MoneyRecord[],
  dispatch: React.Dispatch<IRecordAction>
}>({
  state: [],
  dispatch: () => {}
})

