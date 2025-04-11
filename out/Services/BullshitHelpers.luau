-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local BullshitHelpers
do
	BullshitHelpers = {}
	function BullshitHelpers:constructor()
	end
	function BullshitHelpers:RoundToDecimal(Value, DecimalPlaces)
		local Multiplier = math.pow(10, DecimalPlaces)
		local RoundedValue = math.round(Value * Multiplier) / Multiplier
		return RoundedValue
	end
	function BullshitHelpers:LogColor(Color, ...)
		local Params = { ... }
		local Circle = BullshitHelpers.ColoredCircles[Color]
		local RunTimeText = `{if RunService:IsClient() then "Client" else "Server"}`
		print(Circle, `[{RunTimeText}]`, unpack(Params))
	end
	function BullshitHelpers:Log(...)
		local Params = { ... }
		self:LogColor("White", unpack(Params))
	end
	function BullshitHelpers:LogError(...)
		local Params = { ... }
		self:LogColor("Red", unpack(Params))
	end
	function BullshitHelpers:LogSuccess(...)
		local Params = { ... }
		self:LogColor("Green", unpack(Params))
	end
	function BullshitHelpers:LogWarning(...)
		local Params = { ... }
		self:LogColor("Yellow", unpack(Params))
	end
	function BullshitHelpers:LogInfo(...)
		local Params = { ... }
		self:LogColor("Blue", unpack(Params))
	end
	BullshitHelpers.ColoredCircles = {
		Green = "🟢",
		Red = "🔴",
		Orange = "🟠",
		Yellow = "🟡",
		Blue = "🔵",
		Purple = "🟣",
		White = "⚪",
	}
end
return {
	BullshitHelpers = BullshitHelpers,
}
