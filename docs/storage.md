# Storage

## brain-dump 🧠

- Add button that takes care of the whole image upload
- div that supports drag and drop
- note that someone should make them accessible like this: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Using_file_inputs

## flow 🌊

trying out this idea of cramming everything together

### useStorage

```js
return [loading, error, {
  getDownloadUrl, // function that takes in a path either to the file (which returns a download url for the file) or a path to the folder (which returns an array of all files in that folder (for more granular control over that use `paginate`)).
  initDownload, // same as above, but doesn't show the download link, but initiates the download
  delete, // same stuff - takes in a path and deletes a file
  paginate, // details here: https://firebase.google.com/docs/storage/web/list-files#paginate_list_results; takes a max results number and returns items, prefixes and next() function to re-trigger search for the next items
} = useStorage(
  // optional prefix - it's useful, for example, when you want to nest your queries behind a user id, so you don't have to type it out all the time, pass undefined if you just want to use suffix
  '__user/files' // note that when passing prefix cant pass your own file extension as it needs to be a folder - will throw an error if you do
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
    downloadUrl, // normally null but when upload is done its populated
  },
  inputHandler, // object to spread on the input, has type, onChange
  formHandler, // object to spread on submit button to submit added file, disabled until file is added
  buttonHandler, // object to be spread on the button if someone doesnt want the form
  uploadFunction, // simple function thats a part of the spreadToSubmit that purely uploads the files, useful when not wanting to add a submit button
  pause, // function to pause the upload
  resume, // function to resume the paused upload
  cancel, // function to cancel the ongoing upload
}] = useUpload(
  'path/image.png' // must be a full path to the file, can use these: `__user` and `__file` for things like `__user/__file`. These will be switched out, accordingly, for id of the user and full filename with extension. Will error out without authorized user.
  { // all of these are optional
    accept: ['.jpg', 'image/*'], // and all the other types - more info [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)
    capture: 'accept' | 'user' | 'environment',
    metadata: {
      // all of the metadata that the user might want to attach to the file, here are docs https://firebase.google.com/docs/storage/web/upload-files#add_file_metadata
    },
  }
  )
```

### useInitialFiles

Used to fetch files needed for the initial render, like icons, or background images

Takes an object of names you want to give to the files and their paths and returns that object with paths converted to download links.
Also can take an optional prefix to prepend to the path before any object.

Caveats:
- Supports only one-level-deep object now
- if you use `__user` in the path and someone is not logged in that path it will be removed from that object and only re-fetched when user authorizes. That will be mentioned in the error object and is to be handled by you or purely ignored
- remember that all `/` on the bounds of the path are stripped out and you don't need to write them

__The path you pass is important.__
If you don't pass any extension at the end of the path - it will be replaced with an array of download urls for every file in that path.
If you do pass the extension it will look for one particular file.

And since its hard to explain here is the example:

#### Using the array

```js
[loading, error, files] = useInitialFiles({
  profilePicture: '__user/profile.jpg',
  someNestedFile: 'some/nested/file.png',
  favSongs: 'songs'
})

// what will be in files is this object once its fetched, of course matching your data, not this generic stuff
files === {
  profilePicture: 'gs://bucket/skdofl47983lkdsf93/profile.jpg', // this field will be removed if user is not authorized
  someNestedFile: 'gs://bucket/some/nested/file.png',
  favSongs: ['gs://bucket/songs/file.wav', 'gs://bucket/songs/some-song.mp3']
}
```

```js
[loading, error, files] = useInitialFiles({
  profilePicture: 'profile.jpg',
  someNestedFile: 'some/nested/file.png',
  favSongs: 'songs'
}, '__user/files') // note that the object will be empty if the user is not authorized in this case

// what will be in files is this object once its fetched, of course matching your data, not this generic stuff
files === {
  profilePicture: 'gs://bucket/slkdj34kdfg789/files/profile.jpg',
  someNestedFile: 'gs://bucket/slkdj34kdfg789/files/some/nested/file.png',
  favSongs: ['gs://bucket/slkdj34kdfg789/files/songs/file.wav','gs://bucket/slkdj34kdfg789/files/songs/some-song.mp3']
}
```