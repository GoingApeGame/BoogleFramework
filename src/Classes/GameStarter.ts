import BullshitHelpers from "../Services/BullshitHelpers";
import { IControllerRegistry } from "../Types/IControllerRegistry";
import Controller from "./Controller";

export default class GameStarter {
	public static GameName = game.Name;
	public static GameVersion = game.PlaceVersion;

	private static StartedTime = 0;

	private static ControllerRegistry: IControllerRegistry;
	private static Controllers = new Map<string, Controller>();

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
