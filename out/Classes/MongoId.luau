-- Compiled with roblox-ts v3.0.0
--[[
	*
	 *@category Shared
	 
]]
local MongoId
do
	MongoId = setmetatable({}, {
		__tostring = function()
			return "MongoId"
		end,
	})
	MongoId.__index = MongoId
	function MongoId.new(...)
		local self = setmetatable({}, MongoId)
		return self:constructor(...) or self
	end
	function MongoId:constructor(Timestamp, Machine, ProcessId, Increment)
		local _condition = Timestamp
		if _condition == nil then
			_condition = math.floor(DateTime.now().UnixTimestamp)
		end
		self.Timestamp = _condition
		local _condition_1 = Machine
		if _condition_1 == nil then
			_condition_1 = MongoId:getBaseMachine()
		end
		self.Machine = _condition_1
		local _condition_2 = ProcessId
		if _condition_2 == nil then
			_condition_2 = MongoId.BaseProcessId
		end
		self.ProcessId = _condition_2
		local _condition_3 = Increment
		if _condition_3 == nil then
			local _original = MongoId.BaseIncrement
			MongoId.BaseIncrement += 1
			_condition_3 = bit32.band(_original, 0xffffff)
		end
		self.Increment = _condition_3
		self.Buffer = buffer.create(12)
		buffer.writeu32(self.Buffer, 0, self.Timestamp)
		buffer.writeu8(self.Buffer, 4, bit32.band((bit32.arshift(self.Machine, 16)), 0xff))
		buffer.writeu8(self.Buffer, 5, bit32.band((bit32.arshift(self.Machine, 8)), 0xff))
		buffer.writeu8(self.Buffer, 6, bit32.band(self.Machine, 0xff))
		buffer.writeu16(self.Buffer, 7, self.ProcessId)
		buffer.writeu8(self.Buffer, 9, bit32.band((bit32.arshift(self.Increment, 16)), 0xff))
		buffer.writeu8(self.Buffer, 10, bit32.band((bit32.arshift(self.Increment, 8)), 0xff))
		buffer.writeu8(self.Buffer, 11, bit32.band(self.Increment, 0xff))
	end
	function MongoId:getBaseMachine()
		local JobId = game.JobId
		-- Hash it into a 24-bit integer (basic FNV-1a-like hash)
		local Hash = 0
		for I = 0, #JobId - 1 do
			local _arg0 = I + 1
			local CharCode = (string.byte(JobId, _arg0))
			Hash = bit32.band(bit32.bxor(Hash * 16777619, CharCode), 0xffffff)
		end
		return Hash
	end
	function MongoId:toString()
		local TimestampHex = string.format("%08x", self.Timestamp)
		local MachineHex = string.format("%06x", self.Machine)
		local PidHex = string.format("%04x", self.ProcessId)
		local IncrementHex = string.format("%06x", self.Increment)
		return TimestampHex .. MachineHex .. PidHex .. IncrementHex
	end
	function MongoId:GenerateNextId()
		return MongoId.new(self.Timestamp, self.Machine, self.ProcessId, bit32.band((self.Increment + 1), 0xffffff))
	end
	function MongoId:GenerateString()
		return MongoId.new():toString()
	end
	function MongoId:FromString(ID)
		if #ID ~= 24 then
			error("Invalid MongoId format: must be 24 characters long")
		end
		local Buffer = buffer.create(12)
		for I = 0, 11 do
			local _iD = ID
			local _arg0 = I * 2 + 1
			local _arg1 = I * 2 + 2
			local Byte = tonumber(string.sub(_iD, _arg0, _arg1), 16)
			if Byte == nil or Byte ~= Byte then
				error("Invalid MongoId hex digit")
			end
			buffer.writeu8(Buffer, I, Byte)
		end
		local Parsed = MongoId.new()
		Parsed.Buffer = Buffer
		Parsed.Timestamp = buffer.readu32(Buffer, 0)
		Parsed.Machine = bit32.bor(bit32.bor((bit32.lshift(buffer.readu8(Buffer, 4), 16)), (bit32.lshift(buffer.readu8(Buffer, 5), 8))), buffer.readu8(Buffer, 6))
		Parsed.ProcessId = buffer.readu16(Buffer, 7)
		Parsed.Increment = bit32.bor(bit32.bor((bit32.lshift(buffer.readu8(Buffer, 9), 16)), (bit32.lshift(buffer.readu8(Buffer, 10), 8))), buffer.readu8(Buffer, 11))
		return Parsed
	end
	function MongoId:__tostring()
		return self:toString()
	end
	MongoId.BaseIncrement = math.random(0, 0xffffff)
	MongoId.BaseProcessId = math.random(0, 0xffff)
end
MongoId.__eq = function(A, B)
	return tostring(A) == tostring(B)
end
return {
	MongoId = MongoId,
}
