import type { BaseController } from "../Classes/BaseController";
import type { GameStarter } from "../Classes/GameStarter";

declare type IControllerRegistry<T extends typeof GameStarter> = ReadonlyArray<new (Starter: T) => BaseController>;
