import React from 'react'
import {ICatagoryItem} from 'store/useCatagoryReducer'
import {MoneyDirectionType} from 'store/useCatagoryReducer'

const Context = React.createContext<{
  state: ICatagoryItem[],
  dispatch: React.Dispatch<any>
}>({
  state: [
    {id: -1, name: "餐饮", icon: "canyin", direction: MoneyDirectionType.EXPENDITURE}],
  dispatch: () => {}
})
export default Context
