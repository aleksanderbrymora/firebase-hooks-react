# Storage

## brain-dump

- Add button that takes care of the whole image upload
- div that supports drag and drop
- note that someone should make them accessible like this: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Using_file_inputs

## flow

```js
return [loading, error {
  spreadToInput, // object to spread on the input, has type, onChange
  spreadToSubmit, // object to spread on submit button to submit added file, disabled until file is added
  uploadFunction, // simple function thats a part of the spreadToSubmit that purely uploads the files, useful when not wanting to add a submit button
  progress, // an object with status of whats happening, read here
  pause,
  resume,
  cancel
}] = useUpload(
  'path',
  { // all of these are optional
    accept: ['.jpg', 'image/*'], // and all the other types - more info [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)
    capture: 'accept' | 'user' | 'environment',
    multiple: true | false,
    metadata: {
      // all of the metadata that the user might want to attach to the file, here are docs in FB https://firebase.google.com/docs/storage/web/upload-files#add_file_metadata
    },
    name: '__user-stuff' | 'someOtherName' | 'prefix-__original' // defaults to just original name if not passed
  }
  )
```
