import {v4 as uuid} from "uuid";

export const getKeyWithPrefix = (key: string, prefix: string = '') => {
  return prefix + '_' + key
}

export const generateId = (prefix: string = '') => prefix + uuid()

export function isMoneyType(type: string) {
  return type === 'income' || type === 'expenditure';
}