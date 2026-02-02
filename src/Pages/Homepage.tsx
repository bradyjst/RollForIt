import { useState, useRef } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Stats } from "../Components/Stats/Stats";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import type { SidebarHandle } from "../Components/Sidebar/Sidebar";

import "./Homepage.css";

export const Homepage = () => {
	const [roll, setRoll] = useState<number | null>(null);
	const [landedRoll, setLandedRoll] = useState<number | null>(null);
	const [rolling, setRolling] = useState(false);
	const [totalRolls, setTotalRolls] = useState(0);

	const sidebarRef = useRef<SidebarHandle>(null);

	const [toastText, setToastText] = useState<string | null>(null);

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

		const text = sidebarRef.current?.getTextForRoll(roll);

		if (!text) return;

		setTimeout(() => {
			setToastText(text);
		}, 50);
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

				<Sidebar ref={sidebarRef} landedRoll={landedRoll} rollDice={rollDice} />
			</div>

			{toastText && (
				<div className="toast">
					<div className="toast-card">
						<p className="toast-title">You got</p>
						<p className="toast-text">{toastText}</p>

						<div className="toast-actions">
							<button onClick={() => setToastText(null)}>Keep</button>
							<button
								onClick={() => {
									setToastText(null);
									rollDice();
								}}
							>
								Re-roll
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
