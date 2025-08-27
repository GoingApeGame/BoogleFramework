import Signal from "@rbxts/signal";
import { RunService } from "@rbxts/services";
import { ObjectID } from "./ObjectID";

export abstract class BaseComponent<T extends Instance> {
	protected Instance: T;
	public readonly ID = new ObjectID();

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

	public abstract Stop(): void;

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
}
