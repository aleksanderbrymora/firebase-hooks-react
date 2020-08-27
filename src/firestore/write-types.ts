export interface SetData {
  collection: string;
  doc: string;
  data: object;
  merge?: boolean;
  callback?: () => void;
}

export interface UpdateData {
  collection: string;
  doc: string;
  data: object;
  callback?: () => void;
}

export interface AddData {
  collection: string
  data: object
  callback?: (id: string) => void
}

export interface WriteData {
  operation: 'add' | 'set' | 'update'
  collection: string;
  doc: string;
  data: object;
  merge?: boolean;
  callback?: () => void;
}
