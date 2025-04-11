-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local BullshitHelpers = TS.import(script, script.Parent, "BullshitHelpers").BullshitHelpers
local ReplicatedAssetService
do
	ReplicatedAssetService = setmetatable({}, {
		__tostring = function()
			return "ReplicatedAssetService"
		end,
	})
	ReplicatedAssetService.__index = ReplicatedAssetService
	function ReplicatedAssetService.new(...)
		local self = setmetatable({}, ReplicatedAssetService)
		return self:constructor(...) or self
	end
	function ReplicatedAssetService:constructor()
	end
	function ReplicatedAssetService:GetAssetByPath(Path)
		local StartPoint = ReplicatedStorage
		local PathParts = string.split(Path, "/")
		local CurrentPoint = StartPoint
		for _, PathPart in PathParts do
			local NextPoint = CurrentPoint:FindFirstChild(PathPart)
			if not NextPoint then
				BullshitHelpers:LogWarning(`Could not find {PathPart} in {CurrentPoint:GetFullName()}`)
				CurrentPoint = Instance.new("Model")
				break
			end
			CurrentPoint = NextPoint
		end
		return CurrentPoint
	end
end
return {
	ReplicatedAssetService = ReplicatedAssetService,
}
