import "./PageHeader.css";
import { useEffect, useState } from "react";

type PageHeaderProps = {
	title: string;
	subtitle?: string;
};

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
	// ✅ Initialize from localStorage ONCE
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		return (localStorage.getItem("theme") as "light" | "dark") || "dark";
	});

	// ✅ Effect only syncs external system (DOM)
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	function toggleTheme() {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		localStorage.setItem("theme", next);
	}

	return (
		<section className="page-header">
			<div className="page-header-container">
				<div className="page-header-title-row">
					<h1>{title}</h1>

					<button
						className="theme-toggle"
						onClick={toggleTheme}
						aria-label="Toggle theme"
					>
						{theme === "dark" ? "🌙" : "☀️"}
					</button>
				</div>

				{subtitle && <p>{subtitle}</p>}
			</div>
		</section>
	);
};
