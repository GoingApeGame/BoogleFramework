interface BoogleLocalizationTable {
    [key: string]: string;
}
export declare abstract class Localizer {
    private static LocalizationTable?;
    static SetLocalizationTable(LocalizationTable: BoogleLocalizationTable): void;
    static GetLocalizedString(Key: string): string;
    static GetLocalizedStringWithValues(Key: string, Values: Array<defined>): string;
    static GetLocalizedStringWithFormattedKey(UnformattedKey: string, Values: Array<defined>): string;
}
export {};
