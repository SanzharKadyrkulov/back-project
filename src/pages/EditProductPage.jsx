import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function EditProductPage() {
	const { categories, getCategories, oneProduct, getOneProduct, editProduct } =
		useProductContext();
	const navigate = useNavigate();
	const [formValue, setFormValue] = useState({
		title: "",
		description: "",
		price: "",
		image: "",
		category: "",
		stock: "",
	});
	const { id } = useParams();
	useEffect(() => {
		getCategories();
		getOneProduct(id);
	}, []);

	useEffect(() => {
		if (oneProduct) {
			setFormValue({ ...oneProduct, image: "" });
		}
	}, [oneProduct]);

	function handleChange(e) {
		if (e.target.name === "image") {
			setFormValue({
				...formValue,
				image: e.target.files[0],
			});
		} else {
			setFormValue({
				...formValue,
				[e.target.name]: e.target.value,
			});
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			!formValue.title.trim() ||
			!formValue.description.trim() ||
			!formValue.price.trim() ||
			!formValue.category ||
			!formValue.stock
		) {
			return;
		}

		const data = new FormData(event.currentTarget);

		if (!formValue.image) {
			data.delete("image");
			editProduct(id, data);
		} else {
			editProduct(id, data);
		}

		navigate(-1);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5">
						Edit Product
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Title"
							name="title"
							autoFocus
							value={formValue.title}
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="description"
							label="Description"
							value={formValue.description}
							onChange={handleChange}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							name="price"
							label="Price"
							type="number"
							value={formValue.price}
							onChange={handleChange}
						/>

						<FormControl fullWidth>
							<InputLabel>Category</InputLabel>
							<Select
								value={formValue.category}
								onChange={handleChange}
								label="Category"
								name="category"
							>
								{categories.map((category) => (
									<MenuItem key={category.slug} value={category.slug}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<InputLabel>Stock</InputLabel>
							<Select
								value={formValue.stock}
								onChange={handleChange}
								label="Stock"
								name="stock"
							>
								<MenuItem value="in_stock">In stock</MenuItem>
								<MenuItem value="out_of_stock">Out of stock</MenuItem>
							</Select>
						</FormControl>

						<TextField
							margin="normal"
							required
							fullWidth
							type="file"
							name="image"
							onChange={handleChange}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Save
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
