import dayjs from "dayjs";

export const getRecordById = (records: MoneyRecord[], id: string): MoneyRecord | null => {
  return records.filter(record => record.id === id)[0];
};

export const getRecordsByTime = (records: MoneyRecord[], time: Date, unit: dayjs.UnitType) => {
  return records.filter(record => {
    return dayjs(time).isSame(record.time, unit)
  })
}
export const getRecords = (records: MoneyRecord[], option: Partial<MoneyRecord>) => {
  return records.filter(record => {
    for (const key in option) {
      if (!Object.prototype.hasOwnProperty.call(option, key)) continue
      if (record[key] !== option[key]) return false
    }
    return true
  })
}
