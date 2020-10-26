export const getKeyWithPrefix = (key: string, prefix: string = '') => {
  return prefix + '_' + key
}
