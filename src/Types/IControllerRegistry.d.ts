import { BaseController } from "../Classes/BaseController";

declare type IControllerRegistry = ReadonlyArray<new () => BaseController>;
