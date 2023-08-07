import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import AddProductPage from "../pages/AddProductPage";
import ActivationPage from "../pages/ActivationPage";
import EditProductPage from "../pages/EditProductPage";
import DetailsPage from "../pages/DetailsPage";

const MainRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/add" element={<AddProductPage />} />
				<Route path="/edit/:id" element={<EditProductPage />} />
				<Route path="/details/:id" element={<DetailsPage />} />
			</Route>
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/api/account/activate/" element={<ActivationPage />} />
		</Routes>
	);
};

export default MainRoutes;
