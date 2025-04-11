-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local RunService = _services.RunService
local PlayerAttributesHandler
do
	PlayerAttributesHandler = setmetatable({}, {
		__tostring = function()
			return "PlayerAttributesHandler"
		end,
	})
	PlayerAttributesHandler.__index = PlayerAttributesHandler
	function PlayerAttributesHandler.new(...)
		local self = setmetatable({}, PlayerAttributesHandler)
		return self:constructor(...) or self
	end
	function PlayerAttributesHandler:constructor()
	end
	function PlayerAttributesHandler:GetAttribute(Player, Attribute)
		return Player:GetAttribute(tostring(Attribute))
	end
	function PlayerAttributesHandler:OnAttributeChanged(Player, Attribute, Callback)
		return Player:GetAttributeChangedSignal(tostring(Attribute)):Connect(function()
			Callback(self:GetAttribute(Player, Attribute))
		end)
	end
	function PlayerAttributesHandler:SetAttribute(Player, Attribute, Value)
		local CurrentValue = PlayerAttributesHandler:GetAttribute(Player, Attribute)
		if RunService:IsClient() then
			error("Cannot set player attributes on the client!")
		end
		local _condition = CurrentValue ~= nil and Value ~= nil
		if _condition then
			local _value = Value
			local _arg1 = typeof(_value)
			_condition = not (typeof(CurrentValue) == _arg1)
		end
		if _condition then
			local _exp = tostring(Attribute)
			local _value = Value
			error(`Attribute {_exp} is not of type {typeof(_value)}`)
		end
		Player:SetAttribute(tostring(Attribute), Value)
	end
	function PlayerAttributesHandler:GetPlayersWithAttribute(Attribute, Value)
		local _exp = Players:GetPlayers()
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _callback = function(Player)
			return self:GetAttribute(Player, Attribute) == Value
		end
		local _length = 0
		for _k, _v in _exp do
			if _callback(_v, _k - 1, _exp) == true then
				_length += 1
				_newValue[_length] = _v
			end
		end
		-- ▲ ReadonlyArray.filter ▲
		return _newValue
	end
end
return {
	PlayerAttributesHandler = PlayerAttributesHandler,
}
