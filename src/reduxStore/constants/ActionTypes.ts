export const ADD_CATEGORY = 'ADD_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const MODIFY_CATEGORY = 'MODIFY_CATEGORY'


export const ADD_RECORD = 'ADD_RECORD'
export const DELETE_RECORD = 'DELETE_RECORD'
export const MODIFY_RECORD = 'MODIFY_RECORD'

export interface ActionCreator<A> {
  (payload: Payload<A>): A
}
