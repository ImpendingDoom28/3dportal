import React, { Suspense } from "react";

import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoxTest } from "../ModelCard/BoxTest";
import { ModelFileDto } from "../../../core/types";
import { ModelSpinner } from "../ModelLoader";

type ModelPreviewProps = {
	model: ModelFileDto
}

export const ModelViewer: React.FC<ModelPreviewProps> = (
	{
		model
	}) => {

	const loadedObject = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/skunk/model.gltf");

	return (
		<Canvas
			style={{
				width: "100%",
				height: "200px"
			}}
			shadows 
			dpr={[1, 2]} 
			camera={{ position: [0, 0, 4], fov: 60 }}
		>
			<ambientLight intensity={0.7} />
			<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
			<Suspense fallback={<ModelSpinner />}>
				<Environment preset="sunset" background />
				<ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
				<BoxTest />
			</Suspense>
			<OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
		</Canvas>
	)
}