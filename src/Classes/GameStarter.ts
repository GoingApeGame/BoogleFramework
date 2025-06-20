import { RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";
import { IControllerRegistry } from "../Types/IControllerRegistry";
import { BaseController } from "./BaseController";
import { PhysicsStep, RenderStep } from "../Types/IControllerTypes";

export abstract class GameStarter {
	public static GameName = game.Name;
	public static GameVersion = game.PlaceVersion;

	protected static StartedTime = 0;

	protected static ControllerRegistry: IControllerRegistry;
	protected static Controllers = new Map<string, BaseController>();

	protected static RenderStepControllers = new Map<string, RenderStep["RenderStep"]>();
	protected static PhysicsStepControllers = new Map<string, PhysicsStep["PhysicsStep"]>();

	public static GetController<T extends typeof BaseController>(Controller: T): InstanceType<T> | undefined {
		let FoundController: BaseController | undefined;

		for (const [ControllerName, ControllerInstance] of this.Controllers) {
			if (ControllerInstance instanceof Controller) {
				FoundController = ControllerInstance;
				break;
			}
		}

		return FoundController as InstanceType<T>;
	}

	public static Start() {
		this.StartedTime = os.clock();
		BullshitHelpers.LogInfo(`Starting ${GameStarter.GameName} ${GameStarter.GameVersion}`);
	}

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

	public static StartControllers() {
		for (const ControllerClass of this.ControllerRegistry) {
			const ControllerInstance = new ControllerClass();
			this.Controllers.set(ControllerInstance.GetName(), ControllerInstance);
		}

		this.Controllers.forEach((Controller) => {
			Controller.Initialize();

			this.AddToRenderStep(Controller);
			this.AddToPhysicsStep(Controller);
		});

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

		this.Controllers.forEach((Controller) => {
			Controller.PostInitialize();
		});
	}

	public static AfterStart() {
		BullshitHelpers.LogSuccess(
			`${GameStarter.GameName} ${GameStarter.GameVersion} started in ${BullshitHelpers.RoundToDecimal(os.clock() - this.StartedTime, 3)} seconds`,
		);
	}
}
