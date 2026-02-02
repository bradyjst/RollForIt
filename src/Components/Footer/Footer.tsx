import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
	return (
		<footer className="site-footer">
			<nav className="footer-links">
				<Link to="/about">About</Link>
				<Link to="/terms">Terms</Link>
				<Link to="/privacy">Privacy</Link>
				<Link to="/contact">Contact</Link>
			</nav>

			<p className="footer-copy">
				© {new Date().getFullYear()} Roll For It. All rights reserved.
			</p>
		</footer>
	);
}
