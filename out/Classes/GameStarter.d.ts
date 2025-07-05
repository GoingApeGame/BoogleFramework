import type { IControllerRegistry } from "../Types/IControllerRegistry";
import type { BaseController } from "./BaseController";
export declare abstract class GameStarter {
    static GameName: string;
    static GameVersion: number;
    protected static StartedTime: number;
    protected static ControllerRegistry: IControllerRegistry<typeof this>;
    protected static Controllers: Map<string, BaseController>;
    protected static RenderStepControllers: Map<string, (DeltaTime: number) => void>;
    protected static PhysicsStepControllers: Map<string, (DeltaTime: number) => void>;
    static GetController<T extends typeof BaseController>(Controller: T): InstanceType<T> | undefined;
    static Start(): void;
    static StartControllers(): void;
    static AfterStart(): void;
}
