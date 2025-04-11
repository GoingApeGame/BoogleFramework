-- Compiled with roblox-ts v3.0.0
--[[
	*
	 * A definitely inaccurate implementation of a MongoDB ObjectId.
	 * But it's good enough for most use cases.
	 
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
	function MongoId:constructor(Id)
		local _condition = Id
		if _condition ~= "" and _condition then
			_condition = #Id == 24
		end
		if _condition ~= "" and _condition then
			-- Parse from string
			self.Timestamp = tonumber(string.sub(Id, 1, 8), 16)
			self.Machine = tonumber(string.sub(Id, 9, 14), 16)
			self.Pid = tonumber(string.sub(Id, 15, 18), 16)
			self.Increment = tonumber(string.sub(Id, 19, 24), 16)
		elseif Id == nil then
			-- Default generation
			self.Timestamp = math.floor(os.time())
			self.Machine = MongoId.Machine
			self.Pid = MongoId.Pid
			local _original = MongoId.Increment
			MongoId.Increment += 1
			self.Increment = _original
			if MongoId.Increment > 0xffffff then
				MongoId.Increment = 0
			end
		else
			error("Invalid MongoId string.")
		end
	end
	function MongoId:GenerateString()
		return MongoId.new():ToString()
	end
	function MongoId:ToString()
		local TimestampHex = string.format("%08x", self.Timestamp)
		local MachineHex = string.format("%06x", self.Machine)
		local PidHex = string.format("%04x", self.Pid)
		local IncrementHex = string.format("%06x", self.Increment)
		return TimestampHex .. MachineHex .. PidHex .. IncrementHex
	end
	function MongoId:Equals(Id)
		local _id = Id
		if type(_id) == "string" then
			Id = MongoId.new(Id)
		end
		return self.Timestamp == Id.Timestamp and self.Machine == Id.Machine and self.Pid == Id.Pid and self.Increment == Id.Increment
	end
	function MongoId:GetDate()
		return DateTime.fromUnixTimestamp(self.Timestamp)
	end
	function MongoId:ToArray()
		local StrId = self:ToString()
		local Array = {}
		for I = 0, 11 do
			local _arg0 = I * 2 + 1
			local _arg1 = I * 2 + 2
			local _arg0_1 = tonumber(string.sub(StrId, _arg0, _arg1), 16)
			table.insert(Array, _arg0_1)
		end
		return Array
	end
	MongoId.Increment = math.random(0, 0xffffff)
	MongoId.Pid = math.random(0, 0xffff)
	MongoId.Machine = math.random(0, 0xffffff)
end
return {
	MongoId = MongoId,
}
