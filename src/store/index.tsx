import React from 'react'
import {ICatagoryItem} from 'store/useCatagoryReducer'

const Context = React.createContext<{
  state: ICatagoryItem[],
  dispatch: React.Dispatch<any>
}>({
  state: [],
  dispatch: () => {}
})
export default Context
