export interface RenderStep {
	RenderStep(DeltaTime: number): void;
}

export interface PhysicsStep {
	PhysicsStep(DeltaTime: number): void;
}
