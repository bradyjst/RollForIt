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

			<nav className="footer-articles">
				<Link to="/articles/ExecutiveDysfunctionArticle">
					Why Small Decisions Feel Hard
				</Link>
				<Link to="/articles/ThinkingTooMuchArticle">Thinking Too Much</Link>
				<Link to="/articles/WhyAvoidanceHijacksDecisionMaking">
					Why Avoidance Hijacks Decision Making
				</Link>
			</nav>

			<p className="footer-copy">
				© {new Date().getFullYear()} Roll For It. All rights reserved.
			</p>
		</footer>
	);
}
