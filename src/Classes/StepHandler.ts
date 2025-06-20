import { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
import { BaseController } from "./BaseController";
import { RunService } from "@rbxts/services";
export abstract class StepHandler {
	protected static IsInitialized = false;

	protected static RenderStepControllers = new Map<string, RenderStep["RenderStep"]>();
	protected static PhysicsStepControllers = new Map<string, PhysicsStep["PhysicsStep"]>();

	public static AddToRenderStep(Controller: BaseController) {
		const RenderStep = rawget(Controller, "RenderStep") as RenderStep["RenderStep"] | undefined;

		if (RenderStep) {
			print(`Registering RenderStep for ${Controller.GetName()}`);
			this.RenderStepControllers.set(Controller.GetName(), RenderStep);
		}
	}

	public static AddToPhysicsStep(Controller: BaseController) {
		const PhysicsStep = rawget(Controller, "PhysicsStep") as PhysicsStep["PhysicsStep"] | undefined;

		if (PhysicsStep) {
			print(`Registering PhysicsStep for ${Controller.GetName()}`);
			this.PhysicsStepControllers.set(Controller.GetName(), PhysicsStep);
		}
	}

	public static Initialize() {
		if (this.IsInitialized) {
			return;
		}

		this.IsInitialized = true;

		if (this.RenderStepControllers.size() > 0) {
			if (RunService.IsClient()) {
				RunService.RenderStepped.Connect((DeltaTime: number) => {
					this.RenderStepControllers.forEach((RenderStep) => {
						RenderStep(DeltaTime);
					});
				});
			}
		}

		if (this.PhysicsStepControllers.size() > 0) {
			RunService.Heartbeat.Connect((DeltaTime: number) => {
				this.PhysicsStepControllers.forEach((PhysicsStep) => {
					PhysicsStep(DeltaTime);
				});
			});
		}
	}
}
