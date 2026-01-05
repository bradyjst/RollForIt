import "./ServiceModal.css";

type Props = {
	onClose: () => void;
};

export const ServicesModal = ({ onClose }: Props) => {
	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<h3>Our Services</h3>

				<ul className="modal-links">
					<li>
						<a href="/evchargers.html">EV Chargers</a>
					</li>
					<li>
						<a href="/securitycameras.html">Security Cameras</a>
					</li>
					<li>
						<a href="/residential.html">Residential</a>
					</li>
					<li>
						<a href="/commercial.html">Commercial</a>
					</li>
				</ul>

				<button className="modal-close" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};
