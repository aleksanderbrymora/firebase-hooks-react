# Auth

Here is an example of simple login with password

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
- Sign up with popup with these providers:
	- `google`
	- `facebook`
	- `twitter`
	- `apple`
	- `twitter`
	- `github`
	- `microsoft`
	- `yahoo`
- `signout` - of course a way to sign out

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

### Sign up with email and password

To use this hook you need to pass `'emailPassword'` as the first parameter and an optional callback method - useful for redirects for example.

The way this hook works is that it gives you objects that have their own `onChange` and `onSubmit` handlers with other things inside of them that you simply spread on your inputs to add functionality to. Hook handles the rest.

```jsx
const Signup = () => {
	const [ loading, error, {
		email,
		password,
		signup
	} ] = useAuth('emailPassword', () => console.log('did it work?'));
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

### Sign up with email, password and password confirmation

Similarly to email and password hook, you have to pass `'emailPasswordConfirm'` as the first parameter and optional callback function

```jsx
const SignupConfirm = () => {
	const [ loading, error, {
		email,
		password,
		confirmation,
		onSignup
	} ] = useAuth('emailPasswordConfirm', () => console.log('so performant wowowo'));
	return (
		<form {...onSignup}>
			<input {...email} autoFocus />
			<input {...password} />
			<input {...confirmation} />
			<button disabled={loading} type='submit'>
				Sign up
			</button>
			<p>{JSON.stringify(error)}</p>
		</form>
	);
};
```

### Sign up with Auth Provider

When signing in with provider you must provide a string of which one you want to use:

- `google`
- `facebook`
- `twitter`
- `apple`
- `twitter`
- `github`
- `microsoft`
- `yahoo`

Then you can pass in two additional parameters. First of which is `providerOptions` about which you can learn more [here](https://firebase.google.com/docs/auth/web/google-signin).
The second optional parameter is a callback function.

```jsx
const Google = () => {
	// simple version that works out of the box
	const [loading, error, {popup}] = useAuth('google')
	// or use full version
	const [loading, error, { popup }] = useAuth(
		'google',
		{
			scopes: ['your', 'scopes'],
			customParameters: {}
		},
		() => console.log('yet another callback')
	);
	return (
		<>
			{error && JSON.stringify(error)}
			<button disabled={loading} {...popup}>
				Sign up with Google
			</button>
		</>
	);
};

```