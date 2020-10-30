import {v4 as uuid} from 'uuid'
import {Reducer} from "react";

export const getKeyWithPrefix = (key: string, prefix: string = '') => {
  return prefix + '_' + key
}

export const generateId = (prefix:string = '') => prefix + uuid()

// 一个返回reducer的高阶函数，函数中对原有reducer的结果进行本地持久化存储
export const reducerWithLocalStorage = <S, A>(reducer: Reducer<S, A>, key: string) => (state:S, action:A):S => {
  const newState = reducer(state, action)
  localStorage.setItem(key, JSON.stringify(newState))
  return newState
}
