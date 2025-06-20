import { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
import type { BaseController } from "./BaseController";
import { RunService } from "@rbxts/services";

export abstract class StepHandler {
	protected static IsInitialized = false;

	protected static RenderStepControllers = new Map<string, RenderStep["RenderStep"]>();
	protected static PhysicsStepControllers = new Map<string, PhysicsStep["PhysicsStep"]>();

	public static AddToRenderStep(Controller: BaseController) {
		const RenderStep = rawget(getmetatable(Controller), "RenderStep") as RenderStep["RenderStep"] | undefined;

		if (RenderStep) {
			this.RenderStepControllers.set(Controller.GetName(), RenderStep);
		}
	}

	public static AddToPhysicsStep(Controller: BaseController) {
		const PhysicsStep = rawget(getmetatable(Controller), "PhysicsStep") as PhysicsStep["PhysicsStep"] | undefined;

		if (PhysicsStep) {
			this.PhysicsStepControllers.set(Controller.GetName(), PhysicsStep);
		}
	}

	public static Initialize() {
		if (this.IsInitialized) {
			return;
		}

		this.IsInitialized = true;

		if (RunService.IsClient()) {
			RunService.RenderStepped.Connect((DeltaTime: number) => {
				this.RenderStepControllers.forEach((RenderStep) => {
					RenderStep(DeltaTime);
				});
			});
		}

		RunService.Heartbeat.Connect((DeltaTime: number) => {
			this.PhysicsStepControllers.forEach((PhysicsStep) => {
				PhysicsStep(DeltaTime);
			});
		});
	}
}
