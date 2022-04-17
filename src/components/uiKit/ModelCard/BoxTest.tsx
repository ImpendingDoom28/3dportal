import React, { useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

export const BoxTest = () => {
	const boxRef = useRef<typeof Box | null>(null);

	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	useFrame(() => {
		if(boxRef.current) {
			boxRef.current.rotation.x = boxRef.current.rotation.y += 0.003
		}
	})

	return (
		<Box
			args={[1, 1, 1]}
			ref={boxRef}
			scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
			onClick={() => setActive(!active)}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<meshStandardMaterial
				receiveShadow
				castShadow
				attach="material"
				color={hovered ? "#2b6c76" : "#720b23"}
			/>
		</Box>
	);
}
