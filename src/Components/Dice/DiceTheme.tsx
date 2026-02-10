export type DiceTheme = {
	bodyColor: string;
	edgeColor: string;
	textColor: string;
	metalness: number;
	roughness: number;
	clearcoat: number;
	rollTime: number;
};

export const FOOD_DICE_THEME: DiceTheme = {
	bodyColor: "#f5e6c8",
	edgeColor: "#ff6b35",
	textColor: "#2b2b2b",
	metalness: 0.15,
	roughness: 0.85,
	clearcoat: 0.4,
	rollTime: 2.3,
};

export const DATE_DICE_THEME: DiceTheme = {
	bodyColor: "#0b0b0b",
	edgeColor: "#ff2a2a",
	textColor: "#ff2a2a",
	metalness: 0.6,
	roughness: 0.35,
	clearcoat: 1,
	rollTime: 2.5,
};

export const MOVIE_DICE_THEME: DiceTheme = {
	bodyColor: "#0e0e11",
	edgeColor: "#4cc9f0",
	textColor: "#e5e5e5",
	metalness: 0.8,
	roughness: 0.35,
	clearcoat: 0.9,
	rollTime: 2.8,
};

export const CUSTOM_DICE_THEME: DiceTheme = {
	bodyColor: "#f0f0f0",
	edgeColor: "#7c7c7c",
	textColor: "#1f1f1f",
	metalness: 0.4,
	roughness: 0.6,
	clearcoat: 0.6,
	rollTime: 2.5,
};
