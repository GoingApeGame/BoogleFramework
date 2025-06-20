import type { BaseController } from "./BaseController";
export declare abstract class StepHandler {
    protected static IsInitialized: boolean;
    protected static RenderStepControllers: Map<BaseController, (DeltaTime: number) => void>;
    protected static PhysicsStepControllers: Map<BaseController, (DeltaTime: number) => void>;
    static AddToRenderStep(Controller: BaseController): void;
    static AddToPhysicsStep(Controller: BaseController): void;
    static Initialize(): void;
}
