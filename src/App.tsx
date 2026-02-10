import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./Pages/Homepage";
import About from "./Pages/About";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Contact from "./Pages/Contact";
import { ExecutiveDysfunctionArticle } from "./Pages/Articles/ExecutiveDysfunctionArticle";
import { ThinkingTooMuchArticle } from "./Pages/Articles/ThinkingTooMuchArticle";
import "./App.css";
import { AvoidanceAndDecisionMakingArticle } from "./Pages/Articles/WhyAvoidanceHijacksDecisionMaking";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/what-should-i-eat" replace />}
				/>

				<Route path="/:diceSlug" element={<Homepage />} />

				{/* Articles */}
				<Route
					path="/articles/ExecutiveDysfunctionArticle"
					element={<ExecutiveDysfunctionArticle />}
				/>
				<Route
					path="/articles/ThinkingTooMuchArticle"
					element={<ThinkingTooMuchArticle />}
				/>
				<Route
					path="/articles/WhyAvoidanceHijacksDecisionMaking"
					element={<AvoidanceAndDecisionMakingArticle />}
				/>

				<Route path="/about" element={<About />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
