import type { IComponentManifest } from "../Types/IComponentManifest";
import type { BaseComponent } from "../Classes/BaseComponent";
import { BaseController } from "../Classes/BaseController";
import type { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
export declare class ComponentController extends BaseController implements RenderStep, PhysicsStep {
    static ComponentManifest: IComponentManifest;
    static GetComponentsFolder(): Folder | undefined;
    Initialize(): Promise<void>;
    RenderStep(DeltaTime: number): void;
    PhysicsStep(DeltaTime: number): void;
    PostInitialize(): Promise<void>;
}
export declare function RegisterComponent<T extends typeof BaseComponent<Instance>>(Component: T): void;
