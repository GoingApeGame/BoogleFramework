import { RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";
import type { IControllerRegistry } from "../Types/IControllerRegistry";
import type { BaseController } from "./BaseController";
import type { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
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
		print(`Starting ${this.GameName} ${this.GameVersion}`);
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
		// print(
		// 	`${this.GameName} ${this.GameVersion} started in ${BullshitHelpers.RoundToDecimal(os.clock() - this.StartedTime, 3)} seconds`,
		// );
	}
}
