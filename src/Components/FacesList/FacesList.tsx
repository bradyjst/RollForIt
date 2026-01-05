import { type D20Face } from "../../data/d20Faces.tsx";
import "./FacesList.css";

type FacesListProps = {
	faces: D20Face[];
	activeValue: number | null;
};

export const FacesList = ({ faces, activeValue }: FacesListProps) => {
	return (
		<ul className="faces-grid">
			{faces.map((face) => (
				<li
					key={face.value}
					className={`face-item ${
						face.value === activeValue ? "active landed" : ""
					}`}
				>
					{face.value}. {face.text}
				</li>
			))}
		</ul>
	);
};
