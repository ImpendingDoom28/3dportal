import React, { Suspense, useRef, useState } from "react";

import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei";
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
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
	const [shouldLoadModel, setShouldLoadModel] = useState<boolean>(false);

	// TODO: Add preview image support
	// const [imageUrl, setImageUrl] = useState<string | null>(null);
	// useEffect(() => {
	// 	if(canvasRef.current) {
	// 		const image = canvasRef.current?.toDataURL("image/png").replace("image/png", "image/octet-stream");
	// 		setImageUrl(image);
	// 	}
	// }, [canvasRef]);

	const onMouseEnter = () => {
		console.log("called onMouseEnter");
		
		if(!shouldLoadModel) {
			const timeoutId = setTimeout(() => {
				setShouldLoadModel(true);
				setHoverTimeout(null);
			}, 1000);
			setHoverTimeout(timeoutId);
		}
	};
	const onMouseLeave = () => {
		console.log("called onMouseLeave", hoverTimeout);
		if(hoverTimeout) {
			clearTimeout(hoverTimeout);
		}
	}

	//TODO: Add background checkbox

	return (
		<>
			<Canvas
				ref={canvasRef}
				style={{
					width: "100%",
					height: "200px"
				}}
				frameloop={"demand"}
				shadows 
				dpr={[1, 2]}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				camera={{ position: [0, 0, 4], fov: 60 }}
			>
				<Suspense fallback={<ModelSpinner />}>
					{
						shouldLoadModel && (
							<>
								<ambientLight intensity={0.7} />
								<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
								<ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
								<Environment preset="dawn" background/>
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
				{!shouldLoadModel && (
					<Html center>
						<div style={{ 
							minWidth: 350,
							textAlign: "center"
						}}>{"Наведитесь, чтобы посмотреть модель"}</div>
					</Html>
				)}
			</Canvas>
		</>
	)
}