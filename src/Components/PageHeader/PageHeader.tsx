import "./PageHeader.css";
import { useEffect, useState } from "react";

type PageHeaderProps = {
	title: string;
	subtitle?: string;
};

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		return (localStorage.getItem("theme") as "light" | "dark") || "dark";
	});

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
				<button
					className="theme-toggle"
					onClick={toggleTheme}
					aria-label="Toggle theme"
				>
					{theme === "dark" ? "🌙" : "☀️"}
				</button>

				<h1 className="page-title">{title}</h1>

				{subtitle && <p>{subtitle}</p>}
			</div>
		</section>
	);
};
