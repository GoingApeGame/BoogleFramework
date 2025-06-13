/**
 *@category Shared
 */
export declare class MongoId {
    private static BaseIncrement;
    private static BaseProcessId;
    private static getBaseMachine;
    private Timestamp;
    private Machine;
    private ProcessId;
    private Increment;
    Buffer: buffer;
    constructor(Timestamp?: number, Machine?: number, ProcessId?: number, Increment?: number);
    private toString;
    private Compare;
    GenerateNextId(): MongoId;
    /**
     * @deprecated
     */
    static GenerateString(): string;
    static FromString(ID: string): MongoId;
}
