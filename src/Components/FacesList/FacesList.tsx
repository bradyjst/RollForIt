import { type D20Face } from "../../data/d20Faces.tsx";
import "./FacesList.css";

type FacesListProps = {
	faces: D20Face[];
	activeValue: number | null;
};

export const FacesList = ({ faces, activeValue }: FacesListProps) => {
	return (
		<div className="faces-list">
			{faces.map((face) => (
				<div
					key={face.value}
					className={`face-row ${face.value === activeValue ? "active" : ""}`}
				>
					<div className="face-number">{face.value}</div>
					<div className="face-text">{face.text}</div>
				</div>
			))}
		</div>
	);
};
