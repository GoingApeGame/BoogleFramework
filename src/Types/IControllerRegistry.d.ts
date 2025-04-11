import { BaseController } from "../Classes/Controller";

declare type IControllerRegistry = (new () => BaseController)[];
