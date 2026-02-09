export type DiceTheme = {
	bodyColor: string;
	edgeColor: string;
	textColor: string;
	metalness: number;
	roughness: number;
	clearcoat: number;
};

export const DEFAULT_DICE_THEME: DiceTheme = {
	bodyColor: "#f0f0f0",
	edgeColor: "#ff2a2a",
	textColor: "#ffffff",
	metalness: 0.6,
	roughness: 1,
	clearcoat: 1,
};
