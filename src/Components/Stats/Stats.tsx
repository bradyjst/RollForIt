import "./Stats.css";

type StatsProps = {
	lastRoll: number | null;
	totalRolls: number;
};

export const Stats = ({ lastRoll, totalRolls }: StatsProps) => {
	return (
		<section className="stats">
			<h3 className="stats-title">Stats</h3>

			<div className="stats-row">
				<span>Last roll</span>
				<span>{lastRoll ?? "—"}</span>
			</div>

			<div className="stats-row">
				<span>Total rolls</span>
				<span>{totalRolls}</span>
			</div>
		</section>
	);
};
