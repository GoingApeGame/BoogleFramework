/**
 * A definitely inaccurate implementation of a MongoDB ObjectId.
 * But it's good enough for most use cases.
 */
export class MongoId {
	private static Increment = math.random(0, 0xffffff);
	private static Pid = math.random(0, 0xffff);
	private static Machine = math.random(0, 0xffffff);

	public Timestamp: number;
	public Machine: number;
	public Pid: number;
	public Increment: number;

	constructor(Id?: string) {
		if (Id && Id.size() === 24) {
			// Parse from string
			this.Timestamp = tonumber(Id.sub(1, 8), 16) as number;
			this.Machine = tonumber(Id.sub(9, 14), 16) as number;
			this.Pid = tonumber(Id.sub(15, 18), 16) as number;
			this.Increment = tonumber(Id.sub(19, 24), 16) as number;
		} else if (Id === undefined) {
			// Default generation
			this.Timestamp = math.floor(os.time());
			this.Machine = MongoId.Machine;
			this.Pid = MongoId.Pid;
			this.Increment = MongoId.Increment++;
			if (MongoId.Increment > 0xffffff) {
				MongoId.Increment = 0;
			}
		} else {
			throw "Invalid MongoId string.";
		}
	}

	public static GenerateString(): string {
		return new MongoId().ToString();
	}

	/**
	 * Converts the MongoId to a 24-character hexadecimal string.
	 * @returns {string} The MongoId as a 24-character string.
	 */
	public ToString(): string {
		const TimestampHex = string.format("%08x", this.Timestamp);
		const MachineHex = string.format("%06x", this.Machine);
		const PidHex = string.format("%04x", this.Pid);
		const IncrementHex = string.format("%06x", this.Increment);
		return TimestampHex + MachineHex + PidHex + IncrementHex;
	}

	/**
	 * Compares this MongoId to another MongoId / string.
	 */
	public Equals(Id: MongoId | string): boolean {
		if (typeIs(Id, "string")) {
			Id = new MongoId(Id);
		}
		return (
			this.Timestamp === Id.Timestamp &&
			this.Machine === Id.Machine &&
			this.Pid === Id.Pid &&
			this.Increment === Id.Increment
		);
	}

	/**
	 * Gets the date represented by this MongoId.
	 * @returns {DateTime} The date of the MongoId.
	 */
	public GetDate(): DateTime {
		return DateTime.fromUnixTimestamp(this.Timestamp);
	}

	/**
	 * Converts the MongoId to an array of bytes.
	 * @returns {number[]} The MongoId as a byte array.
	 */
	public ToArray(): number[] {
		const StrId = this.ToString();
		const Array: number[] = [];
		for (let I = 0; I < 12; I++) {
			Array.push(tonumber(StrId.sub(I * 2 + 1, I * 2 + 2), 16) as number);
		}
		return Array;
	}
}
