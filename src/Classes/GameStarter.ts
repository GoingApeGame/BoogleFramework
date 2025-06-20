import { RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";
import { IControllerRegistry } from "../Types/IControllerRegistry";
import { BaseController } from "./BaseController";

export abstract class GameStarter {
	public static GameName = game.Name;
	public static GameVersion = game.PlaceVersion;

	protected static StartedTime = 0;

	protected static ControllerRegistry: IControllerRegistry;
	protected static Controllers = new Map<string, BaseController>();

	protected static RenderStepControllers = new Map<string, RenderStep["RenderStep"] | undefined>();
	protected static PhysicsStepControllers = new Map<string, PhysicsStep["PhysicsStep"] | undefined>();

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

	public static StartControllers() {
		for (const ControllerClass of this.ControllerRegistry) {
			const ControllerInstance = new ControllerClass();
			this.Controllers.set(ControllerInstance.GetName(), ControllerInstance);
		}

		this.Controllers.forEach((Controller) => {
			Controller.Initialize();

			const RenderStep = rawget(Controller, "RenderStep") as RenderStep["RenderStep"] | undefined;
			const PhysicsStep = rawget(Controller, "PhysicsStep") as PhysicsStep["PhysicsStep"] | undefined;

			if (RenderStep) {
				this.RenderStepControllers.set(Controller.GetName(), RenderStep);
			}

			if (PhysicsStep) {
				this.PhysicsStepControllers.set(Controller.GetName(), PhysicsStep);
			}
		});

		this.Controllers.forEach((Controller) => {
			Controller.PostInitialize();
		});

		if (this.RenderStepControllers.size() > 0) {
			if (RunService.IsClient()) {
				RunService.RenderStepped.Connect((DeltaTime: number) => {
					this.RenderStepControllers.forEach((RenderStep) => {
						if (RenderStep) {
							RenderStep(DeltaTime);
						}
					});
				});
			} else if (this.PhysicsStepControllers.size() > 0) {
				throw "PhysicsStep is not supported on the server";
			}
		}

		if (this.PhysicsStepControllers.size() > 0) {
			RunService.Heartbeat.Connect((DeltaTime: number) => {
				this.PhysicsStepControllers.forEach((PhysicsStep) => {
					if (PhysicsStep) {
						PhysicsStep(DeltaTime);
					}
				});
			});
		}
	}

	public static AfterStart() {
		BullshitHelpers.LogSuccess(
			`${GameStarter.GameName} ${GameStarter.GameVersion} started in ${BullshitHelpers.RoundToDecimal(os.clock() - this.StartedTime, 3)} seconds`,
		);
	}
}
