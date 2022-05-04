import React from "react";

import { Html, useProgress } from "@react-three/drei";

export const ModelSpinner = () => {

	const { progress } = useProgress();

	const fixedProgress = progress.toFixed(2);

	const containerStyles = {
		height: 15,
		width: "100%",
		backgroundColor: "#000000aa",
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

	const labelStyles = { 
		display: "flex", 
		alignItems: "center", 
		justifyContent: "center",
	}

	return (
		<Html
			position={[-2.7, 0.3, 0]}
		>
			<div style={containerStyles}>
				<div style={fillerStyles} />
				<span style={labelStyles}>
					{"Загрузка 3D модели"}
				</span>
			</div>
		</Html>
	)
}