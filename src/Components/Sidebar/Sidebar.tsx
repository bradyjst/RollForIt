import { useState } from "react";
import { FacesList } from "../FacesList/FacesList";
import { D20_FACES } from "../../data/d20Faces";
import { DATE_NIGHT_FACES } from "../../data/d20Faces";
import { MOVIE_GENRE_FACES } from "../../data/d20Faces";
import type { D20Face } from "../../data/d20Faces";

import "./Sidebar.css";

type SidebarProps = {
	lastRoll: number | null;
	totalRolls: number;
	landedRoll: number | null;
};

type ListMode = "food" | "date" | "movies" | "custom";

export const Sidebar = ({ landedRoll }: SidebarProps) => {
	const [mode, setMode] = useState<ListMode>("food");
	const [currentList, setCurrentList] = useState<D20Face[]>(D20_FACES);
	const [animating, setAnimating] = useState<"out" | "in" | null>(null);
	const [direction, setDirection] = useState<"left" | "right">("right");

	const EMPTY_CUSTOM = Array(20).fill("");

	const [customItems, setCustomItems] = useState<string[]>(() => {
		const saved = localStorage.getItem("customDice");
		return saved ? JSON.parse(saved) : EMPTY_CUSTOM;
	});

	// derived faces for custom list
	const customFaces: D20Face[] = customItems.map((text, i) => ({
		value: i + 1,
		text,
	}));

	const resetCustomList = () => {
		const empty = Array(20).fill("");
		setCustomItems(empty);
		localStorage.setItem("customDice", JSON.stringify(empty));
	};

	const switchList = (
		nextList: D20Face[],
		dir: "left" | "right",
		nextMode: ListMode
	) => {
		if (animating) return;

		setDirection(dir);
		setAnimating("out");

		setTimeout(() => {
			setCurrentList(nextList);
			setMode(nextMode);
			setAnimating("in");

			setTimeout(() => setAnimating(null), 220);
		}, 220);
	};

	const updateCustomItem = (index: number, value: string) => {
		const next = [...customItems];
		next[index] = value;

		setCustomItems(next);
		localStorage.setItem("customDice", JSON.stringify(next));
	};

	const facesToShow = mode === "custom" ? customFaces : currentList;

	const nonEmptyFaces = facesToShow.filter((face) => face.text.trim() !== "");

	const mappedActiveValue =
		landedRoll && nonEmptyFaces.length > 0
			? nonEmptyFaces[(landedRoll - 1) % nonEmptyFaces.length].value
			: null;

	return (
		<aside className="sidebar">
			<div className="list-buttons">
				<button
					className={mode === "food" ? "active" : ""}
					onClick={() => switchList(D20_FACES, "left", "food")}
				>
					Food 🍔
				</button>

				<button
					className={mode === "date" ? "active" : ""}
					onClick={() => switchList(DATE_NIGHT_FACES, "right", "date")}
				>
					Date ❤️
				</button>

				<button
					className={mode === "movies" ? "active" : ""}
					onClick={() => switchList(MOVIE_GENRE_FACES, "right", "movies")}
				>
					Movies 🎬
				</button>

				<button
					className={mode === "custom" ? "active" : ""}
					onClick={() => switchList(customFaces, "right", "custom")}
				>
					Custom 🎲
				</button>
			</div>

			<div
				className={`faces-carousel ${
					animating === "out"
						? "slide-out"
						: animating === "in"
						? "slide-in"
						: ""
				}`}
				data-dir={direction}
			>
				<FacesList
					faces={facesToShow}
					activeValue={mappedActiveValue}
					editable={mode === "custom"}
					onEdit={updateCustomItem}
					nearMe={
						mode === "food"
							? { enabled: true }
							: mode === "date"
							? {
									enabled: true,
									exclude: ["Takeout + Couch", "Stay In & Chill", "reroll"],
							  }
							: { enabled: false }
					}
				/>

				{mode === "custom" && (
					<p>
						Add less than 20 values and the dice will randomly select a value
						while keeping equal odds
					</p>
				)}
				{mode === "custom" && customItems.length > 0 && (
					<button className="reset-button" onClick={resetCustomList}>
						Reset ✖
					</button>
				)}
			</div>
		</aside>
	);
};
