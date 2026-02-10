import "./Stats.css";

type StatsProps = {
	totalRolls: number;
};

export const Stats = ({ totalRolls }: StatsProps) => {
	return (
		<section className="stats">
			<div className="stats-row">
				<span>Total rolls {totalRolls}</span>
			</div>
		</section>
	);
};
