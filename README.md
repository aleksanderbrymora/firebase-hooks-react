# Firebase hooks

## Description

While Firebase is a great way to abstract backend interaction for all devs, I believe it could benefit from some hooks love.

Another reason why I'm writing this project is to make firebase as accessible to new users as I can.
I recently had pretty bad experience with explaining configuration, organisation and usage to few new Web Devs and I believe there is too much that is not explained in the docs explicitly, so I might as well attempt to abstract it with custom hooks.

## Usage

```js
// Add these to index.js
import { FirebaseContextCreate } from 'firebase-hooks'; // todo come up with name
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const Firebase = FirebaseContextCreate(
	{
		apiKey: 'api-key',
		authDomain: 'project-id.firebaseapp.com',
		databaseURL: 'https://project-id.firebaseio.com',
		projectId: 'project-id',
		storageBucket: 'project-id.appspot.com',
		messagingSenderId: 'sender-id',
		appId: 'app-id',
		measurementId: 'G-measurement-id',
	},
	['firestore', 'auth', 'database', 'storage'],
); //add only what you need to this array

ReactDOM.render(
	<React.StrictMode>
		<Firebase>
			<App />
		</Firebase>
	</React.StrictMode>,
	document.getElementById('root'),
);

// Then in any child component import hooks that you need
import { useReadCollection } from 'firebase-hooks/firestore';
const App = () => {
	const [error, loading, data] = useReadCollection('posts');
	return (
		<div className='App'>
			{error && JSON.stringify(error)}
			{loading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}
		</div>
	);
};
```

## TODO

- Main
  - [ ] cache (maybe?)
    - [ ] add caching for the responses from databases
    - [ ] add a flag thats saying data is stale and its currently loading
  - [ ] add provider element for hooks to utilise. The idea is to create a custom provider that has access to firebase functions wrapped with hooks, so the user has to only wrap his `<App/>` with provider, then hooks will be configured to consume that context.
- Firestore hooks
  - [x] read all documents in the collection
  - [ ] get document by id
- Auth hooks
  - [ ] Login user
  - [ ] Add current user lookup function
  - [ ] Sign up user
  - [ ] Hooks for all signup methods
- Realtime DB hooks
- Storage hooks

Stretch goals:

- Static type checking for queries by asking user to input his db structure
- Dynamic imports of for only needed firebase parts, ie only `import "firebase/firestore"` when actually using firestore

## Firestore

There are two main groups of operations: **Global search** and **User search**. They are basically the same, but the _User Search_ is only searching data related to current user.

For now these two types work the same, but in the `path` variable, passed into a hook you have the ability to pass a string called `__FIRE_USER'` (ex: `__FIRE_USER/posts`) which will be parsed by a hook and will input currently logged in user's id. That variable will also be used for filtering.
_Note_ this variable is subject to change and will be defined in one place

#### Operations

- Get whole collection
- Get one doc by id
- Get docs by filter query

```js
// simple query
// todo add `fromCache`
const [error, loading, data] = useDocumentQuery('posts', 'test');

// query with configuration
const [error, loading, data] = useDocumentQuery({
	collection: 'cities',
	query: [
		['state', '==', 'CO'],
		['name', '==', 'Denver'],
	],
	query: ['state', '==', 'CO'], // also support not nested queries
	limit: 3,
	orderBy: 'name',
	order: 'desc',
	startAt: 100000,
	endAt: 200000,
});
```

- Add doc to collection
- Set doc in the collection (similar to add, but overwrites if already exists)

### Credits

- [Using firebase with react hooks](https://benmcmahen.com/using-firebase-with-react-hooks/)
- [Building custom React Hooks to fetch data from Firebase Firestore](https://www.williamkurniawan.com/blog/building-custom-react-hooks-to-fetch-data-from-firebase-firestore)
- [useAuth hook](https://usehooks.com/useAuth/)
- [lazy loading elements](https://medium.com/@prawira/react-conditional-import-conditional-css-import-110cc58e0da6)
