import { D20Three } from "./D20Three";
import type { DiceTheme } from "./DiceTheme";
import "./Dice.css";

type DiceProps = {
	value: number | null;
	rolling: boolean;
	onRoll: () => void;
	onLand: () => void;
	theme: DiceTheme;
};

export const Dice = ({ value, rolling, onRoll, onLand, theme }: DiceProps) => {
	return (
		<div className="dice-container">
			<button className="dice" onClick={onRoll} disabled={rolling}>
				<D20Three
					theme={theme}
					value={value}
					rolling={rolling}
					onLand={onLand}
				/>
			</button>
		</div>
	);
};
