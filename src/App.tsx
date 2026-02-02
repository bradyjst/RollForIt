import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./Pages/Homepage";
import About from "./Pages/About";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";

import Contact from "./Pages/Contact";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<About />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/terms" element={<Terms />} />

				<Route path="/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
