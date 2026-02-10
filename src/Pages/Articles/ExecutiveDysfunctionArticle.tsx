// ExecutiveDysfunctionArticle.tsx
import Footer from "../../Components/Footer/Footer";
import { PageHeader } from "../../Components/PageHeader/PageHeader";
import "./Articles.css";
import { Link } from "react-router-dom";

export function ExecutiveDysfunctionArticle() {
	return (
		<>
			<PageHeader
				title="Executive Dysfunction"
				subtitle="Why Small Decisions Can Feel Weirdly Hard"
			/>
			<article className="article">
				<p className="article-intro">
					Executive functions are the brain’s “management system” — the skills
					that let you plan, focus, ignore distractions, shift gears, and carry
					out goal-directed behavior. When those skills aren’t working smoothly,
					daily life can feel disproportionately difficult, even if you know
					what you should do.
				</p>

				<h2>What executive functions actually are</h2>
				<p>
					Executive functions are a set of cognitive abilities that support
					goal-oriented behavior. They help you generate ideas, hold information
					in mind, filter out distractions, adjust when circumstances change,
					and organize actions across multiple steps.
				</p>

				<div className="article-callout">
					<p>
						<strong>In plain language:</strong> executive function is what turns
						intentions into action — especially when life is noisy, distracting,
						or requires multiple steps.
					</p>
				</div>

				<h2>The four core components</h2>
				<p>
					Clinically, executive function is often described in terms of four
					interacting components: working memory, inhibition, set shifting, and
					fluency. These systems can be affected differently from person to
					person.
				</p>

				<h3>1) Working memory</h3>
				<p>
					Working memory is a limited mental workspace used to temporarily store
					and manipulate information — like keeping track of steps in a task or
					holding multiple options in mind while deciding.
				</p>

				<h3>2) Inhibition</h3>
				<p>
					Inhibition allows you to suppress distractions or impulses that don’t
					match your current goal. When inhibition is weaker, irrelevant
					thoughts or stimuli can pull attention away even when you want to stay
					focused.
				</p>

				<h3>3) Set shifting</h3>
				<p>
					Set shifting is the ability to switch mental gears. Difficulties here
					can show up as rigid thinking, trouble transitioning between tasks, or
					getting stuck when plans change.
				</p>

				<h3>4) Fluency</h3>
				<p>
					Fluency refers to generating ideas efficiently. When fluency is
					impaired, it can feel like your brain stalls — the answer is there,
					but slow to surface.
				</p>

				<h2>Why it impacts everyday life</h2>
				<p>
					Executive skills are involved in nearly everything we do: planning,
					starting tasks, sequencing actions, monitoring progress, and adjusting
					when something goes off track. When these systems are taxed or
					inefficient, even low-stakes decisions can feel overwhelming.
				</p>

				<h2>“My memory is bad” — but it’s often not memory</h2>
				<p>
					People experiencing executive difficulties often describe the problem
					as poor memory. In many cases, the underlying issue is actually
					attention and organization, not the ability to store information. When
					attention is overloaded, information never gets encoded properly in
					the first place.
				</p>

				<h2>It’s not just one brain region</h2>
				<p>
					Executive function depends on distributed brain networks, not a single
					“control center.” Disruptions in attention systems, motivation, sleep,
					stress levels, or neurological pathways can all affect how well these
					skills operate.
				</p>

				<h2>What helps in practice</h2>
				<p>
					Real-world support often focuses on reducing cognitive load rather
					than “trying harder.” Simplifying choices, minimizing distractions,
					using external tools, and breaking tasks into smaller steps can all
					improve functioning when executive systems are under strain.
				</p>

				<h2>Where Roll For It fits</h2>
				<p>
					Roll For It doesn’t treat executive dysfunction. What it does is
					remove decision friction for low-stakes choices. When your brain is
					overloaded, replacing internal deliberation with a simple external
					prompt can help you move forward instead of getting stuck.
				</p>

				<div className="article-quote">
					“When choices feel expensive, reducing the number of steps to action
					is a feature — not a shortcut.”
				</div>

				<footer className="article-footer">
					<p className="article-source">
						<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4455841/">
							Source: Rabinovici GD, Stephens ML, Possin KL.{" "}
							<em>Executive Dysfunction</em>. Continuum (Minneap Minn). 2015.
							PMCID: PMC4455841.
						</a>
					</p>
				</footer>
				<Link to={"/what-should-i-eat"}>← Back to Home</Link>
			</article>
			<Footer />
		</>
	);
}
