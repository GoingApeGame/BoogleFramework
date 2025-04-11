import { BullshitHelpers } from "./BullshitHelpers";

interface BoogleLocalizationTable {
	[key: string]: string;
}

export abstract class Localizer {
	private static LocalizationTable?: BoogleLocalizationTable;

	public static SetLocalizationTable(LocalizationTable: BoogleLocalizationTable) {
		this.LocalizationTable = LocalizationTable;
	}

	public static GetLocalizedString(Key: string): string {
		if (!this.LocalizationTable) {
			BullshitHelpers.LogError("Localization table is not set.");
			return Key;
		}

		const String = this.LocalizationTable[Key];
		return String !== undefined ? String : Key;
	}

	public static GetLocalizedStringWithValues(Key: string, Values: Array<defined>): string {
		let LocalizedString = this.GetLocalizedString(Key);

		Values.forEach((Value, Index) => {
			LocalizedString = LocalizedString.gsub(`{${Index}}`, tostring(Value))[0];
		});

		return LocalizedString;
	}

	public static GetLocalizedStringWithFormattedKey(UnformattedKey: string, Values: Array<defined>): string {
		Values.forEach((Value, Index) => {
			UnformattedKey = UnformattedKey.gsub(`{${Index}}`, tostring(Value))[0];
		});

		return this.GetLocalizedString(UnformattedKey);
	}
}
