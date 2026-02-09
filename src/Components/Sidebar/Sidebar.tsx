import { useState, useEffect, useRef } from "react";
import { FacesList } from "../FacesList/FacesList";
import type { D20Face } from "../../data/d20Faces";
import {
	D20_FACES,
	DATE_NIGHT_FACES,
	MOVIE_GENRE_FACES,
} from "../../data/d20Faces";
import { StyleEditor } from "../StyleEditor/StyleEditor";
import { useNavigate } from "react-router-dom";
import type { DiceTheme } from "../Dice/DiceTheme";
import type { ListMode } from "../../Pages/Homepage";
import "./Sidebar.css";

type SidebarProps = {
	mode: ListMode;
	activeTheme: DiceTheme;
	setActiveTheme: (t: DiceTheme) => void;
	landedRoll: number | null;
	rollDice: () => void;
	onToastResult: (text: string | null) => void;
	onToastLink: (link: { label: string; url: string } | null) => void;
	onListChange: () => void;
	showEditor: boolean;
	setShowEditor: (b: boolean) => void;
	resetTheme: () => void;
};

const EMPTY_CUSTOM = Array(20).fill("");

export const Sidebar = ({
	mode,
	activeTheme,
	setActiveTheme,
	landedRoll,
	rollDice,
	onToastResult,
	onToastLink,
	onListChange,
	showEditor,
	setShowEditor,
	resetTheme,
}: SidebarProps) => {
	const navigate = useNavigate();

	/* 🧠 LIST DATA */
	const [currentList, setCurrentList] = useState<D20Face[]>(D20_FACES);
	const [customItems, setCustomItems] = useState<string[]>(() => {
		const saved = localStorage.getItem("customDice");
		return saved ? JSON.parse(saved) : EMPTY_CUSTOM;
	});

	const lastHandledRollRef = useRef<number | null>(null);

	/* 🎞️ ANIMATION STATE (THIS IS THE FIX) */
	const [carouselPhase, setCarouselPhase] = useState<
		"" | "slide-out" | "slide-in"
	>("");
	const [carouselDir, setCarouselDir] = useState<"left" | "right">("right");

	const animTimerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (animTimerRef.current) {
				window.clearTimeout(animTimerRef.current);
			}
		};
	}, []);

	/* 🎲 FACE DERIVATION */
	const customFaces: D20Face[] = customItems.map((text, i) => ({
		value: i + 1,
		text,
	}));

	const facesToShow = mode === "custom" ? customFaces : currentList;
	const nonEmptyFaces = facesToShow.filter((f) => f.text.trim() !== "");

	const activeFace =
		landedRoll && nonEmptyFaces.length
			? nonEmptyFaces[(landedRoll - 1) % nonEmptyFaces.length]
			: null;

	/* 🔔 TOAST LOGIC */
	useEffect(() => {
		if (!activeFace) return;
		if (landedRoll === lastHandledRollRef.current) return;

		lastHandledRollRef.current = landedRoll;
		onToastResult(activeFace.text);
		onToastLink(null);
	}, [landedRoll, activeFace, onToastResult, onToastLink]);

	/* 🎬 NAVIGATION + ANIMATION (REPLACEMENT FOR setMode) */
	const navigateWithAnimation = (
		list: D20Face[],
		nextMode: ListMode,
		path: string
	) => {
		if (nextMode === mode) return;

		onListChange();
		lastHandledRollRef.current = null;

		const order: ListMode[] = ["food", "date", "movies", "custom"];
		const prevIdx = order.indexOf(mode);
		const nextIdx = order.indexOf(nextMode);
		setCarouselDir(nextIdx > prevIdx ? "right" : "left");

		setCarouselPhase("slide-out");

		if (animTimerRef.current) window.clearTimeout(animTimerRef.current);

		animTimerRef.current = window.setTimeout(() => {
			setCurrentList(list);
			navigate(path); // URL → mode updates automatically
			setCarouselPhase("slide-in");

			animTimerRef.current = window.setTimeout(() => {
				setCarouselPhase("");
			}, 240);
		}, 220);
	};

	/* ✏️ CUSTOM LIST EDIT */
	const updateCustomItem = (i: number, value: string) => {
		const next = [...customItems];
		next[i] = value;
		setCustomItems(next);
		localStorage.setItem("customDice", JSON.stringify(next));
	};

	return (
		<aside className="sidebar">
			<button
				className="open-theme-button"
				onClick={() => setShowEditor(!showEditor)}
			>
				{showEditor ? "View Lists" : "Customize Dice"}
			</button>

			<div className="list-buttons">
				<button
					onClick={() =>
						navigateWithAnimation(D20_FACES, "food", "/what-should-i-eat")
					}
				>
					Food 🍔
				</button>

				<button
					onClick={() =>
						navigateWithAnimation(DATE_NIGHT_FACES, "date", "/date-ideas")
					}
				>
					Date ❤️
				</button>

				<button
					onClick={() =>
						navigateWithAnimation(MOVIE_GENRE_FACES, "movies", "/movie-night")
					}
				>
					Movies 🎬
				</button>

				<button
					onClick={() =>
						navigateWithAnimation(customFaces, "custom", "/custom-dice")
					}
				>
					Custom 🎲
				</button>
			</div>

			<button className="reroll-button mobile-only" onClick={rollDice}>
				Roll Dice
			</button>

			<div className={`faces-carousel ${carouselPhase}`} data-dir={carouselDir}>
				{showEditor ? (
					<StyleEditor
						resetTheme={resetTheme}
						theme={activeTheme}
						onChange={setActiveTheme}
					/>
				) : (
					<FacesList
						faces={facesToShow}
						activeValue={activeFace?.value ?? null}
						editable={mode === "custom"}
						onEdit={updateCustomItem}
					/>
				)}
			</div>
		</aside>
	);
};
