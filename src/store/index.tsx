import React from 'react'
import {ICategoryItem, ICategoryAction} from 'store/categoryReducer'
import {IRecord, IRecordAction} from './moneyRecordReducer'

export const CategoryContext = React.createContext<{
  state: ICategoryItem[],
  dispatch: React.Dispatch<ICategoryAction>
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

