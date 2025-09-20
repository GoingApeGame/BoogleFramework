import { Players, RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";
import { StepHandler } from "./StepHandler";
import { RenderStep } from "../Types/IControllerTypes";
import type { GameStarter } from "./GameStarter";

export abstract class BaseController {
	protected IsInitialized = false;

	protected InitializedTime = 0;

	constructor() {}

	public async Initialize() {
		if (this.IsInitialized) {
			warn("Controller already initialized", debug.traceback());
			return;
		}

		this.InitializedTime = os.clock();

		// warn(`Initializing ${this.GetName()}`);

		Players.GetPlayers().forEach((Player) => {
			this._PlayerAdded(Player);
		});

		Players.PlayerAdded.Connect((Player) => {
			this._PlayerAdded(Player);
		});

		Players.PlayerRemoving.Connect((Player) => {
			this.PlayerRemoving(Player);
		});

		StepHandler.AddToRenderStep(this);
		StepHandler.AddToPhysicsStep(this);
	}

	public async PostInitialize() {
		if (this.InitializedTime === 0) {
			throw `Controller ${this.GetName()} was not initialized`;
		}

		this.IsInitialized = true;

		// print(`Initialized ${this.GetName()}`);
	}

	private _PlayerAdded(Player: Player) {
		this.PlayerAdded(Player);

		if (Player.Character) {
			this.PlayerAddedCharacter(Player, Player.Character);
		}

		Player.CharacterAdded.Connect((Character) => {
			this.PlayerAddedCharacter(Player, Character);
		});

		Player.CharacterRemoving.Connect((Character) => {
			this.PlayerRemovingCharacter(Player, Character);
		});
	}

	public PlayerAdded(Player: Player): void {}

	public PlayerRemoving(Player: Player): void {}

	public PlayerAddedCharacter(Player: Player, Character: Model): void {}

	public PlayerRemovingCharacter(Player: Player, Character: Model): void {}

	public GetName() {
		return tostring(getmetatable(this));
	}

	/**
	 * @deprecated
	 */
	protected InitializeSteps() {
		throw `${this.GetName()} is still using the deprecated InitializeSteps method. Please implement RenderStep and PhysicsStep interfaces instead.`;
	}
}
