import React, { createContext, useContext } from "react";

const authContext = createContext();

export function useAuthContext() {
	return useContext(authContext);
}

const AuthContext = ({ children }) => {
	const value = {};
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;
