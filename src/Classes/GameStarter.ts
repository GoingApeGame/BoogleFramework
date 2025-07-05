import { RunService } from "@rbxts/services";
import { BullshitHelpers } from "../Services/BullshitHelpers";
import type { IControllerRegistry } from "../Types/IControllerRegistry";
import type { BaseController } from "./BaseController";
import type { PhysicsStep, RenderStep } from "../Types/IControllerTypes";
import { StepHandler } from "./StepHandler";

export abstract class GameStarter {
	public GameName = game.Name;
	public GameVersion = game.PlaceVersion;

	protected StartedTime = 0;

	protected abstract ControllerRegistry: IControllerRegistry<GameStarter>;
	protected Controllers = new Map<string, BaseController>();

	protected RenderStepControllers = new Map<string, RenderStep["RenderStep"]>();
	protected PhysicsStepControllers = new Map<string, PhysicsStep["PhysicsStep"]>();

	public GetController<T extends typeof BaseController>(Controller: T): InstanceType<T> | undefined {
		let FoundController: BaseController | undefined;

		for (const [ControllerName, ControllerInstance] of this.Controllers) {
			if (ControllerInstance instanceof Controller) {
				FoundController = ControllerInstance;
				break;
			}
		}

		return FoundController as InstanceType<T>;
	}

	public Start() {
		this.StartedTime = os.clock();
		BullshitHelpers.LogInfo(`Starting ${this.GameName} ${this.GameVersion}`);
	}

	public StartControllers() {
		for (const ControllerClass of this.ControllerRegistry) {
			const ControllerInstance = new ControllerClass(this);
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

	public AfterStart() {
		BullshitHelpers.LogSuccess(
			`${this.GameName} ${this.GameVersion} started in ${BullshitHelpers.RoundToDecimal(os.clock() - this.StartedTime, 3)} seconds`,
		);
	}
}
