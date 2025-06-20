declare interface RenderStep {
	RenderStep(DeltaTime: number): void;
}

declare interface PhysicsStep {
	PhysicsStep(DeltaTime: number): void;
}
