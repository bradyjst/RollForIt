import { useState } from "react";
import "./Modal.css";

type CustomListModalProps = {
	onSave: (items: string[]) => void;
	onClose: () => void;
};

export const CustomListModal = ({ onSave, onClose }: CustomListModalProps) => {
	const [items, setItems] = useState<string[]>(Array(20).fill(""));

	const updateItem = (index: number, value: string) => {
		const next = [...items];
		next[index] = value;
		setItems(next);
	};

	const handleSave = () => {
		const filtered = items.map((i) => i.trim());
		onSave(filtered);
		onClose();
	};

	return (
		<div className="modal-backdrop">
			<div className="modal">
				<h2 style={{ textAlign: "center" }}>Custom Dice</h2>
				<h5 style={{ textAlign: "center" }}>
					You don't need to fill every slot, the dice will figure it out.
				</h5>

				{items.map((item, i) => (
					<input
						key={i}
						placeholder={`Slot ${i + 1} `}
						value={item}
						onChange={(e) => updateItem(i, e.target.value)}
					/>
				))}

				<div className="modal-actions">
					<button onClick={handleSave}>Save</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
};
