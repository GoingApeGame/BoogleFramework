import Signal from "@rbxts/signal";
import { ObjectID } from "./ObjectID";
export declare abstract class BaseComponent<T extends Instance> {
    protected ComponentInstance: T;
    protected Instance: T;
    readonly ID: ObjectID<string>;
    readonly Destroyed: Signal<(Manual: boolean) => void, false>;
    constructor(ComponentInstance: T);
    static GetAttributeName(): string;
    static GetServerAttribute(): string;
    static GetClientAttribute(): string;
    Initialize(): void;
    GetName(): string;
    static GetClassName(): string;
    protected TagInstance(ForceName?: string): void;
    abstract Stop(): void;
    Destroy(): void;
    GetInstance(): T;
}
