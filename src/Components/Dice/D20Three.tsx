import { useRef, useEffect, useMemo } from "react";
import type { DiceTheme } from "./DiceTheme";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import "./Dice.css";

type D20MeshProps = {
	rolling: boolean;
	value: number | null;
	onLand?: () => void;
	theme: DiceTheme;
	preview?: boolean;
};

type FaceInfo = {
	center: THREE.Vector3;
	normal: THREE.Vector3;
	quat: THREE.Quaternion;
};

export const D20Mesh = ({
	rolling,
	value,
	onLand,
	theme,
	preview,
}: D20MeshProps) => {
	const mesh = useRef<THREE.Mesh>(null!);
	const targetQuat = useRef<THREE.Quaternion | null>(null);
	const spinTime = useRef(0);

	const SPIN_DURATION = theme.rollTime;

	// Geometry (built once)
	const geom = useMemo(() => new THREE.IcosahedronGeometry(1.2, 0), []);

	// Face data (derived once)
	const faces = useMemo<FaceInfo[]>(() => {
		const g = geom.toNonIndexed();
		const pos = g.getAttribute("position") as THREE.BufferAttribute;

		const out: FaceInfo[] = [];
		const vA = new THREE.Vector3();
		const vB = new THREE.Vector3();
		const vC = new THREE.Vector3();

		for (let i = 0; i < pos.count; i += 3) {
			vA.fromBufferAttribute(pos, i);
			vB.fromBufferAttribute(pos, i + 1);
			vC.fromBufferAttribute(pos, i + 2);

			const center = new THREE.Vector3()
				.addVectors(vA, vB)
				.add(vC)
				.multiplyScalar(1 / 3);

			const normal = new THREE.Vector3()
				.subVectors(vB, vA)
				.cross(new THREE.Vector3().subVectors(vC, vA))
				.normalize();

			const quat = new THREE.Quaternion().setFromUnitVectors(
				new THREE.Vector3(0, 0, 1),
				normal
			);

			out.push({ center, normal, quat });
		}

		return out.slice(0, 20);
	}, [geom]);

	// Animation loop
	useFrame((_, delta) => {
		if (!mesh.current) return;

		if (preview) {
			mesh.current.rotation.y += delta * 0.4;
			mesh.current.rotation.x += delta * 0.15;
			return;
		}

		// Phase 1: spinning
		if (rolling && spinTime.current < SPIN_DURATION) {
			spinTime.current += delta;
			mesh.current.rotation.x += 6 * delta;
			mesh.current.rotation.y += 7 * delta;
			mesh.current.rotation.z += 5 * delta;
			return;
		}

		// Phase 2: snap to face
		if (targetQuat.current) {
			mesh.current.quaternion.slerp(targetQuat.current, 0.15);

			if (mesh.current.quaternion.angleTo(targetQuat.current) < 0.05) {
				mesh.current.quaternion.copy(targetQuat.current);
				targetQuat.current = null;
				onLand?.();
			}
		}
	});

	// Set target face on roll
	useEffect(() => {
		if (!rolling || value == null || value < 1 || value > 20) return;

		spinTime.current = 0;

		const face = faces[value - 1];
		if (!face) return;

		targetQuat.current = new THREE.Quaternion().setFromUnitVectors(
			face.normal.clone().normalize(),
			new THREE.Vector3(0, 0, 1)
		);
	}, [rolling, value, faces]);

	return (
		<mesh ref={mesh} geometry={geom}>
			{/* Dice body */}
			<meshPhysicalMaterial
				key={JSON.stringify(theme)}
				color={theme.bodyColor}
				roughness={theme.roughness}
				metalness={theme.metalness}
				clearcoat={theme.clearcoat}
				clearcoatRoughness={0.15}
			/>

			{/* Edges */}
			<group scale={1.01}>
				<lineSegments>
					<edgesGeometry args={[geom]} />
					<lineBasicMaterial
						color={theme.edgeColor}
						transparent
						opacity={0.4}
					/>
				</lineSegments>
			</group>

			{/* Face numbers */}
			{faces.map((f, idx) => {
				const faceValue = idx + 1;
				const pos = f.center.clone().add(f.normal.clone().multiplyScalar(0.06));

				return (
					<group
						key={faceValue}
						position={[pos.x, pos.y, pos.z]}
						quaternion={f.quat}
					>
						<Text
							fontSize={0.28}
							color={theme.textColor}
							outlineWidth={0.02}
							outlineColor={theme.textColor}
							anchorX="center"
							anchorY="middle"
						>
							{faceValue}
						</Text>
					</group>
				);
			})}
		</mesh>
	);
};

type D20ThreeProps = {
	rolling: boolean;
	value: number | null;
	onLand?: () => void;
	theme: DiceTheme;
};

export const D20Three = ({ rolling, value, onLand, theme }: D20ThreeProps) => {
	return (
		<div className="dice-wrapper">
			<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
				<ambientLight intensity={0.25} />
				<directionalLight position={[5, 5, 5]} intensity={1.2} />
				<directionalLight position={[-3, -3, 2]} intensity={0.4} />

				<D20Mesh
					rolling={rolling}
					value={value}
					onLand={onLand}
					theme={theme}
				/>
			</Canvas>
		</div>
	);
};
