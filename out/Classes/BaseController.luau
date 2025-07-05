-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local BullshitHelpers = TS.import(script, script.Parent.Parent, "Services", "BullshitHelpers").BullshitHelpers
local StepHandler = TS.import(script, script.Parent, "StepHandler").StepHandler
local BaseController
do
	BaseController = {}
	function BaseController:constructor(Starter)
		self.Starter = Starter
		self.IsInitialized = false
		self.InitializedTime = 0
	end
	BaseController.Initialize = TS.async(function(self)
		if self.IsInitialized then
			BullshitHelpers:LogWarning("Controller already initialized", debug.traceback())
			return nil
		end
		self.InitializedTime = os.clock()
		BullshitHelpers:LogWarning(`Initializing {self:GetName()}`)
		local _exp = Players:GetPlayers()
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(Player)
			self:_PlayerAdded(Player)
		end
		for _k, _v in _exp do
			_callback(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.forEach ▲
		Players.PlayerAdded:Connect(function(Player)
			self:_PlayerAdded(Player)
		end)
		Players.PlayerRemoving:Connect(function(Player)
			self:PlayerRemoving(Player)
		end)
		StepHandler:AddToRenderStep(self)
		StepHandler:AddToPhysicsStep(self)
	end)
	BaseController.PostInitialize = TS.async(function(self)
		if self.InitializedTime == 0 then
			error(`Controller {self:GetName()} was not initialized`)
		end
		self.IsInitialized = true
		BullshitHelpers:LogSuccess(`Initialized {self:GetName()}`)
	end)
	function BaseController:_PlayerAdded(Player)
		self:PlayerAdded(Player)
		if Player.Character then
			self:PlayerAddedCharacter(Player, Player.Character)
		end
		Player.CharacterAdded:Connect(function(Character)
			self:PlayerAddedCharacter(Player, Character)
		end)
		Player.CharacterRemoving:Connect(function(Character)
			self:PlayerRemovingCharacter(Player, Character)
		end)
	end
	function BaseController:PlayerAdded(Player)
	end
	function BaseController:PlayerRemoving(Player)
	end
	function BaseController:PlayerAddedCharacter(Player, Character)
	end
	function BaseController:PlayerRemovingCharacter(Player, Character)
	end
	function BaseController:GetName()
		return tostring((getmetatable(self)))
	end
	function BaseController:InitializeSteps()
		error(`{self:GetName()} is still using the deprecated InitializeSteps method. Please implement RenderStep and PhysicsStep interfaces instead.`)
	end
end
return {
	BaseController = BaseController,
}
