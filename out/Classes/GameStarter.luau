-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local BullshitHelpers = TS.import(script, script.Parent.Parent, "Services", "BullshitHelpers").BullshitHelpers
local GameStarter
do
	GameStarter = setmetatable({}, {
		__tostring = function()
			return "GameStarter"
		end,
	})
	GameStarter.__index = GameStarter
	function GameStarter.new(...)
		local self = setmetatable({}, GameStarter)
		return self:constructor(...) or self
	end
	function GameStarter:constructor()
	end
	function GameStarter:Start()
		self.StartedTime = os.clock()
		BullshitHelpers:LogInfo(`Starting {GameStarter.GameName} {GameStarter.GameVersion}`)
	end
	function GameStarter:StartControllers()
		for _, ControllerClass in self.ControllerRegistry do
			local ControllerInstance = ControllerClass.new()
			local _controllers = self.Controllers
			local _arg0 = ControllerInstance:GetName()
			_controllers[_arg0] = ControllerInstance
		end
		local _exp = self.Controllers
		-- ▼ ReadonlyMap.forEach ▼
		local _callback = function(Controller)
			Controller:Initialize()
		end
		for _k, _v in _exp do
			_callback(_v, _k, _exp)
		end
		-- ▲ ReadonlyMap.forEach ▲
		local _exp_1 = self.Controllers
		-- ▼ ReadonlyMap.forEach ▼
		local _callback_1 = function(Controller)
			Controller:PostInitialize()
		end
		for _k, _v in _exp_1 do
			_callback_1(_v, _k, _exp_1)
		end
		-- ▲ ReadonlyMap.forEach ▲
	end
	function GameStarter:AfterStart()
		BullshitHelpers:LogSuccess(`{GameStarter.GameName} {GameStarter.GameVersion} started in {BullshitHelpers:RoundToDecimal(os.clock() - self.StartedTime, 3)} seconds`)
	end
	GameStarter.GameName = game.Name
	GameStarter.GameVersion = game.PlaceVersion
	GameStarter.StartedTime = 0
	GameStarter.Controllers = {}
end
return {
	GameStarter = GameStarter,
}
