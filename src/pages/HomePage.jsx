import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductItem from "../components/ProductItem";
import { Grid } from "@mui/material";

const HomePage = () => {
	const { getProducts, products } = useProductContext();

	useEffect(() => {
		getProducts();
	}, []);
	console.log(products);
	return (
		<div>
			<Grid container spacing={2} justifyContent="center">
				{products.map((item) => (
					<ProductItem key={item.id} item={item} />
				))}
			</Grid>
		</div>
	);
};

export default HomePage;
