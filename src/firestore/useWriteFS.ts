import { useSetFS } from './useSetFS';
import { WriteData } from './write-types';
import { useAddFS } from './useAddFS';
import { useUpdateFS } from './useUpdateFS';
import { useDeleteFS } from './useDeleteFS';
import { useDeleteFieldFS } from './useDeleteFieldFS';

export const useWriteFS = (writeObject: WriteData): [boolean, null | Error] => {
  const {
    operation,
    collection,
    doc,
    merge,
    callback,
    data,
    fields,
  } = writeObject;

  switch (operation) {
    case 'set':
      if (!collection) throw new Error('You need to specify the collection to set in');
      if (!doc) throw new Error('You need to specify the document you want to set');
      if (Object.keys(data).length === 0 && data.constructor === Object) throw new Error('You need to specify the data to update to');
      return useSetFS({
        collection, doc, data, callback, merge,
      });

    case 'add':
      if (!collection) throw new Error('You need to specify the collection to add to');
      if (Object.keys(data).length === 0 && data.constructor === Object) throw new Error('You need to specify the data to update to');
      return useAddFS({ collection, callback, data });

    case 'update':
      if (!collection) throw new Error('You need to specify the in which collection you want to do an update');
      if (!doc) throw new Error('You need to specify the document you want to set');
      if (Object.keys(data).length === 0 && data.constructor === Object) throw new Error('You need to specify the data to update to');
      return useUpdateFS({
        collection, callback, data, doc,
      });

    case 'delete':
      if (!collection) throw new Error('You need to specify the in which collection you want to delete a document');
      if (!doc) throw new Error('You need to specify the document you want to delete');
      return useDeleteFS({ collection, doc, callback });

    case 'deleteField':
      if (!collection) throw new Error('You need to specify the in which collection you want to edit the document');
      if (!doc) throw new Error('You need to specify the document you want to delete a field in');
      if (!fields) throw new Error('You need to specify at least one field you want to delete');
      return useDeleteFieldFS({
        collection, doc, callback, fields,
      });

    default:
      throw new Error('You need to specify a valid operation - \'add\' or \'set\' ');
  }
};
