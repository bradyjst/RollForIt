import { Link } from "react-router-dom";
import "./Homepage.css";

export default function Privacy() {
	return (
		<div className="page-container">
			<h1>Privacy Policy</h1>

			<p>
				Roll For It respects your privacy. We do not collect personal
				information.
			</p>

			<h2>What we collect</h2>
			<ul>
				<li>Anonymous usage data</li>
				<li>Standard analytics data</li>
			</ul>

			<h2>What we do not collect</h2>
			<ul>
				<li>Names or emails</li>
				<li>Passwords or payment information</li>
			</ul>

			<p>
				Third-party services such as Google Analytics or AdSense may collect
				anonymous data according to their own policies.
			</p>

			<Link to="/" className="back-home">
				← Back to Home
			</Link>
		</div>
	);
}
