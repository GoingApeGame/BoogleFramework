export declare abstract class GameStarter {
    static GameName: string;
    static GameVersion: number;
    private static StartedTime;
    private static ControllerRegistry;
    private static Controllers;
    static Start(): void;
    static StartControllers(): void;
    static AfterStart(): void;
}
