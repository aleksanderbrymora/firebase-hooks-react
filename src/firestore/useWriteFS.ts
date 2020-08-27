import { useSetFS } from './useSetFS';
import { WriteData } from './write-types';
import { useAddFS } from './useAddFS';
import { useUpdateFS } from './useUpdateFS';
import { useDeleteFS } from './useDeleteFS';
import { useDeleteFieldFS } from './useDeleteFieldFS';
import { isEmpty } from '../utils/isEmpty';

/**
 * Hook to mutate data in firestore, it takes an object with these params
 * @param operation - is a string that indicates the action.
 * Can be these only: 'add' | 'set' | 'update' | 'deleteField' | 'delete'
 * @param collection - a string pointing to the collection in firestore
 * @param doc - a string pointing to a document (uid) in the previously specified collection
 * @param merge - boolean used only for setting a document indicating if firebase should
 * preserve previously set data on the document or overwrite it with passed in object
 * @param callback - an optional function that will be called when the operation finished
 * @param data - an object that contains the data thats meant to be saved to the firestore
 * @param fields - array of strings only used for `deleteField` action,
 * pointing to which fields in a specified doc should be updated
 * @returns an array of `loading` boolean and `error` object which is either `null` or `Error`
 */
export const useWriteFS = (writeObject: WriteData): () => Promise<void> => {
  const { operation, collection } = writeObject;
  // Handling if collection is not passed in.
  if (!collection) throw new Error('You need to specify the collection to set in');
  // Wrong operation is handled by the `default` in the switch
  // if (isEmpty(data)) throw new Error('You need to specify the data to update to');

  switch (operation) {
    case 'set':
      return useSetFS({
        collection, doc, data, callback, merge,
      });

    case 'add':
      if (!collection) throw new Error('You need to specify the collection to add to');
      if (isEmpty(data)) throw new Error('You need to specify the data to update to');
      return useAddFS({ collection, callback, data });

    case 'update':
      if (!collection) throw new Error('You need to specify the in which collection you want to do an update');
      if (!doc) throw new Error('You need to specify the document you want to set');
      if (isEmpty(data)) throw new Error('You need to specify the data to update to');
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
      throw new Error('You need to specify a valid operation - \'add\' | \'set\' | \'update\' | \'delete\'| \'deleteField\'');
  }
};
