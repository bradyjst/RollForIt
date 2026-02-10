// WhyDiceWorksArticle.tsx
import "./WhyItWorks.css";
import { Link } from "react-router-dom";

export function WhyDiceWorksArticle() {
	return (
		<article className="why-dice-works">
			<header className="why-dice-works__header">
				<h1>Why the Dice Works</h1>
				<p className="why-dice-works__subtitle">
					The point of Roll For It isn’t “randomness.” It’s getting you unstuck
					when your brain is tired of choosing.
				</p>
			</header>

			<section>
				<h2>Decision-making has a cost</h2>
				<p>
					Many people don't realize that decision making actually has a cost!
					Research describes <strong>decision fatigue</strong> as a state where
					repeated decision-making can impair your ability to make decisions and
					control behavior. In other words: the more choices you grind through,
					the harder it gets to pick well later.
				</p>
			</section>

			<section>
				<h2>What decision fatigue looks like in real life</h2>
				<p>
					When people are decision-fatigued, studies describe common patterns:
				</p>
				<ul>
					<li>
						<strong>Avoidance & procrastination:</strong> putting the choice off
						or not acting at all.
					</li>
					<li>
						<strong>Defaulting:</strong> choosing whatever option is easiest or
						pre-selected.
					</li>
					<li>
						<strong>Impulsivity:</strong> making faster, less-considered
						choices.
					</li>
					<li>
						<strong>Reduced cognitive performance:</strong> less executive
						function and reasoning, and more reliance on mental shortcuts
						(heuristics).
					</li>
				</ul>
				<p>
					That’s why “What should we eat?” can feel weirdly hard at the end of a
					long day, it’s not the question, it’s the mental load behind it.
				</p>
			</section>

			<section>
				<h2>How a dice roll helps</h2>
				<p>
					A dice roll changes the problem. Instead of your brain doing endless
					compare and contrast, the roll gives you a single next step. That
					matters because decision fatigue often pushes people toward avoiding
					the decision, defaulting, or making a quick impulse pick anyway.
				</p>

				<p>
					<Link to="/articles/executive-dysfunction">
						Read more about why small decisions feel hard →
					</Link>
				</p>

				<p className="why-dice-works__source">
					<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6119549/">
						Source: “Decision Fatigue: A Conceptual Analysis” (Pignatiello,
						Martin, &amp; Hickman).
					</a>
				</p>
				<div className="why-dice-works__callout">
					<p>
						<strong>Roll For It is a tie-breaker.</strong> You still control the
						options, the dice just removes the mental grind of picking.
					</p>
				</div>
			</section>

			<section>
				<h2>Random doesn’t mean meaningless</h2>
				<p>
					My wife will sometimes ask me to number two options so she can choose
					one at random. Most of the time, I already know which one she wants.
					When she picks the other and feels disappointed, that reaction
					instantly reveals the real answer.
				</p>
			</section>

			<section>
				<h2>When the dice is a great fit</h2>
				<ul>
					<li>Meals</li>
					<li>Movie night</li>
					<li>Date ideas</li>
					<li>Low-stakes “what should I do next?” decisions</li>
				</ul>
				<p className="why-dice-works__fineprint">
					Not for high-stakes decisions (money, safety, medical, etc.). The dice
					is best for breaking paralysis on everyday choices.
				</p>
			</section>

			<footer className="why-dice-works__footer">
				<p>
					<strong>Try one roll.</strong> If it gives you a clear “yes,” go with
					it. If it gives you a clear “no,” you just learned something about
					what you actually want.
				</p>
			</footer>
		</article>
	);
}
