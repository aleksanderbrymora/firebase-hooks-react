import { useState, useEffect } from 'react';
import { useFire } from '../context/FirebaseContext';
import { convertToWithUser } from '../utils/convertToWithUser';
import {
  UploadStatusInformation,
  InputPropsType,
  UseUploadOptionalProps,
  StatusNumbers,
  FormPropsType,
  ReturnUseUploadType,
  initialUploadObject,
  messages,
} from './useUploadTypes';

const convertFileToName = (path: string, file: File): string => path.replace(/__file/g, file.name);

const trimPath = (path: string): string => path.trim().replace(/^\//g, '').replace(/\/$/g, '');

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

const createInputProps = (
  fileSetter: (value: React.SetStateAction<FileList | null>) => void,
  statusSetter: (value: React.SetStateAction<number>) => void,
  files: null | FileList,
  options?: UseUploadOptionalProps,
): InputPropsType => {
  const inputHandler: InputPropsType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      statusSetter(StatusNumbers.hasFile);
      fileSetter(e.target.files);
    },
    value: files,
    type: 'file',
  };
  if (options?.accept) inputHandler.accept = options.accept.join(',');
  if (options?.multiple) inputHandler.multiple = options.multiple;
  if (options?.capture) inputHandler.capture = options.capture;

  return inputHandler;
};

const uploadFiles = (
  files: FileList | null,
  path: string,
) => {
  const { storage } = useFire();

  const storageRef = storage!.ref(path);

  if (files) {
    const file = files[0];
    const fileRef = storageRef.child(convertToWithUser(convertFileToName(path, file)));
    // returning a function that will initiate the upload, but not uploading yet
    return () => fileRef.put(file);
  }

  throw new Error("You haven't passed in any files");
};

const createFormProps = (
  statusSetter: (value: React.SetStateAction<number>) => void,
  loadingSetter: (value: React.SetStateAction<boolean>) => void,
  uploadFunction: () => firebase.storage.UploadTask,
  setUploadTask: (value: React.SetStateAction<firebase.storage.UploadTask | null>) => void,
): FormPropsType => ({
  onSubmit: () => {
    loadingSetter(true);
    statusSetter(StatusNumbers.uploading);
    setUploadTask(uploadFunction());
  },
});

export const useUpload = (path: string, options?: UseUploadOptionalProps): ReturnUseUploadType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  // Status messages
  const [statusMessageNumber, setStatusMessageNumber] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatusInformation>(initialUploadObject);

  // Submit button
  const [submitButtonProps, setSubmitButtonProps] = useState({
    value: 'Waiting for a file',
    disabled: true,
    type: 'submit',
  });

  // Files
  const [files, setFiles] = useState<null | FileList>(null);

  // Upload task related stuff
  const [uploadTask, setUploadTask] = useState<null | firebase.storage.UploadTask>(null);
  const [uploadFunctions, setUploadFunctions] = useState<{
    cancel: null |(() => boolean),
    pause: null | (() => boolean),
    resume: null | (() => boolean),
      }>({
        cancel: null,
        pause: null,
        resume: null,
      });

  // used for easier message setting
  useEffect(() => {
    const [code, message] = messages[statusMessageNumber];
    setUploadStatus((u) => ({ ...u, code, message }));
  }, [statusMessageNumber]);

  // used to enable submit button when files are selected
  useEffect(() => {
    if (files && files.length > 1) {
      setSubmitButtonProps({
        value: 'Upload your file',
        disabled: false,
        type: 'submit',
      });
    } else {
      setSubmitButtonProps({
        value: 'Waiting for a file',
        disabled: true,
        type: 'submit',
      });
    }
  }, [files]);

  // updating the stage depending on the files
  useEffect(() => { // todo think this through
    if (files && files.length > 0) {
      setStatusMessageNumber(StatusNumbers.hasFile);
    }
  }, [files]);

  // Updating upload functions based on the creation of upload task
  useEffect(() => {
    if (uploadTask) {
      setUploadFunctions({
        cancel: uploadTask.cancel,
        pause: uploadTask.pause,
        resume: uploadTask.resume,
      });
    } else {
      setUploadFunctions({
        cancel: null,
        pause: null,
        resume: null,
      });
    }
  }, [uploadTask]);

  // Trimming path of extra slashes if present
  const trimmedPath = trimPath(path);

  // Error handling
  validateParams(trimmedPath, options);

  const inputProps = createInputProps(setFiles, setStatusMessageNumber, files, options);

  const uploadTaskFunction = uploadFiles(files, trimmedPath);

  const formProps = createFormProps(
    setStatusMessageNumber,
    setLoading,
    uploadTaskFunction,
    setUploadTask,
  );

  return [loading, error, {
    status: uploadStatus,
    inputProps,
    formProps,
    ...uploadFunctions, // cancel, resume, pause
  }];
};
