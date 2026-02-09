import type { D20Face } from "./d20Faces";
import { D20_FACES, DATE_NIGHT_FACES, MOVIE_GENRE_FACES } from "./d20Faces";

export type DiceConfig = {
	slug: string;
	title: string;
	description: string;
	faces: D20Face[];
	isCustom?: boolean;
};

export const DICE_REGISTRY: DiceConfig[] = [
	{
		slug: "what-should-i-eat",
		title: "What Should I Eat Tonight?",
		description: "Can’t decide what to eat? Roll the dice.",
		faces: D20_FACES,
	},
	{
		slug: "date-ideas",
		title: "Date Night Ideas",
		description: "Roll the dice to pick a date idea.",
		faces: DATE_NIGHT_FACES,
	},
	{
		slug: "movie-night",
		title: "What Movie Should I Watch?",
		description: "Roll the dice to pick a movie genre.",
		faces: MOVIE_GENRE_FACES,
	},
	{
		slug: "custom-dice",
		title: "Custom Dice",
		description: "Create your own dice with custom options.",
		faces: Array.from({ length: 20 }, (_, i) => ({
			value: i + 1,
			text: "",
		})),
		isCustom: true,
	},
];
