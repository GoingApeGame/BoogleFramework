import { ReplicatedStorage } from "@rbxts/services";
import BullshitHelpers from "./BullshitHelpers";

export default class ReplicatedAssetService {
	public static GetAssetByPath(Path: string) {
		const StartPoint = ReplicatedStorage;

		const PathParts = Path.split("/");
		let CurrentPoint: Instance = StartPoint;

		for (const PathPart of PathParts) {
			const NextPoint = CurrentPoint.FindFirstChild(PathPart);

			if (!NextPoint) {
				BullshitHelpers.LogWarning(`Could not find ${PathPart} in ${CurrentPoint.GetFullName()}`);
				CurrentPoint = new Instance("Model");
				break;
			}

			CurrentPoint = NextPoint;
		}

		return CurrentPoint;
	}
}
