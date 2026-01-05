import { Stats } from "../Stats/Stats";
import { FacesList } from "../FacesList/FacesList";
import { D20_FACES } from "../../data/d20Faces.tsx";

import "./Sidebar.css";

type SidebarProps = {
	lastRoll: number | null;
	totalRolls: number;
	landedRoll: number | null;
};

export const Sidebar = ({ lastRoll, totalRolls, landedRoll }: SidebarProps) => {
	return (
		<aside className="sidebar">
			<Stats lastRoll={lastRoll} totalRolls={totalRolls} />
			<FacesList faces={D20_FACES} activeValue={landedRoll} />
		</aside>
	);
};
