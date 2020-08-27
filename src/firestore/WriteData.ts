export interface WriteData {
  collection: string;
  doc: string;
  data: object;
  merge?: boolean;
  callback?: () => void;
}
