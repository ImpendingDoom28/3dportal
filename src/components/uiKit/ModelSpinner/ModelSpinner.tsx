import React from "react";

import { Html, useProgress } from "@react-three/drei";
import { Progress } from "semantic-ui-react";

export const ModelSpinner = () => {

	const { progress } = useProgress();

	console.log(progress);

	return (
		<Html
			style={{
				position: "relative",
				width: `${400}px`
			}}
		>
			<Progress 
				style={{
					position: "absolute",
					top: 0,
					left: 0
				}}
				size="medium"
				percent={progress}
				indicating 
				progress
			/>
		</Html>
	)
}