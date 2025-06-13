// ObjectID.d.ts

declare const ObjectIDBrand: unique symbol;

/**
 * A branded string representing a Mongo-style ObjectID.
 * Must be exactly 24 hex characters.
 */
type ObjectID<StringType extends string = string> = StringType & { readonly [ObjectIDBrand]: true };

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
