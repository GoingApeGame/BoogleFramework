import type { GameStarter } from "./GameStarter";
export declare abstract class BaseController {
    protected IsInitialized: boolean;
    protected InitializedTime: number;
    constructor();
    Initialize(Starter: typeof GameStarter): Promise<void>;
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
