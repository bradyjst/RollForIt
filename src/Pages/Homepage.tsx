import { useState, useEffect } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import "./Homepage.css";

export const Homepage = () => {
	const [roll, setRoll] = useState<number | null>(null); // truth
	const [displayedRoll, setDisplayedRoll] = useState<number | null>(null); // delayed UI
	const [totalRolls, setTotalRolls] = useState(0);

	function rollDice() {
		const value = Math.floor(Math.random() * 20) + 1;
		setRoll(value); // immediate truth
		setTotalRolls((r) => r + 1);
	}

	// Delay UI reaction to match dice animation
	useEffect(() => {
		if (roll === null) return;

		const timeout = setTimeout(() => {
			setDisplayedRoll(roll);
		}, 450);

		return () => clearTimeout(timeout);
	}, [roll]);

	// // Reset
	// useEffect(() => {
	// 	if (displayedRoll === null) return;

	// 	const timeout = setTimeout(() => {
	// 		setDisplayedRoll(null);
	// 	}, 400);

	// 	return () => clearTimeout(timeout);
	// }, [displayedRoll]);

	return (
		<div className="homepage-container">
			<PageHeader title="Roll For It!" />

			<div className="homepage-content">
				<Dice value={roll} onRoll={rollDice} />
				<Sidebar
					lastRoll={roll} // stats use truth
					totalRolls={totalRolls}
					landedRoll={displayedRoll} // list uses delayed UI state
				/>
			</div>
		</div>
	);
};
