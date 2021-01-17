import Scheme, {RuleItem} from 'async-validator'
import {isMoneyType} from "../store/categoriesReducer";

export type ValueOf<T> = T[keyof T];

interface MoneyRecordFilter {
  (record?: MoneyRecord):  Boolean
}

export const getRecordsSumWithFilter = (checker: MoneyRecordFilter) => (records: MoneyRecord[]) => {
  return records.reduce<number>((acc, item) => {
    if (checker(item)) {
      return acc + Math.abs(item.amount);
    } else {
      return acc;
    }
  }, 0)
}

export const getRecordsSum = getRecordsSumWithFilter(() => true)

export const getSumByMoneyType = (moneyType: MoneyType) => (records: MoneyRecord[]) => {
  return getRecordsSumWithFilter((record) => {
    return record?.moneyType === moneyType
  })(records)
}

export const getSumByCategoryId = (categoryId: string) => (records: MoneyRecord[]) => {
  return getRecordsSumWithFilter((record) => {
    return record?.categoryId === categoryId
  })(records)
}

export const getSumByExpenditure = getSumByMoneyType('expenditure')
export const getSumByIncome = getSumByMoneyType('income')

export const getStyle = (elm: HTMLElement, key: string) => {
  return getComputedStyle(elm, null).getPropertyValue(key)
}

const moneyRecordDescriptor:{[index: string]: RuleItem} = {
  categoryId: {
    type: 'string',
    required: true,
    message: '请选择分类',
  },
  moneyType: {
    type: 'string',
    required: true,
    validator: (rule, value) => isMoneyType(value),
    message: '请选择账目类型（收入/支出）'
  },
  amount: {
    type: 'number',
    required: true,
    validator: (rule, value) => value >= 0,
    message: '数值需要大于等于0'
  },
  remarks: {
    type: 'string',
  },
  time: {
    type: 'string',
    required: true,
    message: '请选择时间'
  }
}

const categoryDescriptor:{[index: string]: RuleItem} = {
  icon: {
    type: 'string',
    required: true,
    message: '请选择分类图标'
  },
  name: {
    type: 'string',
    required: true,
    message: '请输入分类名'
  },
  moneyType: {
    type: 'string',
    required: true,
    message: '请选择分类的类型（收入/支出）'
  }
}

export const moneyRecordValidator = new Scheme(moneyRecordDescriptor)
export const categoryValidator = new Scheme(categoryDescriptor)
