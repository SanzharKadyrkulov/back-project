import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { BASE_URL } from "../utils/consts";
import $axios from "../utils/axios";

const productContext = createContext();

export function useProductContext() {
	return useContext(productContext);
}

const initState = {
	products: [],
	oneProduct: null,
	categories: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "products":
			return { ...state, products: action.payload };
		case "oneProduct":
			return { ...state, oneProduct: action.payload };
		case "categories":
			return { ...state, categories: action.payload };
		default:
			return state;
	}
}

const ProductContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initState);

	async function getProducts() {
		try {
			const { data } = await $axios.get(`${BASE_URL}/products/`);
			dispatch({
				type: "products",
				payload: data.results,
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function createProduct(product) {
		try {
			await $axios.post(`${BASE_URL}/products/`, product);
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteProduct(id) {
		try {
			await $axios.delete(`${BASE_URL}/products/${id}/`);
			getProducts();
		} catch (e) {
			console.log(e);
		}
	}

	async function getCategories() {
		try {
			const { data } = await $axios.get(`${BASE_URL}/category/list/`);
			dispatch({
				type: "categories",
				payload: data.results,
			});
		} catch (e) {
			console.log(e);
		}
	}

	const value = {
		products: state.products,
		oneProduct: state.oneProduct,
		categories: state.categories,
		getProducts,
		createProduct,
		getCategories,
		deleteProduct,
	};
	return (
		<productContext.Provider value={value}>{children}</productContext.Provider>
	);
};

export default ProductContext;
