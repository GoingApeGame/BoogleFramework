-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local BaseComponent = TS.import(script, script.Parent.Parent, "Classes", "BaseComponent").BaseComponent
local ComponentService
do
	ComponentService = {}
	function ComponentService:constructor()
	end
	function ComponentService:RegisterComponent(Instance, ComponentToMake)
		local NewComponent = ComponentToMake.new(Instance)
		local _exp = self.Components
		table.insert(_exp, NewComponent)
		self:HandleNewComponent(NewComponent)
		return NewComponent
	end
	function ComponentService:RegisterExistingComponent(ExistingComponent)
		local _components = self.Components
		local _existingComponent = ExistingComponent
		table.insert(_components, _existingComponent)
		self:HandleNewComponent(ExistingComponent)
		return ExistingComponent
	end
	function ComponentService:UnregisterComponent(Component)
		local _components = self.Components
		local _component = Component
		local Index = (table.find(_components, _component) or 0) - 1
		if Index ~= -1 then
			table.remove(self.Components, Index + 1)
		end
	end
	function ComponentService:HandleNewComponent(Component)
		Component:Initialize()
		Component.Destroyed:Once(function()
			self:UnregisterComponent(Component)
		end)
	end
	function ComponentService:GetComponent(Instance)
		local ComponentID = Instance:GetAttribute(BaseComponent:GetAttributeName())
		return self:GetComponentByID(ComponentID)
	end
	function ComponentService:GetComponentByInstanceName(InstanceName)
		local _exp = self.Components
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Component)
			return Component:GetInstance().Name == InstanceName
		end
		local _result
		for _i, _v in _exp do
			if _callback(_v, _i - 1, _exp) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return _result
	end
	function ComponentService:GetComponentByAttribute(AttributeName, AttributeValue)
		local _exp = self.Components
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Component)
			return Component:GetInstance():GetAttribute(AttributeName) == AttributeValue
		end
		local _result
		for _i, _v in _exp do
			if _callback(_v, _i - 1, _exp) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return _result
	end
	function ComponentService:GetComponentByInstance(Instance)
		local _exp = self.Components
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Component)
			return Component:GetInstance() == Instance
		end
		local _result
		for _i, _v in _exp do
			if _callback(_v, _i - 1, _exp) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return _result
	end
	function ComponentService:FindComponentInList(ComponentList, Type)
		local _exp = self.Components
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _callback = function(Component)
			return TS.instanceof(Component, Type)
		end
		local _length = 0
		for _k, _v in _exp do
			if _callback(_v, _k - 1, _exp) == true then
				_length += 1
				_newValue[_length] = _v
			end
		end
		-- ▲ ReadonlyArray.filter ▲
		-- ▼ ReadonlyArray.find ▼
		local _callback_1 = function(Component)
			local _componentList = ComponentList
			local _arg0 = Component:GetInstance()
			return table.find(_componentList, _arg0) ~= nil
		end
		local _result
		for _i, _v in _newValue do
			if _callback_1(_v, _i - 1, _newValue) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return _result
	end
	function ComponentService:GetAllComponentsByType(Type)
		local _exp = self.Components
		-- ▼ ReadonlyArray.filter ▼
		local _newValue = {}
		local _callback = function(Component)
			return TS.instanceof(Component, Type)
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
	function ComponentService:GetAllComponents()
		return self.Components
	end
	function ComponentService:GetFirstComponent(Type)
		if Type then
			local _exp = self.Components
			-- ▼ ReadonlyArray.find ▼
			local _callback = function(Component)
				return TS.instanceof(Component, Type)
			end
			local _result
			for _i, _v in _exp do
				if _callback(_v, _i - 1, _exp) == true then
					_result = _v
					break
				end
			end
			-- ▲ ReadonlyArray.find ▲
			return _result
		end
		return self.Components[1]
	end
	function ComponentService:WaitForComponent(Type, Timeout)
		if Timeout == nil then
			Timeout = 10
		end
		return TS.Promise.new(function(Resolve)
			local StartTime = os.clock()
			local Interval
			Interval = RunService.Heartbeat:Connect(function()
				local Component = self:GetFirstComponent(Type)
				if Component then
					Interval:Disconnect()
					Resolve(Component)
				elseif os.clock() - StartTime >= Timeout then
					Interval:Disconnect()
					Resolve(nil)
				end
			end)
		end)
	end
	function ComponentService:GetComponentByID(ID)
		local _exp = self.Components
		-- ▼ ReadonlyArray.find ▼
		local _callback = function(Component)
			return tostring(Component.ID) == ID
		end
		local _result
		for _i, _v in _exp do
			if _callback(_v, _i - 1, _exp) == true then
				_result = _v
				break
			end
		end
		-- ▲ ReadonlyArray.find ▲
		return _result
	end
	ComponentService.Components = {}
end
return {
	ComponentService = ComponentService,
}
