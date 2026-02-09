import type { ListMode } from "../Pages/Homepage";

export const PAGE_META: Record<
	ListMode,
	{
		title: string;
		description: string;
	}
> = {
	food: {
		title: "What Should I Eat Tonight? 🎲 | Roll For It",
		description:
			"Can't decide what to eat? Roll the dice and let chance choose your next meal.",
	},
	date: {
		title: "Date Night Ideas ❤️ | Roll For It",
		description:
			"Stuck on date ideas? Roll the dice and get inspired instantly.",
	},
	movies: {
		title: "What Movie Should I Watch? 🎬 | Roll For It",
		description:
			"Let the dice pick your next movie night genre for you.",
	},
	custom: {
		title: "Custom Dice 🎲 | Roll For It",
		description:
			"Create and roll your own custom decision dice.",
	},
};
