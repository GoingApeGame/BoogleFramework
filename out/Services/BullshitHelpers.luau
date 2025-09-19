-- Compiled with roblox-ts v3.0.0
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
end
return {
	BullshitHelpers = BullshitHelpers,
}
