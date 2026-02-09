import { useState } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Stats } from "../Components/Stats/Stats";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import Footer from "../Components/Footer/Footer";
import "./Homepage.css";

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

			{/* ✅ STATIC PUBLISHER CONTENT (IMPORTANT FOR ADSENSE) */}
			<section className="homepage-explainer">
				<h1>How the Dice Works</h1>

				<p>
					Roll For It uses true random number generation provided by your
					browser. Every roll is independent, unbiased, and calculated in real
					time.
				</p>

				<ol>
					<li>You select or create a list of options</li>
					<li>Each option is given equal probability</li>
					<li>A random dice roll is generated when you press Roll</li>
					<li>The roll is mapped directly to one option</li>
				</ol>

				<h2>How results are selected</h2>

				<p>
					When a roll occurs, Roll For It maps the dice value to your list using
					a simple and fair mathematical formula called <strong>modulo</strong>.
				</p>

				<p>The formula used is:</p>

				<pre className="code-block">{`index = (roll - 1) % numberOfOptions`}</pre>

				<p>
					Dice rolls are counted from 1, while lists are counted from 0.
					Subtracting 1 aligns the two correctly. The modulo operation ensures
					that if the dice roll is larger than the number of available options,
					it safely wraps back around the list.
				</p>

				<p>
					This guarantees that every option has an equal chance of being
					selected, with no weighting, memory, or bias between rolls.
				</p>

				<h2>About animations</h2>

				<p>
					Animations are purely visual and do not influence the outcome. The
					result is determined instantly when you roll, before any animation
					finishes.
				</p>
			</section>

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
