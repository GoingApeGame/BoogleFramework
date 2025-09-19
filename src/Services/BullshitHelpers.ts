import { RunService } from "@rbxts/services";

export abstract class BullshitHelpers {
	public static RoundToDecimal(Value: number, DecimalPlaces: number) {
		const Multiplier = math.pow(10, DecimalPlaces);
		const RoundedValue = math.round(Value * Multiplier) / Multiplier;

		return RoundedValue;
	}
}
