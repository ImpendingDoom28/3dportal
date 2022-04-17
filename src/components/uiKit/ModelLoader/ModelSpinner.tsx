import React from "react";

import { Html, useProgress } from "@react-three/drei";

export const ModelSpinner = () => {

	const { progress } = useProgress();

	return (
		<Html center>{progress} % loaded</Html>
	)
}