import { DicePreview } from "../Dice/DicePreview";
import type { DiceTheme } from "../Dice/DiceTheme";
import "./StyleEditor.css";

type Props = {
	theme: DiceTheme;
	onChange: (next: DiceTheme) => void;
	resetTheme: () => void;
};

export const StyleEditor = ({ theme, onChange, resetTheme }: Props) => {
	return (
		<div className="dice-theme-editor">
			<h3>Dice Appearance</h3>
			<DicePreview theme={theme} />

			<div className="theme-row">
				<label>Body</label>
				<input
					type="color"
					value={theme.bodyColor}
					onChange={(e) => onChange({ ...theme, bodyColor: e.target.value })}
				/>
			</div>

			<div className="theme-row">
				<label>Edges</label>
				<input
					type="color"
					value={theme.edgeColor}
					onChange={(e) => onChange({ ...theme, edgeColor: e.target.value })}
				/>
			</div>

			<div className="theme-row">
				<label>Text</label>
				<input
					type="color"
					value={theme.textColor}
					onChange={(e) => onChange({ ...theme, textColor: e.target.value })}
				/>
			</div>

			<div className="theme-row">
				<label>Metalness</label>
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={theme.metalness}
					onChange={(e) =>
						onChange({
							...theme,
							metalness: Number(e.target.value),
						})
					}
				/>
			</div>

			<div className="theme-row">
				<label>Roughness</label>
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={theme.roughness}
					onChange={(e) =>
						onChange({
							...theme,
							roughness: Number(e.target.value),
						})
					}
				/>
			</div>

			<div className="theme-number">
				<label>Roll Time</label>
				<input
					type="number"
					min={0}
					max={10}
					step={0.5}
					value={theme.rollTime}
					onChange={(e) =>
						onChange({
							...theme,
							rollTime: Number(e.target.value),
						})
					}
				/>
			</div>
			<button className="style-reset" onClick={resetTheme}>
				Reset Theme
			</button>
		</div>
	);
};
