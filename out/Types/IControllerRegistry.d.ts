import type { BaseController } from "../Classes/BaseController";
import type { GameStarter } from "../Classes/GameStarter";

declare type IControllerRegistry = ReadonlyArray<new () => BaseController>;
