/**
 * MongoDB-style ObjectId for Roblox with correct byte layout and string support.
 */
export declare class MongoId implements IMongoId {
    private static BaseIncrement;
    private static BaseProcessId;
    private static getBaseMachine;
    private Timestamp;
    private Machine;
    private ProcessId;
    private Increment;
    readonly Buffer: buffer;
    constructor(Timestamp?: number, Machine?: number, ProcessId?: number, Increment?: number);
    /**
     * @deprecated
     */
    static GenerateString(): string;
    static FromString(ID: string): MongoId;
    GenerateNextId(): MongoId;
    toString(): string;
}
