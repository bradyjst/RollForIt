import "./InstallAppGuide.css";

export function InstallAppGuide() {
	return (
		<section className="install-guide">
			<h2>Install Roll For It as an App </h2>

			<p className="install-subtitle">
				Roll For It can be installed directly from your browser on both mobile
				and desktop. Once installed, it behaves like a native app.
			</p>

			<div className="install-card single-flow">
				<h3>How to install</h3>

				<ol>
					<li>Open Roll For It in Chrome or Edge</li>
					<li>
						Look for the <strong>Install</strong> icon in the address bar
					</li>
					<li>
						Click or tap <strong>Install</strong>
					</li>
					<li>Launch Roll For It like a normal app</li>
				</ol>

				<div className="screenshot-placeholder">
					<img
						src="mobiletutorial.jpeg"
						alt="Install app from browser address bar"
					/>
				</div>

				<p className="install-hint">
					If you don’t see the install icon, open the browser menu (⋮) and
					select
					<strong> Install App</strong>.
				</p>
			</div>

			<p className="install-footer">
				Installed apps launch faster, work offline, and stay out of your browser
				tabs.
			</p>
		</section>
	);
}
