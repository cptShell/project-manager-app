type CustomObject = Record<string, unknown>;

type KeyType = string | number;

export type NestedKeyOf<ObjectType extends CustomObject> = {
  [Key in keyof ObjectType & KeyType]: ObjectType[Key] extends CustomObject
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error because of deep nesting
    `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & KeyType];
