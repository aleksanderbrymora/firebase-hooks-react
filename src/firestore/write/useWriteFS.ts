import { useAddFS } from './useAddFS';
import { useDeleteFieldFS } from './useDeleteFieldFS';
import { useDeleteFS } from './useDeleteFS';
import { useSetFS } from './setIn';
import { useUpdateFS } from './useUpdateFS';
import { WriteOperation } from '../write-types';

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
export const useWriteFS = (
  operation: WriteOperation,
  collection: string,
  options: object | string[] | undefined): <First, Second>(
  data: First,
  doc: Second,
) => Promise<void> => {
  // Handling if collection is not passed in.
  if (!collection) throw new Error('You need to specify the collection to set in');
  // Wrong operation is handled by the `default` in the switch

  switch (operation) {
    case 'set':
      // not sure if typecasting fixed it but i cant be bothered anymore
      return useSetFS(collection, options as {merge: boolean} | undefined);

    case 'add':
      return useAddFS(collection);

    case 'update':
      return useUpdateFS(collection);

    case 'delete':
      return useDeleteFS(collection);

    case 'deleteField':
      if (!doc) throw new Error('You need to specify the document you want to delete a field in');
      if (!fields) throw new Error('You need to specify at least one field you want to delete');
      return useDeleteFieldFS({
        collection, doc, callback, fields,
      });

    default:
      throw new Error('You need to specify a valid operation - \'add\' | \'set\' | \'update\' | \'delete\'| \'deleteField\'');
  }
};
