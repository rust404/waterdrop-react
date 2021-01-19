import dayjs from "dayjs";
import {RootState} from "../reducers";

export const getRecordsState = (state: RootState) => state.moneyRecords

export const getRecordById = (state: RootState, id: string): MoneyRecord | null => {
  const records = getRecordsState(state)
  return records.filter(record => record.id === id)[0];
};

export const getRecordsByTime = (state: RootState, time: Date, unit: dayjs.UnitType) => {
  const records = getRecordsState(state)
  return records.filter(record => {
    return dayjs(time).isSame(record.time, unit)
  })
}

export const getRecordsByOption = (state: RootState, option: Partial<MoneyRecord>) => {
  const records = getRecordsState(state)
  return records.filter(record => {
    for (const key in option) {
      if (!Object.prototype.hasOwnProperty.call(option, key)) continue
      if (record[key] !== option[key]) return false
    }
    return true
  })
}
