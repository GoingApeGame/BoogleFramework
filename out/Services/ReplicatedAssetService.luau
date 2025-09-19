-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local ReplicatedAssetService
do
	ReplicatedAssetService = {}
	function ReplicatedAssetService:constructor()
	end
	function ReplicatedAssetService:GetAssetByPath(Path)
		local StartPoint = ReplicatedStorage
		local PathParts = string.split(Path, "/")
		local CurrentPoint = StartPoint
		for _, PathPart in PathParts do
			local NextPoint = CurrentPoint:FindFirstChild(PathPart)
			if not NextPoint then
				warn(`Could not find {PathPart} in {CurrentPoint:GetFullName()}`)
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
