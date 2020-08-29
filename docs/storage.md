# Storage

## brain-dump

- Add button that takes care of the whole image upload
- div that supports drag and drop
- note that someone should make them accessible like this: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Using_file_inputs

## flow

trying out this idea of cramming everything together

probably need to split up upload and the rest as there is just so much to the upload

### useStorage

```js
return [loading, error, {
  getDownloadUrl, // function that takes in a path to the file (based on the previously passed in path when initializing the hook) and returns a download url for the file
  initDownload, // same as above, but doesn't show the download link, but initiates the download
  delete, // same stuff - takes in a path and deletes a file
  paginate, // details here: https://firebase.google.com/docs/storage/web/list-files#paginate_list_results; takes a max results number and returns items, prefixes and next() function to re-trigger search for the next items
  listAll, // takes in an object with: `recurse`: boolean, `prefixes`: boolean, `items` boolean
} = useStorage(
  // these are fully optional, you can easily omit them
  // prefix is useful, for example, when you want to nest your queries behind a user id, so you don't have to type it out all the time, pass undefined if you just want to use suffix
  // suffix is useful if you just want to fetch one filetype and you just cant be bothered to type it out by hand. Not too useful but hey, it's here
  {prefix: '__user/files', suffix: '.jpg'} // note that when passing suffix like that you cant pass your own file extensions when writing out the path later
)
```

### useUpload

```js
return [loading, error, {
  status: { // an object with status of whats happening, read here https://firebase.google.com/docs/storage/web/upload-files#manage_uploads"
    code, // strings of status messages of whats happening, things like paused, uploading, cancelled - todo figure out all of them
    message, // nice versions of those code messages - 'paused' = 'Upload is currently paused, please resume to finish the upload' or some other shit
    percentage, // (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + '%'
    fraction, // snapshot.bytesTransferred / snapshot.totalBytes
  },
  inputHandler, // object to spread on the input, has type, onChange
  formHandler, // object to spread on submit button to submit added file, disabled until file is added
  uploadFunction, // simple function thats a part of the spreadToSubmit that purely uploads the files, useful when not wanting to add a submit button
  pause, // function to pause the upload
  resume, // function to resume the paused upload
  cancel, // function to cancel the ongoing upload
  downloadLing, // normally null but when upload is done its populated
}] = useUpload(
  'path/image.png' // must be a full path to the file, can use these: `__user` and `__file` for things like `__user/__file`. These will be switched out, accordingly, for id of the user and full filename with extension
  { // all of these are optional
    accept: ['.jpg', 'image/*'], // and all the other types - more info [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)
    capture: 'accept' | 'user' | 'environment',
    multiple: true | false,
    metadata: {
      // all of the metadata that the user might want to attach to the file, here are docs https://firebase.google.com/docs/storage/web/upload-files#add_file_metadata
    },
  }
  )
```

### useInitialFiles

Used to fetch files needed for the initial render, like icons, or background images

Takes an object of names you want to give to the files and their paths and returns that object with paths converted to download links.
Also can take an optional prefix and suffix in an object (have a look at the second example)
And since its hard to explain here is the example:

#### Using the array

```js
[loading, error, files] = useInitialFiles({
  profilePicture: '__user/profile.jpg',
  someNestedFile: 'some/nested/file.png',
  favSong: 'file.wav'
})

// what will be in files is this object once its fetched, of course matching your data, not this generic stuff
files === {
  profilePicture: 'gs://bucket/skdofl47983lkdsf93/profile.jpg',
  someNestedFile: 'gs://bucket/some/nested/file.png',
  favSong: 'gs://bucket/file.wav'
}
```

```js
[loading, error, files] = useInitialFiles({
  profilePicture: 'profile',
  someNestedFile: 'some/nested/file',
  favSong: 'file'
}, {prefix: '__user/files', suffix: '.jpg'}) // note that when passing suffix like that you cant pass your own file extensions

// what will be in files is this object once its fetched, of course matching your data, not this generic stuff
files === {
  profilePicture: 'gs://bucket/slkdj34kdfg789/files/profile.jpg',
  someNestedFile: 'gs://bucket/slkdj34kdfg789/files/some/nested/file.jpg',
  favSong: 'gs://bucket/slkdj34kdfg789/files/file.jpg'
}
```

## probably wont be used 💀

### download

```js
return [loading, error, {
  downloadUrl, // takes a name of the file as parameter and returns a url pointing to the file
  initDownload, // function that will trigger a download of the file
}] = useDownload(
  'path', // can be either a path, url (gs://bucket...), or a ref (https://firebasestorage...)
)
```

### metadata
```js
return [loading, error, {
  get, // a function that fetches metadata of the object
  update, // function to update the metadata
}]
```

### delete
```js
return [loading, error, delete] = useDeleteFile( // the delete is a function that
  'path/image.jpg', // can be either a path, url (gs://bucket...), or a ref (https://firebasestorage...)
)
```
