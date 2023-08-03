import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/consts";
import $axios from "../utils/axios";

const authContext = createContext();

export function useAuthContext() {
	return useContext(authContext);
}

const AuthContext = ({ children }) => {
	const [user, setUser] = useState(null);

	async function register({ email, password }) {
		try {
			await axios.post(`${BASE_URL}/account/register/`, {
				email,
				password,
				password_confirm: password,
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function login({ email, password }) {
		try {
			const { data: tokens } = await axios.post(`${BASE_URL}/account/login/`, {
				email,
				password,
			});

			console.log(tokens);

			localStorage.setItem("tokens", JSON.stringify(tokens));

			const { data } = await $axios.get(`${BASE_URL}/account/profile/`);

			setUser(data);
		} catch (e) {
			console.log(e);
		}
	}

	function logout() {
		localStorage.removeItem("tokens");
		setUser(null);
	}

	async function checkAuth() {
		try {
			const tokens = JSON.parse(localStorage.getItem("tokens"));
			if (tokens) {
				const { data } = await $axios.get(`${BASE_URL}/account/profile/`);
				setUser(data);
			} else {
				setUser(null);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const value = {
		user,
		register,
		login,
		logout,
		checkAuth,
	};
	return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;
