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
	);
};
```