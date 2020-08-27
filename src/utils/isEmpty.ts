/* eslint-disable max-len */
export const isEmpty = (obj: any): boolean => Object.keys(obj).length === 0 && obj.constructor === Object;
