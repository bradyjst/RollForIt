import Footer from "../../Components/Footer/Footer";
import { PageHeader } from "../../Components/PageHeader/PageHeader";
import "./Articles.css";
import { Link } from "react-router-dom";

export function ThinkingTooMuchArticle() {
	return (
		<>
			<PageHeader
				title="Thinking Too Much"
				subtitle="Why Persistent Thought Can Feel Overwhelming"
			/>

			<article className="article">
				<p className="article-intro">
					“Thinking too much” is a phrase people across the world use to
					describe a specific kind of mental strain — persistent, repetitive
					thoughts that feel difficult to stop. While the expression may sound
					casual, research shows it reflects a real and widely recognized form
					of psychological distress.
				</p>

				<h2>What people mean when they say they’re thinking too much</h2>
				<p>
					Across cultures, people use similar language to describe experiences
					of constant mental activity. These thoughts often revolve around
					unresolved problems, worries about the future, or replaying past
					events. The key feature is not the content of the thoughts, but their
					persistence and intrusiveness.
				</p>

				<h2>More than overthinking</h2>
				<p>
					“Thinking too much” is not simply a personality trait or a bad habit.
					In many cultural contexts, it is understood as a sign of emotional
					burden — something that can affect sleep, concentration, motivation,
					and even physical well-being. People describe it as exhausting,
					distracting, and hard to control.
				</p>

				<div className="article-callout">
					<p>
						<strong>In plain terms:</strong> persistent thinking isn’t a failure
						of discipline — it’s often a signal that the brain is overloaded or
						under stress.
					</p>
				</div>

				<h2>How it shows up day to day</h2>
				<p>
					People experiencing this kind of mental overload often report
					difficulty focusing, trouble making decisions, and a feeling of being
					“stuck” mentally. Thoughts may loop without leading to action,
					creating frustration and self-doubt.
				</p>

				<ul>
					<li>Replaying the same concerns without resolution</li>
					<li>Feeling mentally busy even during rest</li>
					<li>Difficulty choosing between options</li>
					<li>Fatigue caused by constant internal dialogue</li>
				</ul>

				<h2>Why decisions feel harder</h2>
				<p>
					When mental resources are consumed by repetitive thought, there is
					less capacity available for planning and decision making. Even small,
					low-stakes choices can feel heavy because the brain is already
					juggling unresolved concerns. This is why decision paralysis often
					accompanies periods of intense rumination.
				</p>

				<h2>Culture shapes how distress is described</h2>
				<p>
					One important insight from research is that “thinking too much” does
					not map neatly onto a single clinical diagnosis. Instead, it reflects
					a culturally meaningful way people describe mental strain. This
					reminds us that distress doesn’t always fit into neat categories — but
					it is still very real.
				</p>

				<h2>Reducing mental load instead of fighting thoughts</h2>
				<p>
					Practical support often focuses on reducing cognitive load rather than
					suppressing thoughts. Simplifying decisions, adding structure, and
					externalizing choice can help break mental loops and restore a sense
					of forward motion.
				</p>

				<div className="article-quote">
					“When thinking becomes relentless, reducing the number of decisions
					the mind must hold can create space to move again.”
				</div>

				<footer className="article-footer">
					<p className="article-source">
						<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4689615/">
							Source: Kaiser BN, Haroz EE, Kohrt BA, et al.{" "}
							<em>
								“Thinking Too Much”: A systematic review of a common idiom of
								distress
							</em>
							. Social Science & Medicine. 2015. PMCID: PMC4689615.
						</a>
					</p>
				</footer>

				<Link to={"/what-should-i-eat"}>← Back to Home</Link>
			</article>

			<Footer />
		</>
	);
}
