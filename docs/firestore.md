#### Operations

-    Get whole collection
-    Get one doc by id
-    Get docs by filter query

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