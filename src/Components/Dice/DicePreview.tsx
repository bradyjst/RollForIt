import { Canvas } from "@react-three/fiber";
import { D20Mesh } from "./D20Three";
import type { DiceTheme } from "./DiceTheme";

type DicePreviewProps = {
	theme: DiceTheme;
};

export const DicePreview = ({ theme }: DicePreviewProps) => {
	return (
		<div className="dice-preview">
			<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
				<ambientLight intensity={0.3} />
				<directionalLight position={[4, 4, 5]} intensity={1} />

				<D20Mesh rolling={false} value={null} theme={theme} preview />
			</Canvas>
		</div>
	);
};
