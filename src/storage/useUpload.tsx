import { useState, useEffect } from 'react';

interface UploadStatusInformation {
  code: string
  message: string
  percentage: string
  fraction: number
  downloadUrl: null | string
}

interface InputHandlerType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  type: string
}

interface FormHandlerType {
  onSubmit: () => void
}

interface ButtonHandlerType {
  onClick: () => void
  disabled: boolean
}

interface UploadInterface {
  status: UploadStatusInformation
  inputHandler: InputHandlerType // to be added to the input field for upload functionality
  formHandler: FormHandlerType // to be spread on the form to add submit action
  buttonHandler: ButtonHandlerType // to be on the button instead of in the form
  // same thing as in the button handler and formHandler just function on its own
  uploadFunction: () => void
  pause: () => void
  resume: () => void
  cancel: () => void
}

interface UseUploadOptionalProps {
  accept: string
  capture: 'accept' | 'user' | 'environment'
  multiple: boolean
  metadata: object
}

type ReturnUseUploadType = [boolean, null | Error, UploadInterface]

const messages = [
  ['initial', 'Add the file'],
  ['input has file', 'Added file, submit it to start the upload'],
  ['uploading', 'Please wait. Your file is uploading'],
  ['fail', 'There has been an error. Please retry'],
  ['done', 'The upload has finished'],
  ['paused', 'Waiting to resume'],
];

enum StatusNumbers {
  initial = 0,
  hasFile,
  uploading,
  fail,
  done,
  paused
}

const initialUploadObject: UploadStatusInformation = {
  code: 'initial',
  fraction: 0,
  message: 'Add the file',
  percentage: '0%',
  downloadUrl: null,
};

const validateParams = (path: string, options?: UseUploadOptionalProps): void => {
  // Checking if path contains at least one letter dot and one letter
  // and if it doesn't contain whitespace
  if (!/\w+\.\w+/.test(path) && /\s/.test(path)) throw new Error('Please pass valid path');

  // options validation
  if (options) {
    // validating accept type for the input
    if (!Array.isArray(options.accept)) throw new Error('Accept must be an array of strings that are types of acceptable input filetypes');
    if (options.accept.some((a) => typeof a !== 'string')) throw new Error('All of the options must be strings');

    // validating capture type
    const op = options.capture;
    if (op !== 'accept' && op !== 'user' && op !== 'environment') {
      throw new Error('Options must be one of these: \'accept\' | \'user\' | \'environment\'');
    }

    // checking if multiple is a boolean
    if (typeof options.multiple !== 'boolean') {
      throw new Error('Multiple specifies if you want to add more than one file, hence must be a boolean');
    }

    if (typeof options.metadata !== 'object') {
      throw new Error('Metadata must be an object. Read more about it here https://firebase.google.com/docs/storage/web/upload-files#add_file_metadata');
    }
  }
};

export const useUpload = (path: string, options?: UseUploadOptionalProps): ReturnUseUploadType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [statusMessageNumber, setStatusMessageNumber] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatusInformation>(initialUploadObject);

  // used for easier message setting
  useEffect(() => {
    const [code, message] = messages[statusMessageNumber];
    setUploadStatus((u) => ({
      ...u,
      code,
      message,
    }));
  }, [statusMessageNumber]);

  // Trimming path of extra slashes if present
  const trimmedPath = path.trim().replace(/^\//g, '').replace(/\/$/g, '');

  // Error handling
  validateParams(trimmedPath, options);

  const inputHandler: InputHandlerType = {
    onChange: () => {
      setLoading(true);
      setStatusMessageNumber(StatusNumbers.hasFile);
    },
  };

  return [loading, error, {
    status: uploadStatus,
  }];
};
