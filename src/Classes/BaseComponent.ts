import Signal from "@rbxts/signal";
import { MongoId } from "./MongoId";
import { RunService } from "@rbxts/services";

export abstract class BaseComponent<T extends Instance> {
	protected Instance: T;
	public readonly ID = new MongoId();

	protected RenderStep: RBXScriptConnection | undefined;
	protected Heartbeat: RBXScriptConnection | undefined;

	public readonly Destroyed = new Signal<(Manual: boolean) => void>();

	constructor(protected ComponentInstance: T) {
		this.Instance = ComponentInstance;

		this.Instance.SetAttribute(BaseComponent.GetAttributeName(), tostring(this.ID));
	}

	public static GetAttributeName() {
		const RunTimeMode = RunService.IsClient();

		return RunTimeMode ? this.GetClientAttribute() : this.GetServerAttribute();
	}

	public static GetServerAttribute() {
		return "SERVER_COMPONENT_ID";
	}

	public static GetClientAttribute() {
		return "CLIENT_COMPONENT_ID";
	}

	public Initialize(): void {
		this.Instance.Destroying.Once(() => {
			this.Stop();

			this.Destroyed.Fire(false);
		});

		this.TagInstance();
	}

	public GetName() {
		return tostring(getmetatable(this));
	}

	public static GetClassName() {
		return tostring(this);
	}

	protected TagInstance(ForceName?: string): void {
		const ComponentName = ForceName ?? this.GetName();

		if (this.Instance.HasTag(ComponentName)) {
			return;
		}

		this.Instance.AddTag(ComponentName);
	}

	protected InitializeRenderStep(): void {
		this.RenderStep = RunService.RenderStepped.Connect((DeltaTime: number) => {
			debug.profilebegin(`${this.GetName()} RenderStep`);
			this.RenderUpdate(DeltaTime);
			debug.profileend();
		});
	}

	protected InitializeHeartbeat(): void {
		this.Heartbeat = RunService.Heartbeat.Connect((DeltaTime: number) => {
			debug.profilebegin(`${this.GetName()} PhysicsStep`);
			this.PhysicsUpdate(DeltaTime);
			debug.profileend();
		});
	}

	public Stop(): void {
		if (this.RenderStep?.Connected) {
			this.RenderStep.Disconnect();
		}

		if (this.Heartbeat?.Connected) {
			this.Heartbeat.Disconnect();
		}
	}

	public Destroy(): void {
		this.Stop();

		if (this.Instance) {
			this.Instance.Destroy();
		}

		this.Destroyed.Fire(true);
	}

	public GetInstance(): T {
		return this.Instance;
	}

	protected RenderUpdate(DeltaTime: number): void {}

	protected PhysicsUpdate(DeltaTime: number): void {}
}
