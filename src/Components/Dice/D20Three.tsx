import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

type D20MeshProps = {
	rolling: boolean;
	value: number | null;
};

type FaceInfo = {
	center: THREE.Vector3;
	normal: THREE.Vector3;
	quat: THREE.Quaternion; // orient text so its +Z points along face normal
};

const D20Mesh = ({ rolling, value }: D20MeshProps) => {
	const mesh = useRef<THREE.Mesh>(null!);
	const targetQuat = useRef<THREE.Quaternion | null>(null);

	// Build geometry once
	const geom = useMemo(() => new THREE.IcosahedronGeometry(1.2, 0), []);

	// Derive the 20 face centers + normals FROM THE GEOMETRY (no guessing)
	const faces = useMemo<FaceInfo[]>(() => {
		const g = geom.toNonIndexed(); // easiest: every 3 verts is a triangle face
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

			// normal = (B-A) x (C-A)
			const normal = new THREE.Vector3()
				.subVectors(vB, vA)
				.cross(new THREE.Vector3().subVectors(vC, vA))
				.normalize();

			// Orient text so its local +Z faces outward along the face normal
			const quat = new THREE.Quaternion().setFromUnitVectors(
				new THREE.Vector3(0, 0, 1),
				normal
			);

			out.push({ center, normal, quat });
		}

		// Safety: Icosahedron should yield exactly 20 faces
		return out.slice(0, 20);
	}, [geom]);

	useFrame(() => {
		if (!mesh.current) return;

		if (rolling) {
			mesh.current.rotation.x += 0.15;
			mesh.current.rotation.y += 0.18;
			mesh.current.rotation.z += 0.12;
			return;
		}

		if (!targetQuat.current) return;

		mesh.current.quaternion.slerp(targetQuat.current, 0.2);

		if (mesh.current.quaternion.angleTo(targetQuat.current) < 0.01) {
			mesh.current.quaternion.copy(targetQuat.current);
			targetQuat.current = null;
		}
	});

	// Snap so the chosen face normal points toward the camera (0,0,1)
	useEffect(() => {
		if (rolling || value === null) return;
		if (value < 1 || value > 20) return;

		const face = faces[value - 1];
		if (!face) return;

		// rotate face.normal -> forward
		const quat = new THREE.Quaternion().setFromUnitVectors(
			face.normal.clone().normalize(),
			new THREE.Vector3(0, 0, 1)
		);

		targetQuat.current = quat;
	}, [rolling, value, faces]);

	return (
		<mesh ref={mesh} geometry={geom}>
			{/* body */}
			<meshStandardMaterial
				color="#ffffff"
				roughness={0.4}
				metalness={0.2}
				side={THREE.FrontSide}
			/>

			{/* edges */}
			<lineSegments>
				<edgesGeometry args={[geom]} />
				<lineBasicMaterial color="#000000" />
			</lineSegments>

			{/* numbers: one per face, positioned ON the actual face */}
			{faces.map((f, idx) => {
				const faceValue = idx + 1;

				// put label slightly above the face surface
				const pos = f.center.clone().add(f.normal.clone().multiplyScalar(0.06));

				return (
					<group
						key={faceValue}
						position={[pos.x, pos.y, pos.z]}
						quaternion={f.quat}
					>
						<Text
							fontSize={0.28}
							color="black"
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
};

export const D20Three = ({ rolling, value }: D20ThreeProps) => {
	return (
		<Canvas
			camera={{ position: [2.5, 2.5, 4], fov: 45 }}
			style={{ width: 240, height: 240 }}
		>
			<ambientLight intensity={0.25} />
			<directionalLight position={[5, 5, 5]} intensity={1.2} />
			<directionalLight position={[-3, -3, 2]} intensity={0.4} />

			<D20Mesh rolling={rolling} value={value} />
		</Canvas>
	);
};
