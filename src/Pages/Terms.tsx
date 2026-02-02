import { Link } from "react-router-dom";
import "./Homepage.css";

export default function Terms() {
	return (
		<div className="page-container">
			<h1>Terms of Service</h1>

			<p>
				Roll For It is provided “as is” without warranties of any kind. Results
				are for entertainment and casual decision-making only.
			</p>

			<p>
				You are responsible for any decisions made using this app. Roll For It
				should not be used for legal, medical, financial, or safety-critical
				decisions.
			</p>

			<p>
				We reserve the right to modify or discontinue the service at any time.
				Continued use implies acceptance of these terms.
			</p>

			<Link to="/" className="back-home">
				← Back to Home
			</Link>
		</div>
	);
}
