import { useState } from "react";
import type { D20Face } from "../../data/d20Faces";

import "./FacesList.css";

type FacesListProps = {
	faces: D20Face[];
	activeValue: number | null;
	editable?: boolean;
	onEdit?: (index: number, value: string) => void;
	nearMe?: {
		enabled: boolean;
		exclude?: string[];
	};
	movieSearch?: {
		enabled: boolean;
		exclude?: string[];
	};
};

function buildMapsUrl(text: string) {
	const cleaned = text.replace(/[^\p{L}\p{N}\s]/gu, "").trim();

	return `https://www.google.com/maps/search/${encodeURIComponent(
		`${cleaned} near me`
	)}`;
}

function buildMovieSearchUrl(genre: string) {
	const cleaned = genre.replace(/[^\p{L}\p{N}\s]/gu, "").trim();

	return `https://www.imdb.com/search/title/?title_type=feature&genres=${encodeURIComponent(
		cleaned.toLowerCase()
	)}`;
}

export const FacesList = ({
	faces,
	activeValue,
	editable = false,
	onEdit,
	nearMe,
	movieSearch,
}: FacesListProps) => {
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [draft, setDraft] = useState("");

	return (
		/* 🔥 RESTORED WRAPPER — animations live here */

		<div className="faces-list">
			{faces.map((face, index) => {
				const isActive = activeValue === face.value;
				const isEditing = editingIndex === index;

				const textLower = face.text.toLowerCase();

				// near-me logic
				const isNearMeExcluded =
					nearMe?.exclude?.some((x) => textLower.includes(x.toLowerCase())) ??
					false;

				const showNearMe =
					nearMe?.enabled && isActive && !editable && !isNearMeExcluded;

				// movie search logic
				const isMovieExcluded =
					movieSearch?.exclude?.some((x) =>
						textLower.includes(x.toLowerCase())
					) ?? false;

				const showMovieSearch =
					movieSearch?.enabled && isActive && !editable && !isMovieExcluded;

				return (
					<div
						key={face.value}
						className={`face ${isActive ? "active" : ""} ${
							editable ? "editable" : ""
						}`}
						onClick={() => {
							if (!editable) return;
							setEditingIndex(index);
							setDraft(face.text);
						}}
					>
						<span className="face-number">{index + 1}</span>

						{isEditing ? (
							<input
								autoFocus
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
								onBlur={() => {
									onEdit?.(index, draft.trim());
									setEditingIndex(null);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										onEdit?.(index, draft.trim());
										setEditingIndex(null);
									}
									if (e.key === "Escape") {
										setEditingIndex(null);
									}
								}}
							/>
						) : (
							<>
								<span className="face-text">{face.text}</span>

								{showNearMe && (
									<a
										className="near-me"
										href={buildMapsUrl(face.text)}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
									>
										📍 Near me
									</a>
								)}

								{showMovieSearch && (
									<a
										className="near-me"
										href={buildMovieSearchUrl(face.text)}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
									>
										🎬 See movies
									</a>
								)}
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};
