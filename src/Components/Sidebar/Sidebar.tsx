import { useState, forwardRef, useImperativeHandle } from "react";
import { FacesList } from "../FacesList/FacesList";
import {
	D20_FACES,
	DATE_NIGHT_FACES,
	MOVIE_GENRE_FACES,
} from "../../data/d20Faces";
import type { D20Face } from "../../data/d20Faces";

import "./Sidebar.css";

export type SidebarHandle = {
	getTextForRoll: (roll: number | null) => string | null;
};

type SidebarProps = {
	landedRoll: number | null;
	rollDice: () => void;
};

type ListMode = "food" | "date" | "movies" | "custom";

export const Sidebar = forwardRef<SidebarHandle, SidebarProps>(
	({ landedRoll, rollDice }, ref) => {
		const [mode, setMode] = useState<ListMode>("food");
		const [currentList, setCurrentList] = useState<D20Face[]>(D20_FACES);
		const [animating, setAnimating] = useState<"out" | "in" | null>(null);
		const [direction, setDirection] = useState<"left" | "right">("right");

		const EMPTY_CUSTOM = Array(20).fill("");

		const [customItems, setCustomItems] = useState<string[]>(() => {
			const saved = localStorage.getItem("customDice");
			return saved ? JSON.parse(saved) : EMPTY_CUSTOM;
		});

		const customFaces: D20Face[] = customItems.map((text, i) => ({
			value: i + 1,
			text,
		}));

		const facesToShow = mode === "custom" ? customFaces : currentList;

		const nonEmptyFaces = facesToShow.filter((f) => f.text.trim() !== "");

		// 🔑 PURE MAPPER — NO SIDE EFFECTS
		const getTextForRoll = (roll: number | null): string | null => {
			if (!roll || nonEmptyFaces.length === 0) return null;

			const index = (roll - 1) % nonEmptyFaces.length;
			return nonEmptyFaces[index]?.text ?? null;
		};

		useImperativeHandle(ref, () => ({
			getTextForRoll,
		}));

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

		const resetCustomList = () => {
			setCustomItems(EMPTY_CUSTOM);
			localStorage.setItem("customDice", JSON.stringify(EMPTY_CUSTOM));
		};

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

				<button className="reroll-button mobile-only" onClick={rollDice}>
					Roll Dice
				</button>

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
								? { enabled: true, exclude: ["reroll"] }
								: mode === "date"
								? {
										enabled: true,
										exclude: ["Takeout + Couch", "Stay In & Chill", "reroll"],
								  }
								: { enabled: false }
						}
						movieSearch={
							mode === "movies"
								? { enabled: true, exclude: ["reroll"] }
								: { enabled: false }
						}
					/>

					{mode === "custom" && (
						<button className="reset-button" onClick={resetCustomList}>
							Reset ✖
						</button>
					)}
				</div>
			</aside>
		);
	}
);
