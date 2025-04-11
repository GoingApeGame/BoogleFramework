import { RunService } from "@rbxts/services";

export default class BullshitHelpers {
	protected static ColoredCircles = {
		Green: "🟢",
		Red: "🔴",
		Orange: "🟠",
		Yellow: "🟡",
		Blue: "🔵",
		Purple: "🟣",
		White: "⚪",
	} as const;

	public static RoundToDecimal(Value: number, DecimalPlaces: number) {
		const Multiplier = math.pow(10, DecimalPlaces);
		const RoundedValue = math.round(Value * Multiplier) / Multiplier;

		return RoundedValue;
	}

	public static LogColor(Color: keyof typeof BullshitHelpers.ColoredCircles, ...Params: Array<unknown>) {
		const Circle = BullshitHelpers.ColoredCircles[Color];

		const RunTimeText = `${RunService.IsClient() ? "Client" : "Server"}`;

		print(Circle, `[${RunTimeText}]`, ...Params);
	}

	public static Log(...Params: Array<unknown>) {
		this.LogColor("White", ...Params);
	}

	public static LogError(...Params: Array<unknown>) {
		this.LogColor("Red", ...Params);
	}

	public static LogSuccess(...Params: Array<unknown>) {
		this.LogColor("Green", ...Params);
	}

	public static LogWarning(...Params: Array<unknown>) {
		this.LogColor("Yellow", ...Params);
	}

	public static LogInfo(...Params: Array<unknown>) {
		this.LogColor("Blue", ...Params);
	}
}
