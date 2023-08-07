import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useSearchParams } from "react-router-dom";

const LiveSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { setPage } = useProductContext();
	const [search, setSearch] = useState(searchParams.get("search") || "");

	const [firstMount, setFirstMount] = useState(true);

	useEffect(() => {
		if (firstMount) {
			setFirstMount(false);
			return;
		}
		const currentParams = Object.fromEntries([...searchParams]);
		setSearchParams({
			...currentParams,
			search,
		});
		setPage(1);
	}, [search]);

	return (
		<div>
			<TextField
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				label="Search"
			/>
		</div>
	);
};

export default LiveSearch;
