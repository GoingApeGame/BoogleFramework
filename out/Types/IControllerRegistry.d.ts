import { BaseController } from "../Classes/BaseController";

declare type IControllerRegistry = (new () => BaseController)[];
