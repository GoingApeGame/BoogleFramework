import { Players, RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";

export abstract class BaseController {
	protected RenderSignal: RBXScriptConnection | undefined;
	protected HeartbeatSignal: RBXScriptConnection | undefined;

	private IsInitialized = false;

	private InitializedTime = 0;

	constructor() {}

	public async Initialize() {
		if (this.IsInitialized) {
			BullshitHelpers.LogWarning("Controller already initialized", debug.traceback());
			return;
		}

		this.InitializedTime = os.clock();

		BullshitHelpers.LogWarning(`Initializing ${this.GetName()}`);

		this.InitializeSteps();

		Players.GetPlayers().forEach((Player) => {
			this._PlayerAdded(Player);
		});

		Players.PlayerAdded.Connect((Player) => {
			this._PlayerAdded(Player);
		});

		Players.PlayerRemoving.Connect((Player) => {
			this.PlayerRemoving(Player);
		});
	}

	public async PostInitialize() {
		if (this.InitializedTime === 0) {
			throw `Controller ${this.GetName()} was not initialized`;
		}

		this.IsInitialized = true;

		BullshitHelpers.LogSuccess(`Initialized ${this.GetName()}`);
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

	protected RenderStep(DeltaTime: number): void {}

	protected PhysicsStep(DeltaTime: number): void {}

	protected InitializeSteps() {
		if (RunService.IsClient()) {
			this.RenderSignal = RunService.PreRender.Connect((DT) => {
				debug.profilebegin(`${this.GetName()} RenderStep`);
				this.RenderStep(DT);
				debug.profileend();
			});
		}

		this.HeartbeatSignal = RunService.Heartbeat.Connect((DT) => {
			debug.profilebegin(`${this.GetName()} PhysicsStep`);
			this.PhysicsStep(DT);
			debug.profileend();
		});
	}
}
