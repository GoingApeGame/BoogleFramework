import { BaseComponent } from "../Classes/BaseComponent";
export declare abstract class ComponentService {
    protected static Components: BaseComponent<Instance>[];
    static RegisterComponent<T extends BaseComponent<Instance>, I extends Instance, C extends new (instance: I) => T>(Instance: I, ComponentToMake: C): T;
    static RegisterExistingComponent<T extends BaseComponent<Instance>>(ExistingComponent: T): T;
    static UnregisterComponent<T extends BaseComponent<Instance>>(Component: T): void;
    static HandleNewComponent<T extends BaseComponent<Instance>>(Component: T): void;
    static GetComponent<T extends BaseComponent<Instance>>(Instance: Instance): T | undefined;
    static GetComponentByInstanceName<T extends BaseComponent<Instance>>(InstanceName: string): T | undefined;
    static GetComponentByAttribute<T extends BaseComponent<Instance>>(AttributeName: string, AttributeValue: AttributeValue): T | undefined;
    static GetComponentByInstance<T extends BaseComponent<Instance>>(Instance: Instance): T | undefined;
    static FindComponentInList<T extends BaseComponent<Instance>>(ComponentList: Array<Instance>, Type: abstract new (...args: never[]) => T): T | undefined;
    static GetAllComponentsByType<T extends BaseComponent<Instance>>(Type: abstract new (...args: never[]) => T): T[];
    static GetAllComponents(): BaseComponent<Instance>[];
    static GetFirstComponent<T extends BaseComponent<Instance>>(Type?: new (...args: never[]) => T): T | undefined;
    static WaitForComponent<T extends BaseComponent<Instance>>(Type: new (...args: never[]) => T, Timeout?: number): Promise<T | undefined>;
    static GetComponentByID<T extends BaseComponent<Instance>>(ID: string): T | undefined;
}
