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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddProductPage() {
	const { createProduct, categories, getCategories } = useProductContext();
	const [formValue, setFormValue] = useState({
		title: "",
		description: "",
		price: "",
		image: "",
		category: "",
	});
	useEffect(() => {
		getCategories();
	}, []);

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
			!formValue.image ||
			!formValue.category
		) {
			return;
		}

		console.log(formValue);

		const data = new FormData(event.currentTarget);

		createProduct(data);

		setFormValue({
			title: "",
			description: "",
			price: "",
			image: "",
			category: "",
		});
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
						New Dish
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
									<MenuItem key={category.id} value={category.id}>
										{category.title}
									</MenuItem>
								))}
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
							Add New Product
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
