import { IComponentManifest } from "../Types/IComponentManifest";
import { BaseComponent } from "../Classes/BaseComponent";
import { BaseController } from "../Classes/Controller";
export declare class ComponentController extends BaseController {
    static ComponentManifest: IComponentManifest;
    static GetComponentsFolder(): Folder | undefined;
    Initialize(): Promise<void>;
    PostInitialize(): Promise<void>;
}
export declare function RegisterComponent<T extends typeof BaseComponent<Instance>>(Component: T): void;
