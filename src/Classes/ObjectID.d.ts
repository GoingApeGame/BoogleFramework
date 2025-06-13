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

	/**
	 * Generates the next ObjectID in the list.
	 * @deprecated
	 */
	GenerateNext(): string;

	FromString<StringType extends string = string>(ID: StringType): ObjectID<StringType>;
}

export const ObjectID: ObjectIDModule;
