import UUID from "pure-uuid";

export const testUUID = 'e9a4f695-63e9-4f6f-9bf1-610e9708f69c'

export const testID = new Uint8Array(new UUID(4).parse(testUUID).export())
