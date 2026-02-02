import { Link } from "react-router-dom";
import "./Homepage.css";

export default function Contact() {
	return (
		<div className="page-container">
			<h1>Contact</h1>

			<p>Questions, feedback, or suggestions? Reach out anytime.</p>

			<p className="contact-email">rollforitapp@gmail.com</p>

			<Link to="/" className="back-home">
				← Back to Home
			</Link>
		</div>
	);
}
