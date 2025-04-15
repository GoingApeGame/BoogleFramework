export declare abstract class BaseController {
    protected RenderSignal: RBXScriptConnection | undefined;
    protected HeartbeatSignal: RBXScriptConnection | undefined;
    protected IsInitialized: boolean;
    protected InitializedTime: number;
    constructor();
    Initialize(): Promise<void>;
    PostInitialize(): Promise<void>;
    private _PlayerAdded;
    PlayerAdded(Player: Player): void;
    PlayerRemoving(Player: Player): void;
    PlayerAddedCharacter(Player: Player, Character: Model): void;
    PlayerRemovingCharacter(Player: Player, Character: Model): void;
    GetName(): string;
    protected RenderStep(DeltaTime: number): void;
    protected PhysicsStep(DeltaTime: number): void;
    protected InitializeSteps(): void;
}
