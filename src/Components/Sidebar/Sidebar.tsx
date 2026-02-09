import { useState, useEffect, useRef } from "react";
import { FacesList } from "../FacesList/FacesList";
import {
	D20_FACES,
	DATE_NIGHT_FACES,
	MOVIE_GENRE_FACES,
} from "../../data/d20Faces";
import type { D20Face } from "../../data/d20Faces";

import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
	landedRoll: number | null;
	rollDice: () => void;
	onToastResult: (text: string | null) => void;
	onToastLink: (link: { label: string; url: string } | null) => void;
	onListChange: () => void;
};

type ListMode = "food" | "date" | "movies" | "custom";

const EMPTY_CUSTOM = Array(20).fill("");

function buildMapsUrl(text: string) {
	return `https://www.google.com/maps/search/${encodeURIComponent(
		`${text} near me`
	)}`;
}

function buildMovieSearchUrl(text: string) {
	const cleaned = text
		.replace(/[^\p{L}\p{N}\s]/gu, "")
		.trim()
		.toLowerCase();

	return `https://www.imdb.com/search/title/?genres=${encodeURIComponent(
		cleaned
	)}&sort=user_rating,desc`;
}

export const Sidebar = ({
	landedRoll,
	rollDice,
	onToastResult,
	onToastLink,
	onListChange,
}: SidebarProps) => {
	const [mode, setMode] = useState<ListMode>("food");
	const [currentList, setCurrentList] = useState<D20Face[]>(D20_FACES);

	const [customItems, setCustomItems] = useState<string[]>(() => {
		const saved = localStorage.getItem("customDice");
		return saved ? JSON.parse(saved) : EMPTY_CUSTOM;
	});

	const navigate = useNavigate();

	/** 🔒 prevents toast re-trigger on list switch */
	const lastHandledRollRef = useRef<number | null>(null);

	// 🔥 Animation state for the carousel
	const [carouselPhase, setCarouselPhase] = useState<
		"" | "slide-out" | "slide-in"
	>("");
	const [carouselDir, setCarouselDir] = useState<"left" | "right">("right");
	const animTimerRef = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
		};
	}, []);

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

	/* 🔥 ONLY fire toast when roll CHANGES */
	useEffect(() => {
		if (!activeFace) return;
		if (landedRoll === lastHandledRollRef.current) return;

		lastHandledRollRef.current = landedRoll;
		onToastResult(activeFace.text);

		if (mode === "food") {
			onToastLink({
				label: "📍 Near me",
				url: buildMapsUrl(activeFace.text),
			});
			return;
		}

		if (
			mode === "date" &&
			!["takeout", "stay in"].some((x) =>
				activeFace.text.toLowerCase().includes(x)
			)
		) {
			onToastLink({
				label: "📍 Near me",
				url: buildMapsUrl(activeFace.text),
			});
			return;
		}

		if (mode === "movies") {
			onToastLink({
				label: "🎬 See movies",
				url: buildMovieSearchUrl(activeFace.text),
			});
			return;
		}

		onToastLink(null);
	}, [landedRoll, activeFace, mode, onToastLink, onToastResult]);

	const switchList = (list: D20Face[], nextMode: ListMode) => {
		if (nextMode === mode) return;

		onListChange(); // dismiss toast
		lastHandledRollRef.current = null;

		// determine direction (based on button order)
		const order: ListMode[] = ["food", "date", "movies", "custom"];
		const prevIdx = order.indexOf(mode);
		const nextIdx = order.indexOf(nextMode);
		setCarouselDir(nextIdx > prevIdx ? "right" : "left");

		// play slide-out, swap list, then slide-in
		setCarouselPhase("slide-out");

		if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
		animTimerRef.current = window.setTimeout(() => {
			setCurrentList(list);
			setMode(nextMode);
			setCarouselPhase("slide-in");

			// optional: clear phase after the animation finishes
			animTimerRef.current = window.setTimeout(() => {
				setCarouselPhase("");
			}, 240);
		}, 220);
	};

	const updateCustomItem = (i: number, value: string) => {
		const next = [...customItems];
		next[i] = value;
		setCustomItems(next);
		localStorage.setItem("customDice", JSON.stringify(next));
	};

	return (
		<aside className="sidebar">
			<div className="list-buttons">
				<button
					onClick={() => {
						switchList(D20_FACES, "food");
						navigate("/what-should-i-eat");
					}}
				>
					Food 🍔
				</button>

				<button
					onClick={() => {
						switchList(DATE_NIGHT_FACES, "date");
						navigate("/date-ideas");
					}}
				>
					Date ❤️
				</button>

				<button
					onClick={() => {
						switchList(MOVIE_GENRE_FACES, "movies");
						navigate("/movie-night");
					}}
				>
					Movies 🎬
				</button>

				<button
					onClick={() => {
						switchList(customFaces, "custom");
						navigate("/custom-dice");
					}}
				>
					Custom 🎲
				</button>
			</div>

			<button className="reroll-button mobile-only" onClick={rollDice}>
				Roll Dice
			</button>

			{/* ✅ THIS is what your CSS is targeting */}
			<div className={`faces-carousel ${carouselPhase}`} data-dir={carouselDir}>
				<FacesList
					faces={facesToShow}
					activeValue={activeFace?.value ?? null}
					editable={mode === "custom"}
					onEdit={updateCustomItem}
				/>
			</div>
		</aside>
	);
};
