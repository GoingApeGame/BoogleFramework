import { IControllerRegistry } from "../Types/IControllerRegistry";
import { BaseController } from "./BaseController";
export declare abstract class GameStarter {
    static GameName: string;
    static GameVersion: number;
    protected static StartedTime: number;
    protected static ControllerRegistry: IControllerRegistry;
    protected static Controllers: Map<string, BaseController>;
    static GetController<T extends typeof BaseController>(Controller: T): InstanceType<T> | undefined;
    static Start(): void;
    static StartControllers(): void;
    static AfterStart(): void;
}
