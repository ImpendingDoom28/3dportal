import React from "react";

import { Html, useProgress } from "@react-three/drei";

export const ModelSpinner = () => {

	const { progress } = useProgress();

	const fixedProgress = progress.toFixed(2);

	const containerStyles = {
		height: 25,
		width: "100%",
		backgroundColor: "#e0e0de",
		boxShadow: "0 1px 8px -4px #000000",
		borderRadius: 50,
		marginLeft: 0,
		marginRight: 200,
	}

	const fillerStyles = {
		height: "100%",
		width: `${fixedProgress}%`,
		background: "linear-gradient(to right, #B298DC, #EAAFC8)",
		borderRadius: "inherit"
	}

	return (
		<Html
			position={[-2.4, 0.5, 0]}
		>
			<div style={containerStyles}>
				<div style={fillerStyles} />
			</div>
		</Html>
	)
}