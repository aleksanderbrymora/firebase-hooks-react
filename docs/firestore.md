# Write

Writing to the Firestore is simple too! All you need to do is import a hook that you want to use and initialize it with a string pointing to the collection you'll do the operation on.
You'll always get an array of:
- `loading` state, that indicates if the process is underway. Useful for disabling a button after submission or showing a spinner.
- `error`  which by default is `null`, but when there is a problem with be populated with an error message created by firebase
- `function` that does the action that you requested, by calling chosen hook

All of the hooks take `collection` string as a parameter. Have a look at the examples below for more in detail information about that, and occasional extra parameters.

All of the mutations get timestamps attached to them by default so you don't have to worry about them

Also all of the mutation hooks support passing in a string of `__user` to indicate that you want to replace it with currently logged in user id. [Read more about how that works here](./other.md)

## `useSet`

Use when you have an id of thing you want to change or if you want to create an item with given id.

`useSet` takes two arguments. Besides, as always, a `collection` string, it also takes an optional `merge` boolean (default `false`) that specifies if you want to keep previous values or overwrite the whole document with passed in object.

The `setFunction` it returns takes two arguments:
- `uid` of the document you want to set
- `data` object you want to set it to

### Example

```jsx
import React, { useState } from 'react';
import { useSet } from 'firebase-hooks-react';

const App = () => {
	// we need to point the hook to the collection with the parameter string
	const [loading, error, setName] = useSet('names', {/* optional merge boolean */} true);
	const [name, setNameField] = useState('')

  const onSubmit = (e) => {
		e.preventDefault();
		// then we can use it wherever we want, like in this submit function
		// that sends an object to the database with key of name and value of name (thats in the state)
    setName('testing', { name });
  };

  return (
    <div className='App'>
      <form onSubmit={onSubmit}>
				<input type='text' value={name} onChange={e => setNameField(e.target.value)} />
        {/* useful thing is using loading boolean for disabling the button */}
				<input type='submit' value='Change your name' disabled={loading} />
        {/* you should probably do some more error handling than this, but its quick and dirty and does the work here */}
        {error && JSON.stringify(error)}
      </form>
    </div>
  );
};

export default App;
```

## `useAdd`

Use when you don't want to think about what id you want to give something, you just want to add a new doc to the collection. Only takes a `collection` string.

The `addFunction` that the hook returns takes one argument:
- `data` object containing the data you want to add.

### Example

```jsx
import React, { useState } from 'react';
import { useAdd } from 'firebase-hooks-react';

const App = () => {
	// we need to point the hook to the collection with the parameter string
	const [loading, error, addName] = useAdd('names');
	const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
		// then we can use it wherever we want
    addName({ name });
  };

  return (
    <div className='App'>
      <form onSubmit={onSubmit}>
        <input type='text' value={name} onChange={e => setName(e.target.value)} />
        {/* useful thing is using loading boolean for disabling the button */}
        <input type='submit' value='Add new name' disabled={loading} />
        {error && JSON.stringify(error)}
      </form>
    </div>
  );
};

export default App;
```

## `useUpdate`

Useful if you have a document that you know the id of and you want to update one field in it. Pretty much the same as using the `useSet` hook with merge set to true. Takes only a `collection` string.

The `updateFunction`, that the hook returns, takes two arguments:
- `uid` of the document you want to update
- `data` object with fields that you want to update in a document

```jsx
import React, { useState } from 'react';
import { useUpdate } from 'firebase-hooks-react';

const App = () => {
	// we need to point the hook to the collection with the parameter string
	const [loading, error, updateName] = useUpdate('names');
	const [name, setName] = useState('')

  const onSubmit = (e) => {
		e.preventDefault();
		// then we can use it wherever we want
    updateName('testing', { name });
  };

  return (
    <div className='App'>
      <form onSubmit={onSubmit}>
        <input type='text' value={name} onChange={e => setName(e.target.value)} />
        {/* useful thing is using loading boolean for disabling the button */}
        <input type='submit' value='Change your name' disabled={loading} />
        {error && JSON.stringify(error)}
      </form>
    </div>
  );
};

export default App;
```

## `useDelete`

Simply deletes a document in the firebase, based on the id that you give it. Takes a `collection` string as always.

The `deleteFunction`, that the hook returns, takes one argument:
- `uid` of the document you want to delete

```jsx
import React from 'react';
import { useDelete } from 'firebase-hooks-react';

const App = () => {
	// we need to point the hook to the collection with the parameter string
	const [loading, error, deleteName] = useDelete('names');

  const handleClick = () => {
		// then we can use it wherever we want
    deleteName('testing');
  };

  return (
    <button value='Delete some name' onClick={handleClick} />
  );
};

export default App;
```

## `useDeleteFields`

Only deletes specified fields from a chosen document

The `deleteFieldsFunction`, that the hook returns, takes two arguments:
- `uid` of the document you want to update
- `fields` which is an array of strings of fields that you want to delete in a document

```jsx
import React from 'react';
import { useDeleteFields } from 'firebase-hooks-react';

const App = () => {
	// we need to point the hook to the collection with the parameter string
	const [loading, error, deleteFieldsInName] = useDelete('names');

  const handleClick = () => {
		// then we can use it wherever we want
    deleteFieldsInName('testing', ['name']);
  };

  return (
    <button value='Delete some fields in name' onClick={handleClick} />
  );
};

export default App;
```