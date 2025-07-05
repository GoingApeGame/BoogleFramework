import type { IControllerRegistry } from "../Types/IControllerRegistry";
import type { BaseController } from "./BaseController";
export declare abstract class GameStarter {
    GameName: string;
    GameVersion: number;
    protected StartedTime: number;
    protected abstract ControllerRegistry: IControllerRegistry<GameStarter>;
    protected Controllers: Map<string, BaseController>;
    protected RenderStepControllers: Map<string, (DeltaTime: number) => void>;
    protected PhysicsStepControllers: Map<string, (DeltaTime: number) => void>;
    GetController<T extends typeof BaseController>(Controller: T): InstanceType<T> | undefined;
    Start(): void;
    StartControllers(): void;
    AfterStart(): void;
}
