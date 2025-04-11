/**
 * A definitely inaccurate implementation of a MongoDB ObjectId.
 * But it's good enough for most use cases.
 */
export declare class MongoId {
    private static Increment;
    private static Pid;
    private static Machine;
    Timestamp: number;
    Machine: number;
    Pid: number;
    Increment: number;
    constructor(Id?: string);
    static GenerateString(): string;
    /**
     * Converts the MongoId to a 24-character hexadecimal string.
     * @returns {string} The MongoId as a 24-character string.
     */
    ToString(): string;
    /**
     * Compares this MongoId to another MongoId / string.
     */
    Equals(Id: MongoId | string): boolean;
    /**
     * Gets the date represented by this MongoId.
     * @returns {DateTime} The date of the MongoId.
     */
    GetDate(): DateTime;
    /**
     * Converts the MongoId to an array of bytes.
     * @returns {number[]} The MongoId as a byte array.
     */
    ToArray(): number[];
}
