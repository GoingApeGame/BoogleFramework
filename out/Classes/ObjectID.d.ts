// ObjectID.d.ts

type ObjectID = string & { readonly __brand: "MongoId" };

interface ObjectIDModule {
	new (): ObjectID;

	/**
	 * Generates a new ObjectID.
	 * @deprecated
	 */
	GenerateString(): string;

	FromString(ID: string): ObjectID;

	GenerateNext(ID: ObjectID): ObjectID;
}

export const ObjectID: ObjectIDModule;
