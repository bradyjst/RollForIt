import {
	FOOD_DICE_THEME,
	DATE_DICE_THEME,
	MOVIE_DICE_THEME,
	CUSTOM_DICE_THEME,
	type DiceTheme,
} from "../Components/Dice/DiceTheme";
import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { Stats } from "../Components/Stats/Stats";
import { Dice } from "../Components/Dice/Dice";
import { Sidebar } from "../Components/Sidebar/Sidebar";
import { HomePageExplainer } from "../Components/HomePageExplainer/HomePageExplainer";
import { PAGE_META } from "../data/PageMeta";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import "./Homepage.css";

export type ListMode = "food" | "date" | "movies" | "custom";

export const Homepage = () => {
	const { diceSlug } = useParams();

	/* 🎯 MODE — DERIVED FROM URL (NO STATE) */
	const mode: ListMode = useMemo(() => {
		switch (diceSlug) {
			case "what-should-i-eat":
				return "food";
			case "date-ideas":
				return "date";
			case "movie-night":
				return "movies";
			case "custom-dice":
				return "custom";
			default:
				return "food";
		}
	}, [diceSlug]);

	/* 🎲 CORE ROLL STATE */
	const [roll, setRoll] = useState<number | null>(null);
	const [landedRoll, setLandedRoll] = useState<number | null>(null);
	const [rolling, setRolling] = useState(false);
	const [totalRolls, setTotalRolls] = useState(0);

	/* 🎨 UI STATE */
	const [showEditor, setShowEditor] = useState(false);
	const [toastText, setToastText] = useState<string | null>(null);
	const [toastLink, setToastLink] = useState<{
		label: string;
		url: string;
	} | null>(null);

	/* 🎨 THEMES BY MODE */
	const [diceThemes, setDiceThemes] = useState<Record<ListMode, DiceTheme>>(
		() => {
			const saved = localStorage.getItem("diceThemes");
			if (saved) {
				try {
					return JSON.parse(saved);
				} catch {
					/* empty */
				}
			}
			return {
				food: FOOD_DICE_THEME,
				date: DATE_DICE_THEME,
				movies: MOVIE_DICE_THEME,
				custom: CUSTOM_DICE_THEME,
			};
		}
	);

	useEffect(() => {
		localStorage.setItem("diceThemes", JSON.stringify(diceThemes));
	}, [diceThemes]);

	const activeTheme = diceThemes[mode];

	/* 🔄 RESET */
	const DEFAULT_THEMES_BY_MODE: Record<ListMode, DiceTheme> = {
		food: FOOD_DICE_THEME,
		date: DATE_DICE_THEME,
		movies: MOVIE_DICE_THEME,
		custom: CUSTOM_DICE_THEME,
	};

	const resetDiceTheme = () =>
		setDiceThemes((prev) => ({
			...prev,
			[mode]: DEFAULT_THEMES_BY_MODE[mode],
		}));

	/* 🧠 SEO */
	useEffect(() => {
		const meta = PAGE_META[mode];
		if (!meta) return;

		document.title = meta.title;

		const descTag = document.querySelector(
			'meta[name="description"]'
		) as HTMLMetaElement | null;

		if (descTag) {
			descTag.content = meta.description;
		}
	}, [mode]);

	/* 🎲 ACTIONS */
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
				title={PAGE_META[mode]?.title ?? "Roll For It!"}
				subtitle={
					PAGE_META[mode]?.description ??
					"Decision paralysis? Let the dice help!"
				}
			/>

			<Stats totalRolls={totalRolls} />

			<div className="homepage-content">
				<Dice
					value={roll}
					rolling={rolling}
					onRoll={rollDice}
					onLand={handleDiceLand}
					theme={activeTheme}
				/>

				<Sidebar
					mode={mode}
					activeTheme={activeTheme}
					setActiveTheme={(nextTheme) =>
						setDiceThemes((prev) => ({
							...prev,
							[mode]: nextTheme,
						}))
					}
					resetTheme={resetDiceTheme}
					landedRoll={landedRoll}
					rollDice={rollDice}
					showEditor={showEditor}
					setShowEditor={setShowEditor}
					onToastResult={setToastText}
					onToastLink={setToastLink}
					onListChange={() => {
						setToastText(null);
						setToastLink(null);
						setLandedRoll(null);
					}}
				/>
			</div>

			<section>
				<HomePageExplainer />
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
