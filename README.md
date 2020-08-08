# Firebase hooks

## Description

While Firebase is a great way to abstract backend interaction for all devs, I believe it could benefit from some hooks love.

Another reason why I'm writing this project is to make firebase as accessible to new users as I can.
I recently had pretty bad experience with explaining configuration, organisation and usage to few new Web Devs and I believe there is too much that is not explained in the docs explicitly, so I might as well attempt to abstract it with custom hooks.

## TODO

- Firestore hooks
  - [x] read all documents in the collection
  - [ ] get document by id
- Auth hooks
  - Login user
- Realtime DB hooks
- Storage hooks

Stretch goals:

- Static type checking for queries by asking user to input his db structure

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
const [error, loading, data] = useDocumentQuery('name', '==', 'Denver');

// query with configuration
const [error, loading, data] = useDocumentQuery({
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
