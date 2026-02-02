import { useEffect } from "react";
import "./Stats.css";

type StatsProps = {
	totalRolls: number;
};

const STORAGE_KEY = "rollforit_total_rolls";

export const Stats = ({ totalRolls }: StatsProps) => {
	// Read once per render
	const storedRolls = (() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? Number(saved) : 0;
	})();

	// Persist when totalRolls increases
	useEffect(() => {
		if (totalRolls > storedRolls) {
			localStorage.setItem(STORAGE_KEY, String(totalRolls));
		}
	}, [totalRolls, storedRolls]);

	return (
		<section className="stats">
			<div className="stats-row">
				<span>Total rolls {Math.max(totalRolls, storedRolls)}</span>
			</div>
		</section>
	);
};
