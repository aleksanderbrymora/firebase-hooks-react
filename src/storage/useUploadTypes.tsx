export interface UploadStatusInformation {
  code: string;
  message: string;
  percentage: string;
  fraction: number;
  downloadUrl: null | string;
}

export interface InputPropsType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: FileList | null
  type: 'file'
  multiple?: boolean
  accept?: string
  capture?: 'accept' | 'user' | 'environment'
}

export interface FormPropsType {
  onSubmit: () => void
}

export interface SubmitButtonType {
  disabled: boolean
  type: 'submit'
  value: string
}

export interface UploadInterface {
  status: UploadStatusInformation
  inputProps: InputPropsType // to be added to the input field for upload functionality
  formProps: FormPropsType // to be spread on the form to add submit action
  submitButtonProps: SubmitButtonType // to be spread on the submit button in the form
  // same thing as in the button handler and formHandler just function on its own
  uploadFunction: () => void
  pause: null | (() => boolean)
  resume: null | (() => boolean)
  cancel: null | (() => boolean)
}

export interface UseUploadOptionalProps {
  accept: string[]
  capture: 'accept' | 'user' | 'environment'
  multiple: boolean
  metadata: object
}

export type ReturnUseUploadType = [boolean, null | Error, UploadInterface]

export const messages = [
  ['initial', 'Add the file'],
  ['input has file', 'Added file, submit it to start the upload'],
  ['uploading', 'Please wait. Your file is uploading'],
  ['fail', 'There has been an error. Please retry'],
  ['done', 'The upload has finished'],
  ['paused', 'Waiting to resume'],
];

export enum StatusNumbers {
  initial = 0,
  hasFile,
  uploading,
  fail,
  done,
  paused
}

export const initialUploadObject: UploadStatusInformation = {
  code: 'initial',
  fraction: 0,
  message: 'Add the file',
  percentage: '0%',
  downloadUrl: null,
};
