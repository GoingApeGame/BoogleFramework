import type { GameStarter } from "./GameStarter";
export declare abstract class BaseController {
    readonly Starter: GameStarter;
    protected IsInitialized: boolean;
    protected InitializedTime: number;
    constructor(Starter: GameStarter);
    Initialize(): Promise<void>;
    PostInitialize(): Promise<void>;
    private _PlayerAdded;
    PlayerAdded(Player: Player): void;
    PlayerRemoving(Player: Player): void;
    PlayerAddedCharacter(Player: Player, Character: Model): void;
    PlayerRemovingCharacter(Player: Player, Character: Model): void;
    GetName(): string;
    /**
     * @deprecated
     */
    protected InitializeSteps(): void;
}
