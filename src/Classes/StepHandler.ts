import { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
import type { BaseController } from "./BaseController";
import { RunService } from "@rbxts/services";

export abstract class StepHandler {
	protected static IsInitialized = false;

	protected static RenderStepControllers = new Map<BaseController, RenderStep["RenderStep"]>();
	protected static PhysicsStepControllers = new Map<BaseController, PhysicsStep["PhysicsStep"]>();

	public static AddToRenderStep(Controller: BaseController) {
		const RenderStep = rawget(getmetatable(Controller), "RenderStep") as RenderStep["RenderStep"] | undefined;

		if (RenderStep) {
			this.RenderStepControllers.set(Controller, RenderStep);
		}
	}

	public static AddToPhysicsStep(Controller: BaseController) {
		const PhysicsStep = rawget(getmetatable(Controller), "PhysicsStep") as PhysicsStep["PhysicsStep"] | undefined;

		if (PhysicsStep) {
			this.PhysicsStepControllers.set(Controller, PhysicsStep);
		}
	}

	public static Initialize() {
		if (this.IsInitialized) {
			return;
		}

		this.IsInitialized = true;

		if (RunService.IsClient()) {
			RunService.RenderStepped.Connect((DeltaTime: number) => {
				this.RenderStepControllers.forEach((RenderStep, Controller) => {
					const RenderStepFunction = RenderStep as unknown as (
						Controller: BaseController,
						DeltaTime: number,
					) => void;
					RenderStepFunction(Controller, DeltaTime);
				});
			});
		}

		RunService.Heartbeat.Connect((DeltaTime: number) => {
			this.PhysicsStepControllers.forEach((PhysicsStep, Controller) => {
				const PhysicsStepFunction = PhysicsStep as unknown as (
					Controller: BaseController,
					DeltaTime: number,
				) => void;
				PhysicsStepFunction(Controller, DeltaTime);
			});
		});
	}
}
