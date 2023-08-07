import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";
import { Box, Button, Rating, Typography } from "@mui/material";

const DetailsPage = () => {
	const { oneProduct, getOneProduct, addRating } = useProductContext();
	const { id } = useParams();
	const [rating, setRating] = useState(5);

	useEffect(() => {
		getOneProduct(id);
	}, []);

	return (
		<div>
			{oneProduct ? (
				<Box>
					<Typography variant="h3">{oneProduct.title}</Typography>
					<Box>
						<Rating value={rating} onChange={(_, value) => setRating(value)} />
						<Button onClick={() => addRating(id, rating)}>Send</Button>
					</Box>
				</Box>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
};

export default DetailsPage;
