import { useState } from "react";
import type { D20Face } from "../../data/d20Faces";

import "./FacesList.css";

type FacesListProps = {
	faces: D20Face[];
	activeValue: number | null;
	editable?: boolean;
	onEdit?: (index: number, value: string) => void;
	onAdd?: () => void;
};

export const FacesList = ({
	faces,
	activeValue,
	editable = false,
	onEdit,
	onAdd,
}: FacesListProps) => {
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [draft, setDraft] = useState("");

	return (
		<div className="faces-list">
			{faces.map((face, index) => {
				const isActive = activeValue === face.value;
				const isEditing = editingIndex === index;

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
							<span className="face-text">{face.text}</span>
						)}
					</div>
				);
			})}

			{/* ➕ Add row */}
			{editable && faces.length < 20 && (
				<div className="face add-row" onClick={onAdd}>
					<span className="face-number">+</span>
					<span className="face-text add-text">Add option</span>
				</div>
			)}
		</div>
	);
};
