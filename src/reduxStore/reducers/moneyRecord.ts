import {RecordAction} from "../actions/moneyRecord";
import {ADD_RECORD, DELETE_RECORD, MODIFY_RECORD} from "../constants/ActionTypes";
import {generateId} from "../utils";

export const moneyRecordReducer = (state: MoneyRecord[] = [], action: RecordAction):MoneyRecord[] => {
  switch (action.type) {
    case ADD_RECORD:
      return [
        ...state,
        {
          ...action.payload,
          id: generateId()
        }
      ];
    case DELETE_RECORD:
      return state.filter(moneyRecord => moneyRecord.id !== action.payload.id)
    case MODIFY_RECORD:
      return state.map(moneyRecord => moneyRecord.id === action.payload.id ? {...moneyRecord, ...action.payload} : moneyRecord)
    default:
      return state
  }
}
