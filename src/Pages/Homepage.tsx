import { useState } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import "./Homepage.css";

export const Homepage = () => {
	const [roll, setRoll] = useState<number | null>(null);
	const [landedRoll, setLandedRoll] = useState<number | null>(null);
	const [rolling, setRolling] = useState(false);
	const [totalRolls, setTotalRolls] = useState(0);

	function rollDice() {
		if (rolling) return;

		const value = Math.floor(Math.random() * 20) + 1;
		setRoll(value);
		setRolling(true);
	}

	function handleDiceLand() {
		setRolling(false);
		setLandedRoll(roll);
		setTotalRolls((r) => r + 1);
	}

	return (
		<div className="homepage-container">
			<PageHeader title="Roll For It!" />

			<div className="homepage-content">
				<Dice
					value={roll}
					rolling={rolling}
					onRoll={rollDice}
					onLand={handleDiceLand}
				/>

				<Sidebar
					lastRoll={roll}
					totalRolls={totalRolls}
					landedRoll={landedRoll}
				/>
			</div>
		</div>
	);
};
