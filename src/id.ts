import UUID from "pure-uuid";
import { createHash, Hash } from "crypto";

export async function newAlterUUIDs(uuid: string, alterIDCount: number): Promise<Uint8Array> {
  let alterUUIDs = Buffer.from([])
  let prevID = new Uint8Array(new UUID(4).parse(uuid).export())
  alterUUIDs = Buffer.concat([alterUUIDs, prevID])
  alterIDCount = alterIDCount + 1
  for (let i = 1; i < alterIDCount; i++) {
    let newID = await NewUUID(prevID)
    alterUUIDs = Buffer.concat([alterUUIDs, newID])
    prevID = newID
  }
  return alterUUIDs
}

export async function NewUUID(_uuid: Uint8Array): Promise<Uint8Array> {
  const uuid = Buffer.from(_uuid)
  let h: Hash = createHash('md5')
  h = h.update(uuid)
  h.update("c48619fe-8f02-49e0-b9e9-edf763e17e21")
  return h.digest()
}

export async function NextUUID(_uuid: Uint8Array) {
  const uuid = Buffer.from(_uuid)
  let h: Hash = createHash('md5')
  h.update(uuid)
  h.update('16167dc8-16b6-4e6d-b8bb-65dd68113a81')
  let newid: Uint8Array
  while (true) {
    newid = h.digest()
    if (!Buffer.compare(uuid, newid)) {
      return newid
    }
    h.update('533eff8a-4113-4b10-b5ce-0f5d76b98cd2')
  }
}
