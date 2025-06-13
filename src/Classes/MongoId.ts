/**
 *@category Shared
 */
export class MongoId {
	private static BaseIncrement = math.random(0, 0xffffff);
	private static BaseProcessId = math.random(0, 0xffff);

	private static getBaseMachine(): number {
		const JobId = game.JobId;

		// Hash it into a 24-bit integer (basic FNV-1a-like hash)
		let Hash = 0;

		for (let I = 0; I < JobId.size(); I++) {
			const CharCode = JobId.byte(I + 1)[0]; // Lua strings are 1-indexed
			Hash = bit32.band(bit32.bxor(Hash * 16777619, CharCode), 0xffffff);
		}

		return Hash;
	}

	private Timestamp: number;
	private Machine: number;
	private ProcessId: number;
	private Increment: number;

	public Buffer: buffer;

	public constructor(Timestamp?: number, Machine?: number, ProcessId?: number, Increment?: number) {
		this.Timestamp = Timestamp ?? math.floor(DateTime.now().UnixTimestamp);
		this.Machine = Machine ?? MongoId.getBaseMachine();
		this.ProcessId = ProcessId ?? MongoId.BaseProcessId;
		this.Increment = Increment ?? MongoId.BaseIncrement++ & 0xffffff;

		this.Buffer = buffer.create(12);

		buffer.writeu32(this.Buffer, 0, this.Timestamp);

		buffer.writeu8(this.Buffer, 4, (this.Machine >> 16) & 0xff);
		buffer.writeu8(this.Buffer, 5, (this.Machine >> 8) & 0xff);
		buffer.writeu8(this.Buffer, 6, this.Machine & 0xff);

		buffer.writeu16(this.Buffer, 7, this.ProcessId);

		buffer.writeu8(this.Buffer, 9, (this.Increment >> 16) & 0xff);
		buffer.writeu8(this.Buffer, 10, (this.Increment >> 8) & 0xff);
		buffer.writeu8(this.Buffer, 11, this.Increment & 0xff);
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	private toString(): string {
		const TimestampHex = string.format("%08x", this.Timestamp);
		const MachineHex = string.format("%06x", this.Machine);
		const PidHex = string.format("%04x", this.ProcessId);
		const IncrementHex = string.format("%06x", this.Increment);

		return TimestampHex + MachineHex + PidHex + IncrementHex;
	}

	public GenerateNextId(): MongoId {
		return new MongoId(this.Timestamp, this.Machine, this.ProcessId, (this.Increment + 1) & 0xffffff);
	}

	/**
	 * @deprecated
	 */
	public static GenerateString(): string {
		return new MongoId().toString();
	}

	public static FromString(ID: string): MongoId {
		if (ID.size() !== 24) {
			throw "Invalid MongoId format: must be 24 characters long";
		}

		const Buffer = buffer.create(12);
		for (let I = 0; I < 12; I++) {
			const Byte = tonumber(ID.sub(I * 2 + 1, I * 2 + 2), 16);
			if (Byte === undefined || Byte !== Byte) {
				throw "Invalid MongoId hex digit";
			}
			buffer.writeu8(Buffer, I, Byte);
		}

		const Parsed = new MongoId();
		Parsed.Buffer = Buffer;

		Parsed.Timestamp = buffer.readu32(Buffer, 0);
		Parsed.Machine = (buffer.readu8(Buffer, 4) << 16) | (buffer.readu8(Buffer, 5) << 8) | buffer.readu8(Buffer, 6);

		Parsed.ProcessId = buffer.readu16(Buffer, 7);

		Parsed.Increment =
			(buffer.readu8(Buffer, 9) << 16) | (buffer.readu8(Buffer, 10) << 8) | buffer.readu8(Buffer, 11);

		return Parsed;
	}
}

(MongoId as LuaMetatable<MongoId>).__eq = (A: MongoId, B: MongoId): boolean => {
	return tostring(A) === tostring(B);
};
