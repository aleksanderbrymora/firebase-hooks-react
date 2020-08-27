# Write

All of the mutations get timestamps attached to them by default so you dont have to worry about them

## Set

```jsx
// Initialize the hook with parameters
// first is operation, which is a type of change you want to do on the Firestore
// second is a name of the collection in Firestore you want to change
// then there is an object for all of the options - always consult docs if you want to use them
// as they change for different operations, though if you don't pass them they all have defaults

// pro tip - its helpful to read the hook like this:
// const setCity = useWriteFS('set', {/* document in */} 'city', {

const setCity = useWriteFS('set', 'city', {
	merge: true, // default false
});

// Example in a submit action:
// Function needs to be async as the setCity returns a promise
handleSubmit = async () => {
	// we need a try catch block in this async function as writing to db is done over the network,
	// and stuff can always go wrong
	try {
		// need to await the operation to resolve successfully
		// function doesn't return anything so no need to capture the outcome
		await setCity('uidOfTheDocYouWantToChangeOrCreate', {data: 'that', you: 'want', to: 'save'})
		// after its done you can call any other function like redirect to other path:
		props.history.push('/')
	} catch (e) {
		// handle the error. Might have been caused by collection not existing for example
	}
}
```

## Add

```jsx
// same process as with set, so for details have a look above
// same pro-tip as above - its useful to read it like this:
// const setCity = useWriteFS('add', {/* document to */} 'city')

// This time there are no options as we let firestore figure out the id
const addCity = useWriteFS('add', 'city');

// Example in a submit action:
// Function needs to be async as the addCity returns a promise
handleSubmit = async () => {
	try {
		// need to await the operation to resolve successfully
		// function doesn't return anything so no need to capture the outcome
		await addCity({data: 'that', you: 'want', to: 'save'})
		// after its done you can call any other function like redirect to other path:
		props.history.push('/')
	} catch (e) {
		// handle the error. Might have been caused by collection not existing for example
	}
}
```

## Update

```jsx
// Very similar structure to Set function, the difference is only in the string that you have to pass,
// and that there are no extra options to pass
// a reading pro-tip again:
// const setCity = useWriteFS('update', {/* document in */} 'city')
const updateCity = useWriteFS('update', 'city');

// Example in a submit action:
// Function needs to be async as the updateCity returns a promise
handleSubmit = async () => {
	try {
		// we need to know what document you want to update - by passing its id as first arg
		// second parameter is an object of existing values you want to update
		// consult with these docs on what you can actually do with that as there are cool things like increase by one
		// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
		await setCity('uidOfTheDocYouWantToChangeOrCreate', {data: 'that', you: 'want', to: 'save'})
		// after its done you can call any other function like redirect to other path:
		props.history.push('/')
	} catch (e) {
		// handle the error. Might have been caused by collection not existing for example
	}
}
```

## Delete

```jsx
// You might get the theme that these hooks are meant to look very similar and no changes here
// one thing you have to keep in mind that deleting a document doesnt delete its children,
// you can read about it here: https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
const deleteCity = useWriteFS('delete', {/*document in*/} 'city');

// Example in a submit action:
// Function needs to be async as the updateCity returns a promise
handleSubmit = async () => {
	try {
		// we need to know what document you want to delete - we do that by passing its id as first arg
		// It doesnt return anything
		await setCity('uidOfTheDocYouWantToChangeOrCreate')
		// after its done you can call any other function like redirect to other path:
		props.history.push('/')
	} catch (e) {
		// handle the error. Might have been caused by collection not existing for example
	}
}
```

## Delete a field

```jsx
// probably the least useful but still here
// similar to delete action, just accepts an extra argument which is an array of fields to delete
const deleteFieldInCity = useWriteFS('deleteField', {/*in a document in the*/} 'city');

// Example in a submit action:
// Function needs to be async as the deleteFieldInCity returns a promise
handleSubmit = async () => {
	try {
		// we need to know in what document you want to delete passed fields - we do that by passing its id as first arg
		// then we need to know what fields you want to delete, pass them as an array of strings
		// It doesn't return anything
		await setCity('uidOfTheDocYouWantToChangeOrCreate', ['capital', 'population'])
		// after its done you can call any other function like redirect to other path:
		props.history.push('/')
	} catch (e) {
		// handle the error. Might have been caused by collection not existing for example
	}
}

```