import { useSetFS } from './useSetFS';
import { WriteData } from './write-types';
import { useAddFS } from './useAddFS';
import { useUpdateFS } from './useUpdateFS';

export const useWriteFS = (writeObject: WriteData): [boolean, null | Error] => {
  const {
    operation,
    collection,
    doc,
    merge,
    callback,
    data,
  } = writeObject;

  switch (operation) {
    case 'set':
      return useSetFS({
        collection, doc, data, callback, merge,
      });

    case 'add':
      return useAddFS({ collection, callback, data });

    case 'update':
      return useUpdateFS({
        collection, callback, data, doc,
      });

    default:
      throw new Error('You need to specify a valid operation - \'add\' or \'set\' ');
  }
};
