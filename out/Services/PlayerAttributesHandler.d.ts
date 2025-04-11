export declare abstract class PlayerAttributesHandler {
    static GetAttribute<T extends AttributeValue>(Player: Player, Attribute: string): T;
    static OnAttributeChanged<T extends AttributeValue>(Player: Player, Attribute: string, Callback: (Value: T) => void): RBXScriptConnection;
    static SetAttribute<T extends AttributeValue>(Player: Player, Attribute: string, Value?: T): void;
    static GetPlayersWithAttribute<T extends AttributeValue>(Attribute: string, Value: T): Array<Player>;
}
