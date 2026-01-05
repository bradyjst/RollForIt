import { D20Three } from "./D20Three";
import "./Dice.css";

type DiceProps = {
	value: number | null;
	rolling: boolean;
	onRoll: () => void;
	onLand: () => void;
};

export const Dice = ({ value, rolling, onRoll, onLand }: DiceProps) => {
	return (
		<div className="dice-container">
			<button className="dice" onClick={onRoll} disabled={rolling}>
				<D20Three value={value} rolling={rolling} onLand={onLand} />
			</button>

			<div className="dice-hint">
				{rolling ? "Rolling..." : "Click to roll"}
			</div>
		</div>
	);
};
