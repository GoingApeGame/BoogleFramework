/**
 * MongoDB-style ObjectId for Roblox with correct byte layout and string support.
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
    static FromString(ID: string): MongoId;
    GenerateNextId(): MongoId;
    toString(): string;
}
