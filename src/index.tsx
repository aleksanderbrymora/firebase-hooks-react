import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CreateFirebaseContext } from './firebase-hooks';

const Firebase = CreateFirebaseContext(
	{
		apiKey: 'AIzaSyBSRTRgDkPvJvt9Ub-1ttCSaUopOPimv80',
		authDomain: 'hooksies123.firebaseapp.com',
		databaseURL: 'https://hooksies123.firebaseio.com',
		projectId: 'hooksies123',
		storageBucket: 'hooksies123.appspot.com',
		messagingSenderId: '705806228715',
		appId: '1:705806228715:web:02ec668242568d339a72ae',
		measurementId: 'G-P6TEK34DPZ',
	},
	['auth', 'database', 'firestore', 'storage'],
);

ReactDOM.render(
	<React.StrictMode>
		<Firebase>
			<App />
		</Firebase>
	</React.StrictMode>,
	document.getElementById('root'),
);
