import React from 'react';
import { AuthContext } from './AuthContext';

const ProvideAuth: React.FC = ({ children }) => {
	return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default ProvideAuth;
