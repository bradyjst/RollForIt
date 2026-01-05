import { useEffect, useRef, useState } from "react";
import { D20Three } from "./D20Three";
import "./Dice.css";

type DiceProps = {
	value: number | null;
	onRoll: () => void;
};

export const Dice = ({ value, onRoll }: DiceProps) => {
	const [rolling, setRolling] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	function handleRoll() {
		if (rolling) return; // optional: prevent spam

		setRolling(true);
		onRoll();
	}

	useEffect(() => {
		if (!rolling) return;

		timeoutRef.current = window.setTimeout(() => {
			setRolling(false);
		}, 700);

		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [rolling]);

	return (
		<div className="dice-container">
			<button className="dice" onClick={handleRoll}>
				<D20Three value={value} rolling={rolling} />
			</button>

			<div className="dice-hint">Click to roll</div>
		</div>
	);
};
