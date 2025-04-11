import { Players, RunService } from "@rbxts/services";

export abstract class PlayerAttributesHandler {
	public static GetAttribute<T extends AttributeValue>(Player: Player, Attribute: string): T {
		return Player.GetAttribute(tostring(Attribute)) as T;
	}

	public static OnAttributeChanged<T extends AttributeValue>(
		Player: Player,
		Attribute: string,
		Callback: (Value: T) => void,
	): RBXScriptConnection {
		return Player.GetAttributeChangedSignal(tostring(Attribute)).Connect(() => {
			Callback(this.GetAttribute(Player, Attribute));
		});
	}

	public static SetAttribute<T extends AttributeValue>(Player: Player, Attribute: string, Value?: T): void {
		const CurrentValue = PlayerAttributesHandler.GetAttribute(Player, Attribute);

		if (RunService.IsClient()) {
			throw "Cannot set player attributes on the client!";
		}

		if (CurrentValue !== undefined && Value !== undefined && !typeIs(CurrentValue, typeOf(Value))) {
			throw `Attribute ${tostring(Attribute)} is not of type ${typeOf(Value)}`;
		}

		Player.SetAttribute(tostring(Attribute), Value);
	}

	public static GetPlayersWithAttribute<T extends AttributeValue>(Attribute: string, Value: T): Array<Player> {
		return Players.GetPlayers().filter((Player) => this.GetAttribute(Player, Attribute) === Value);
	}
}
