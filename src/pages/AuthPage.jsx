import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AuthPage() {
	const [isLogin, setIsLogin] = React.useState(true);
	const { register, user, login } = useAuthContext();
	const [showPassword, setShowPassword] = React.useState(false);

	function changeVisibility() {
		setShowPassword(!showPassword);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		if (isLogin) {
			login(data);
		} else {
			register(data);
		}
	};

	if (user) {
		return <Navigate to="/" />;
	}

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
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{isLogin ? "Sign in" : "Sign up"}
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						{!isLogin && (
							<Box
								display="flex"
								alignItems="center"
								justifyContent="space-between"
								gap={5}
							>
								<TextField
									margin="normal"
									required
									fullWidth
									label="First name"
									name="first_name"
									autoFocus
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									label="Last name"
									name="last_name"
								/>
							</Box>
						)}

						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={changeVisibility}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						{!isLogin && (
							<TextField
								margin="normal"
								required
								fullWidth
								name="password_confirmation"
								label="Confirm password"
								type="password"
							/>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{isLogin ? "Sign in" : "Sign up"}
						</Button>
						<Grid container>
							<Grid item xs></Grid>
							<Grid item>
								<Link
									onClick={() => setIsLogin(!isLogin)}
									href="#"
									variant="body2"
								>
									{isLogin
										? "Don't have an account? Sign Up"
										: "Already have an account? Sign In"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
