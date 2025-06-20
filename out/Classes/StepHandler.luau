-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local StepHandler
do
	StepHandler = {}
	function StepHandler:constructor()
	end
	function StepHandler:AddToRenderStep(Controller)
		local RenderStep = rawget(Controller, "RenderStep")
		if RenderStep then
			print(`Registering RenderStep for {Controller:GetName()}`)
			local _renderStepControllers = self.RenderStepControllers
			local _arg0 = Controller:GetName()
			_renderStepControllers[_arg0] = RenderStep
		end
	end
	function StepHandler:AddToPhysicsStep(Controller)
		local PhysicsStep = rawget(Controller, "PhysicsStep")
		if PhysicsStep then
			print(`Registering PhysicsStep for {Controller:GetName()}`)
			local _physicsStepControllers = self.PhysicsStepControllers
			local _arg0 = Controller:GetName()
			_physicsStepControllers[_arg0] = PhysicsStep
		end
	end
	function StepHandler:Initialize()
		if self.IsInitialized then
			return nil
		end
		self.IsInitialized = true
		if RunService:IsClient() then
			RunService.RenderStepped:Connect(function(DeltaTime)
				local _exp = self.RenderStepControllers
				-- ▼ ReadonlyMap.forEach ▼
				local _callback = function(RenderStep)
					RenderStep(DeltaTime)
				end
				for _k, _v in _exp do
					_callback(_v, _k, _exp)
				end
				-- ▲ ReadonlyMap.forEach ▲
			end)
		end
		RunService.Heartbeat:Connect(function(DeltaTime)
			local _exp = self.PhysicsStepControllers
			-- ▼ ReadonlyMap.forEach ▼
			local _callback = function(PhysicsStep)
				PhysicsStep(DeltaTime)
			end
			for _k, _v in _exp do
				_callback(_v, _k, _exp)
			end
			-- ▲ ReadonlyMap.forEach ▲
		end)
	end
	StepHandler.IsInitialized = false
	StepHandler.RenderStepControllers = {}
	StepHandler.PhysicsStepControllers = {}
end
return {
	StepHandler = StepHandler,
}
