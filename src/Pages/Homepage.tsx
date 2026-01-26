import { useState } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Stats } from "../Components/Stats/Stats";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { CustomListModal } from "../Components/Modal/Modal";

import "./Homepage.css";

export const Homepage = () => {
	const [roll, setRoll] = useState<number | null>(null);
	const [landedRoll, setLandedRoll] = useState<number | null>(null);
	const [rolling, setRolling] = useState(false);
	const [totalRolls, setTotalRolls] = useState(0);

	const [showCustomModal, setShowCustomModal] = useState(false);

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

	function saveCustomDice(items: string[]) {
		const normalized = items.slice(0, 20);
		localStorage.setItem("customDice", JSON.stringify(normalized));
		setShowCustomModal(false);
	}

	return (
		<div className="homepage-container">
			<PageHeader title="Roll For It!" />
			<Stats totalRolls={totalRolls} />

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
					rollDice={rollDice}
				/>
			</div>

			{showCustomModal && (
				<CustomListModal
					onSave={saveCustomDice}
					onClose={() => setShowCustomModal(false)}
				/>
			)}
		</div>
	);
};
