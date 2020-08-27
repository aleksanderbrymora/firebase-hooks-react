import { useState, useEffect } from 'react';
import { useSetFS } from './useSetFS';
import { WriteData } from './WriteData';

interface DataWithOperation extends WriteData {
  operation: 'set' | 'add'
}

export const useWriteFS = (writeObject: DataWithOperation) => {
  const {
    operation, collection, doc, merge, callback, data,
  } = writeObject;
  return operation === 'set' ? useSetFS({
    collection, doc, data, callback, merge,
  }) : '';
};
