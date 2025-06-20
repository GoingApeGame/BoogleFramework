import { RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";
import { IControllerRegistry } from "../Types/IControllerRegistry";
import { BaseController } from "./BaseController";
import { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
import { StepHandler } from "./StepHandler";

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

	public static StartControllers() {
		for (const ControllerClass of this.ControllerRegistry) {
			const ControllerInstance = new ControllerClass();
			this.Controllers.set(ControllerInstance.GetName(), ControllerInstance);
		}

		this.Controllers.forEach((Controller) => {
			Controller.Initialize();
		});

		StepHandler.Initialize();

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
