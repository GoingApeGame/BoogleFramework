import { RunService } from "@rbxts/services";
import BaseComponent from "../Classes/BaseComponent";

export default class ComponentService {
	protected static Components = new Array<BaseComponent<Instance>>();

	public static RegisterComponent<
		T extends BaseComponent<Instance>,
		I extends Instance,
		C extends new (instance: I) => T,
	>(Instance: I, ComponentToMake: C): T {
		const NewComponent = new ComponentToMake(Instance) as T;

		this.Components.push(NewComponent);

		this.HandleNewComponent(NewComponent);

		return NewComponent;
	}

	public static RegisterExistingComponent<T extends BaseComponent<Instance>>(ExistingComponent: T): T {
		this.Components.push(ExistingComponent);

		this.HandleNewComponent(ExistingComponent);

		return ExistingComponent;
	}

	public static UnregisterComponent<T extends BaseComponent<Instance>>(Component: T): void {
		const Index = this.Components.indexOf(Component);

		if (Index !== -1) {
			this.Components.remove(Index);
		}
	}

	public static HandleNewComponent<T extends BaseComponent<Instance>>(Component: T): void {
		Component.Initialize();

		Component.Destroyed.Once(() => {
			this.UnregisterComponent(Component);
		});
	}

	public static GetComponent<T extends BaseComponent<Instance>>(Instance: Instance): T | undefined {
		const ComponentID = Instance.GetAttribute(BaseComponent.GetAttributeName()) as string;

		return this.GetComponentByID(ComponentID) as T | undefined;
	}

	public static GetComponentByInstanceName<T extends BaseComponent<Instance>>(InstanceName: string): T | undefined {
		return this.Components.find((Component) => Component.GetInstance().Name === InstanceName) as T | undefined;
	}

	public static GetComponentByAttribute<T extends BaseComponent<Instance>>(
		AttributeName: string,
		AttributeValue: AttributeValue,
	): T | undefined {
		return this.Components.find(
			(Component) => Component.GetInstance().GetAttribute(AttributeName) === AttributeValue,
		) as T | undefined;
	}

	public static GetComponentByInstance<T extends BaseComponent<Instance>>(Instance: Instance): T | undefined {
		return this.Components.find((Component) => Component.GetInstance() === Instance) as T | undefined;
	}

	public static FindComponentInList<T extends BaseComponent<Instance>>(
		ComponentList: Array<Instance>,
		Type: abstract new (...args: never[]) => T,
	): T | undefined {
		return (this.Components.filter((Component) => Component instanceof Type) as T[]).find((Component) =>
			ComponentList.includes(Component.GetInstance()),
		);
	}

	public static GetAllComponentsByType<T extends BaseComponent<Instance>>(
		Type: abstract new (...args: never[]) => T,
	): T[] {
		return this.Components.filter((Component) => Component instanceof Type) as T[];
	}

	public static GetAllComponents() {
		return this.Components;
	}

	public static GetFirstComponent<T extends BaseComponent<Instance>>(
		Type?: new (...args: never[]) => T,
	): T | undefined {
		if (Type) {
			return this.Components.find((Component) => Component instanceof Type) as T | undefined;
		}
		return this.Components[0] as T | undefined;
	}

	public static WaitForComponent<T extends BaseComponent<Instance>>(
		Type: new (...args: never[]) => T,
		Timeout: number = 10,
	): Promise<T | undefined> {
		return new Promise((Resolve) => {
			const StartTime = os.clock();

			const Interval = RunService.Heartbeat.Connect(() => {
				const Component = this.GetFirstComponent(Type);

				if (Component) {
					Interval.Disconnect();
					Resolve(Component);
				} else if (os.clock() - StartTime >= Timeout) {
					Interval.Disconnect();
					Resolve(undefined);
				}
			});
		});
	}

	public static GetComponentByID<T extends BaseComponent<Instance>>(ID: string): T | undefined {
		return this.Components.find((Component) => Component.ID === ID) as T | undefined;
	}
}
