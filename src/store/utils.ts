import {v4 as uuid} from 'uuid'

export const getKeyWithPrefix = (key: string, prefix: string = '') => {
  return prefix + '_' + key
}

export const generateId = (prefix:string = '') => prefix + uuid()

interface Rule {
  validator?: (value: any) => boolean
  required?: boolean
  errorMsg?: string
}

export const validateRecord = (record: Partial<MoneyRecord>) => {
  const rules: {[index: string]: Rule} = {
    time: {},
    moneyType: {},
    categoryId: {},
    amount: {},
    remarks: {},
  }
  for (let i in rules) {
    if (!Object.prototype.hasOwnProperty.call(rules, i)) continue
    const rule = rules[i]
    if (rule.required && record[i] === undefined) {
      return
    }
  }
}

