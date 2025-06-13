-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Signal = TS.import(script, TS.getModule(script, "@rbxts", "signal"))
local ObjectID = TS.import(script, script.Parent, "ObjectID").ObjectID
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local BaseComponent
do
	BaseComponent = {}
	function BaseComponent:constructor(ComponentInstance)
		self.ComponentInstance = ComponentInstance
		self.ID = ObjectID.new()
		self.Destroyed = Signal.new()
		self.Instance = ComponentInstance
		self.Instance:SetAttribute(BaseComponent:GetAttributeName(), tostring(self.ID))
	end
	function BaseComponent:GetAttributeName()
		local RunTimeMode = RunService:IsClient()
		return if RunTimeMode then self:GetClientAttribute() else self:GetServerAttribute()
	end
	function BaseComponent:GetServerAttribute()
		return "SERVER_COMPONENT_ID"
	end
	function BaseComponent:GetClientAttribute()
		return "CLIENT_COMPONENT_ID"
	end
	function BaseComponent:Initialize()
		self.Instance.Destroying:Once(function()
			self:Stop()
			self.Destroyed:Fire(false)
		end)
		self:TagInstance()
	end
	function BaseComponent:GetName()
		return tostring((getmetatable(self)))
	end
	function BaseComponent:GetClassName()
		return tostring(self)
	end
	function BaseComponent:TagInstance(ForceName)
		local _condition = ForceName
		if _condition == nil then
			_condition = self:GetName()
		end
		local ComponentName = _condition
		if self.Instance:HasTag(ComponentName) then
			return nil
		end
		self.Instance:AddTag(ComponentName)
	end
	function BaseComponent:InitializeRenderStep()
		self.RenderStep = RunService.RenderStepped:Connect(function(DeltaTime)
			debug.profilebegin(`{self:GetName()} RenderStep`)
			self:RenderUpdate(DeltaTime)
			debug.profileend()
		end)
	end
	function BaseComponent:InitializeHeartbeat()
		self.Heartbeat = RunService.Heartbeat:Connect(function(DeltaTime)
			debug.profilebegin(`{self:GetName()} PhysicsStep`)
			self:PhysicsUpdate(DeltaTime)
			debug.profileend()
		end)
	end
	function BaseComponent:Stop()
		local _result = self.RenderStep
		if _result ~= nil then
			_result = _result.Connected
		end
		if _result then
			self.RenderStep:Disconnect()
		end
		local _result_1 = self.Heartbeat
		if _result_1 ~= nil then
			_result_1 = _result_1.Connected
		end
		if _result_1 then
			self.Heartbeat:Disconnect()
		end
	end
	function BaseComponent:Destroy()
		self:Stop()
		if self.Instance then
			self.Instance:Destroy()
		end
		self.Destroyed:Fire(true)
	end
	function BaseComponent:GetInstance()
		return self.Instance
	end
	function BaseComponent:RenderUpdate(DeltaTime)
	end
	function BaseComponent:PhysicsUpdate(DeltaTime)
	end
end
return {
	BaseComponent = BaseComponent,
}
