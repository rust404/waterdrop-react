import Scheme, {RuleItem} from 'async-validator'
import {isMoneyType} from "../store/categoriesReducer";

export type ValueOf<T> = T[keyof T];

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
    validator: (rule, value) => value !== 0,
    message: '数值不能为0'
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
