import React from 'react';
import { useReadCollection } from './firebase-hooks';

const App: React.FC = () => {
	const [error, loading, data] = useReadCollection('posts');
	return (
		<div className='App'>
			{error && JSON.stringify(error)}
			{loading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}
		</div>
	);
};

export default App;
