import { BullshitHelpers } from "../Services/BullshitHelpers";
import { IControllerRegistry } from "../Types/IControllerRegistry";
import { BaseController } from "./BaseController";

export abstract class GameStarter {
	public static GameName = game.Name;
	public static GameVersion = game.PlaceVersion;

	protected static StartedTime = 0;

	protected static ControllerRegistry: IControllerRegistry;
	protected static Controllers = new Map<string, BaseController>();

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
