import { Link } from "react-router-dom";
import "./homepage.css";

export default function About() {
	return (
		<div className="page-container">
			<h1>About Roll For It</h1>

			<p>
				Roll For It is a simple decision-making tool designed to help you break
				indecision with randomness.
			</p>

			<p>
				When you’re stuck choosing between multiple options—what to play, what
				to work on, or what to do next—Roll For It lets you define a list and
				let the dice decide.
			</p>

			<p>
				The app is intentionally lightweight. No accounts, no hidden logic, and
				no manipulation of outcomes. Every roll is fair and generated in real
				time.
			</p>

			<Link to="/" className="back-home">
				← Back to Home
			</Link>
		</div>
	);
}
