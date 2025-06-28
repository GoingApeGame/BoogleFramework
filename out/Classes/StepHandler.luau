-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local StepHandler
do
	StepHandler = {}
	function StepHandler:constructor()
	end
	function StepHandler:AddToRenderStep(Controller)
		local RenderStep = rawget((getmetatable(Controller)), "RenderStep")
		if RenderStep then
			local _renderStepControllers = self.RenderStepControllers
			local _controller = Controller
			_renderStepControllers[_controller] = RenderStep
		end
	end
	function StepHandler:AddToPhysicsStep(Controller)
		local PhysicsStep = rawget((getmetatable(Controller)), "PhysicsStep")
		if PhysicsStep then
			local _physicsStepControllers = self.PhysicsStepControllers
			local _controller = Controller
			_physicsStepControllers[_controller] = PhysicsStep
		end
	end
	function StepHandler:Initialize()
		if self.IsInitialized then
			return nil
		end
		self.IsInitialized = true
		if RunService:IsClient() then
			RunService.PreRender:Connect(function(DeltaTime)
				local _exp = self.RenderStepControllers
				-- ▼ ReadonlyMap.forEach ▼
				local _callback = function(RenderStep, Controller)
					local RenderStepFunction = RenderStep
					RenderStepFunction(Controller, DeltaTime)
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
			local _callback = function(PhysicsStep, Controller)
				local PhysicsStepFunction = PhysicsStep
				PhysicsStepFunction(Controller, DeltaTime)
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
