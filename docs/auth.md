# Auth



Here is an example of simple login with password

```jsx
const Signup = () => {
	const [ loading, error, { email, password, signup } ] = useAuth('emailPassword');
	return (
		<form {...signup}>
			<input {...email} />
			<input {...password} />
			<button disabled={loading} type="submit">
				Sign up
			</button>
			<p>{JSON.stringify(error)}</p>
		</form>
	);
};
```
And here is an example of login with google with simple callback function

```jsx
const Google = () => {
	const [loading, error, { google }] = useAuth('google', () =>
		console.log('w?'),
	);

	return (
		<button disabled={loading} {...google}>
			Sign up with Google
		</button>
## `useR`

This is a hook that listens to a Authorization state change and indicates that by outputting two variables:

- `loading` - a boolean thats saying is the user being currently fetched
- `user` - false when logged out, firebase user object when logged in

### Usage

```jsx
import { useR } from 'firebase-hooks-react';
const UseR = () => {
	const { loading, user } = useR();
	if (loading) return <p>Be patient...</p>;
	return user ? <Signout /> : <Signup />
};
```

## `useAuth`

Provides multiple actions for authenticating user.

Structure of the hook is static, but one parameter changes based on which method you choose.
Refer to this documentation to see how to use each.

Basic rule for using this hook is that it always returns an array of 3 elements:

```jsx
const [
	loading, // a boolean that tells if the auth process is happening
	error, // either null or an Auth Error object
	data // this is the changing part - it can return objects to spread in the JSX elements, or simple data
] = useAuth('authMethod') // where 'authMethod' is one of the auth methods available
```

Currently supported auth methods:

- `emailPassword` - Sign up with email and password
- `emailPasswordConfirm` - Sign up with email and password with password confirmation
- `google` - Sign up/in with google

### Sign out

Simple method to attach to a button

```jsx
const Signout = () => {
	const [loading, error, { onSignout }] = useAuth('signout');
	const { user } = useR();
	return (
		<>
			<p>{user && user.email}</p>
			{error && <p>{JSON.stringify(error)}</p>}
			<button disabled={loading} {...onSignout}>
				Sign out
			</button>
		</>
	);
};
```