-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local BullshitHelpers = TS.import(script, script.Parent, "BullshitHelpers").BullshitHelpers
local Localizer
do
	Localizer = setmetatable({}, {
		__tostring = function()
			return "Localizer"
		end,
	})
	Localizer.__index = Localizer
	function Localizer.new(...)
		local self = setmetatable({}, Localizer)
		return self:constructor(...) or self
	end
	function Localizer:constructor()
	end
	function Localizer:SetLocalizationTable(LocalizationTable)
		self.LocalizationTable = LocalizationTable
	end
	function Localizer:GetLocalizedString(Key)
		if not self.LocalizationTable then
			BullshitHelpers:LogError("Localization table is not set.")
			return Key
		end
		local String = self.LocalizationTable[Key]
		return if String ~= nil then String else Key
	end
	function Localizer:GetLocalizedStringWithValues(Key, Values)
		local LocalizedString = self:GetLocalizedString(Key)
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(Value, Index)
			local _localizedString = LocalizedString
			local _arg0 = `\{{Index}\}`
			local _arg1 = tostring(Value)
			LocalizedString = (string.gsub(_localizedString, _arg0, _arg1))
		end
		for _k, _v in Values do
			_callback(_v, _k - 1, Values)
		end
		-- ▲ ReadonlyArray.forEach ▲
		return LocalizedString
	end
	function Localizer:GetLocalizedStringWithFormattedKey(UnformattedKey, Values)
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(Value, Index)
			local _unformattedKey = UnformattedKey
			local _arg0 = `\{{Index}\}`
			local _arg1 = tostring(Value)
			UnformattedKey = (string.gsub(_unformattedKey, _arg0, _arg1))
		end
		for _k, _v in Values do
			_callback(_v, _k - 1, Values)
		end
		-- ▲ ReadonlyArray.forEach ▲
		return self:GetLocalizedString(UnformattedKey)
	end
end
return {
	Localizer = Localizer,
}
