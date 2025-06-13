-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local exports = {}
exports.BaseComponent = TS.import(script, script, "Classes", "BaseComponent").BaseComponent
exports.BaseController = TS.import(script, script, "Classes", "BaseController").BaseController
exports.MongoId = TS.import(script, script, "Classes", "ObjectID").ObjectID
exports.ComponentController = TS.import(script, script, "Controllers", "ComponentController").ComponentController
exports.BullshitHelpers = TS.import(script, script, "Services", "BullshitHelpers").BullshitHelpers
exports.ComponentService = TS.import(script, script, "Services", "ComponentService").ComponentService
exports.Localizer = TS.import(script, script, "Services", "Localizer").Localizer
exports.PlayerAttributesHandler = TS.import(script, script, "Services", "PlayerAttributesHandler").PlayerAttributesHandler
exports.ReplicatedAssetService = TS.import(script, script, "Services", "ReplicatedAssetService").ReplicatedAssetService
exports.GameStarter = TS.import(script, script, "Classes", "GameStarter").GameStarter
return exports
