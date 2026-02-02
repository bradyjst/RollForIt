import { useState } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Stats } from "../Components/Stats/Stats";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";

import "./Homepage.css";
import Footer from "../Components/Footer/Footer";

export const Homepage = () => {
	const [roll, setRoll] = useState<number | null>(null);
	const [landedRoll, setLandedRoll] = useState<number | null>(null);
	const [rolling, setRolling] = useState(false);
	const [totalRolls, setTotalRolls] = useState(0);
	const [toastText, setToastText] = useState<string | null>(null);
	const [toastLink, setToastLink] = useState<{
		label: string;
		url: string;
	} | null>(null);

	function rollDice() {
		if (rolling) return;
		setRoll(Math.floor(Math.random() * 20) + 1);
		setRolling(true);
	}

	function handleDiceLand() {
		setRolling(false);
		setLandedRoll(roll);
		setTotalRolls((r) => r + 1);
	}

	return (
		<div className="homepage-container">
			<PageHeader
				title="Roll For It!"
				subtitle="Decision paralysis? Let the dice help!"
			/>
			<Stats totalRolls={totalRolls} />

			<div className="homepage-content">
				<Dice
					value={roll}
					rolling={rolling}
					onRoll={rollDice}
					onLand={handleDiceLand}
				/>

				<Sidebar
					landedRoll={landedRoll}
					rollDice={rollDice}
					onToastResult={setToastText}
					onToastLink={setToastLink}
					onListChange={() => {
						setToastText(null);
						setToastLink(null);
						setLandedRoll(null);
					}}
				/>
			</div>

			<Footer />

			{toastText && (
				<div className="toast-backdrop">
					<div className="toast-card">
						<p className="toast-title">You got</p>
						<p className="toast-text">{toastText}</p>

						{toastLink && (
							<a
								href={toastLink.url}
								target="_blank"
								rel="noopener noreferrer"
								className="toast-link"
							>
								{toastLink.label}
							</a>
						)}

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
