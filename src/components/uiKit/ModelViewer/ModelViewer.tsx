import React, { Suspense, useEffect, useRef, useState } from "react";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ModelSpinner, Model } from "@uiKit/index";

import { ModelFileDto } from "@core/types";

type ModelPreviewProps = {
	model: ModelFileDto
}

export const ModelViewer: React.FC<ModelPreviewProps> = (
	{
		model
	}) => {
	const { modelUrl } = model;

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [shouldLoadModel, setShouldLoadModel] = useState<boolean>(false);

	useEffect(() => {
		if(canvasRef.current) {
			const image = canvasRef.current?.toDataURL("image/png").replace("image/png", "image/octet-stream");
			setImageUrl(image);
		}
	}, [canvasRef]);

	const onMouseOver = () => {
		setShouldLoadModel(true);
	};

	return (
		<>
			<Canvas
				ref={canvasRef}
				style={{
					width: "100%",
					height: "200px"
				}}
				shadows 
				dpr={[1, 2]}
				onMouseOver={onMouseOver}
				camera={{ position: [0, 0, 4], fov: 60 }}
			>
				<Suspense fallback={<ModelSpinner />}>
					{
						shouldLoadModel && (
							<>
								<ambientLight intensity={0.7} />
								<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
								<ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
								<Environment preset="city" />
								<Model url={modelUrl} />
								<OrbitControls 
									maxPolarAngle={Math.PI / 2} 
									enableZoom={false} 
									enablePan={false} 
								/>
							</>
						)
					}
				</Suspense>
			</Canvas>
		</>
	)
}