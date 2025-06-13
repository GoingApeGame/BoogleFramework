-- ObjectID.lua

local BaseIncrement = math.random(0, 0xffffff)
local BaseProcessId = math.random(0, 0xffff)
local BaseMachine = (function()
	local JobId = game.JobId
	local Hash = 0

	for i = 1, #JobId do
		local c = JobId:byte(i)
		Hash = bit32.band(bit32.bxor(Hash * 16777619, c), 0xffffff)
	end

	return Hash
end)()

local function Pack(Timestamp, Machine, ProcessId, Increment)
	return string.format("%08x%06x%04x%06x", Timestamp, Machine, ProcessId, Increment)
end

local BuildObjectID = function(Timestamp, Machine, ProcessId, Increment)
	Timestamp = Timestamp or math.floor(os.time())
	Machine = Machine or BaseMachine
	ProcessId = ProcessId or BaseProcessId
	Increment = Increment or (BaseIncrement % 0xffffff)
	BaseIncrement += 1

	return Pack(Timestamp, Machine, ProcessId, Increment)
end

local ObjectID = {}

function ObjectID.new(Timestamp, Machine, ProcessId, Increment)
	if type(Timestamp) == "string" then
		return ObjectID:FromString(Timestamp)
	end
	
	return BuildObjectID(Timestamp, Machine, ProcessId, Increment)
end

function ObjectID:FromString(ID)
	assert(#ID == 24, "Invalid ID length")
	return ID
end

function ObjectID:GenerateString()
	return BuildObjectID()
end

function ObjectID:GenerateNext(ID)
	local Timestamp = tonumber(ID:sub(1, 8), 16)
	local Machine = tonumber(ID:sub(9, 14), 16)
	local ProcessId = tonumber(ID:sub(15, 18), 16)
	local Increment = tonumber(ID:sub(19, 24), 16)

	return BuildObjectID(Timestamp, Machine, ProcessId, (Increment + 1) % 0xffffff)
end

return {
	ObjectID = ObjectID
}
