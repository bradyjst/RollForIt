import { Link } from "react-router-dom";
import "./Homepage.css";

export default function HowItWorks() {
	return (
		<div className="page-container">
			<h1>How the Dice Works</h1>

			<p>
				Roll For It uses true random number generation provided by your browser.
				Every roll is independent, unbiased, and calculated in real time.
			</p>

			<ol>
				<li>You select or create a list of options</li>
				<li>Each option is given equal probability</li>
				<li>A random dice roll is generated when you press Roll</li>
				<li>The roll is mapped directly to one option</li>
			</ol>

			<h2>How results are selected</h2>

			<p>
				When a roll occurs, Roll For It maps the dice value to your list using a
				simple and fair mathematical formula called <strong>modulo</strong>.
			</p>

			<p>The formula used is:</p>

			<pre className="code-block">{`index = (roll - 1) % numberOfOptions`}</pre>

			<p>
				Dice rolls are counted from 1, while lists are counted from 0.
				Subtracting 1 aligns the two correctly. The modulo operation ensures
				that if the dice roll is larger than the number of available options, it
				safely wraps back around the list.
			</p>

			<p>
				This guarantees that every option has an equal chance of being selected,
				with no weighting, memory, or bias between rolls.
			</p>

			<h2>About animations</h2>

			<p>
				Animations are purely visual and do not influence the outcome. The
				result is determined instantly when you roll, before any animation
				finishes.
			</p>

			<Link to="/" className="back-home">
				← Back to Home
			</Link>
		</div>
	);
}
