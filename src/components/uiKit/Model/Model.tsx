import React, { useEffect, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { GLTFResult, parse } from "@core/modules";

type ModelProps = {
	url: string;
}

export const Model: React.FC<ModelProps> = ({ url }) => {

	const [loadedJsx, setLoadedJsx] = useState<JSX.Element | null>(null);

	const gltfResult = useGLTF(url) as GLTFResult;

	useEffect(() => {
		if(!loadedJsx) {
			setLoadedJsx(parse(gltfResult));
		}
	}, [loadedJsx, setLoadedJsx, gltfResult]);


	return loadedJsx;
}