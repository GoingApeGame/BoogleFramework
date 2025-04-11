export declare abstract class BullshitHelpers {
    protected static ColoredCircles: {
        readonly Green: "🟢";
        readonly Red: "🔴";
        readonly Orange: "🟠";
        readonly Yellow: "🟡";
        readonly Blue: "🔵";
        readonly Purple: "🟣";
        readonly White: "⚪";
    };
    static RoundToDecimal(Value: number, DecimalPlaces: number): number;
    static LogColor(Color: keyof typeof BullshitHelpers.ColoredCircles, ...Params: Array<unknown>): void;
    static Log(...Params: Array<unknown>): void;
    static LogError(...Params: Array<unknown>): void;
    static LogSuccess(...Params: Array<unknown>): void;
    static LogWarning(...Params: Array<unknown>): void;
    static LogInfo(...Params: Array<unknown>): void;
}
