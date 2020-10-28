import React, {useReducer} from 'react'

interface CategoryIdAction {
  type: 'categoryId',
  payload: string
}

interface TimeAction {
  type: 'time',
  payload: string | Date
}

interface MoneyTypeAction {
  type: 'moneyType',
  payload: MoneyType
}

interface AmountAction {
  type: 'amount',
  payload: number
}

interface RemarksAction {
  type: 'remarks',
  payload: string
}

type MoneyRecordAction = CategoryIdAction | TimeAction | MoneyTypeAction | AmountAction | RemarksAction

const useMoneyRecord = (initialRecord: Partial<MoneyRecord> = {}) => {
  const reducer: React.Reducer<Partial<MoneyRecord>, MoneyRecordAction> = (state, action) => {
    switch (action.type) {
      case "categoryId":
        return {...state, categoryId: action.payload}
      case "moneyType":
        return {...state, moneyType: action.payload}
      case "amount":
        return {...state, amount: action.payload}
      case "remarks":
        return {...state, remarks: action.payload}
      case "time":
        return {
          ...state,
          time: typeof action.payload === 'string' ? action.payload : action.payload.toISOString()
        }
    }
  }
  return useReducer(reducer, initialRecord)
}

export default useMoneyRecord
