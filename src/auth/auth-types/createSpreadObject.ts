import { InputObject } from '../types';

/**
 * Creates an object to be spread on the input field
 * @param value - contents for the input field
 * @param type - type of the input filed
 * @param setter - setter function (set part of hook) for the state of input
 * @param required - is the field required
 * @returns {InputObject} object thats meant to be spread on the input field
 */
export const createSpreadObject = (
  value: string,
  type: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  required: boolean = true,
): InputObject => ({
  value,
  type,
  required,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value),
});
