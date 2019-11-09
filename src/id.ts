import UUID from "pure-uuid";
import { createHash, Hash } from "crypto";

export async function newAlterUUIDs(uuid: string, alterIDCount: number): Promise<Uint8Array[]> {
  alterIDCount = alterIDCount + 1
  let alterUUIDs = new Array(alterIDCount)
  let prevID = new Uint8Array(new UUID(4).parse(uuid).export())
  alterUUIDs[0] = prevID
  for (let i = 1; i < alterIDCount; i++) {
    let newID = await NextUUID(prevID)
    alterUUIDs[i] = newID
    prevID = newID
  }
  return alterUUIDs
}

const bn = Buffer.from("c48619fe-8f02-49e0-b9e9-edf763e17e21")

export async function NewUUID(_uuid: Uint8Array): Promise<Uint8Array> {
  const uuid = Buffer.from(_uuid)
  let h: Hash = createHash('md5')
  h = h.update(uuid)
  h.update(bn)
  return h.digest()
}

const b1 = Buffer.from('16167dc8-16b6-4e6d-b8bb-65dd68113a81')
const b2 = Buffer.from('533eff8a-4113-4b10-b5ce-0f5d76b98cd2')

export async function NextUUID(_uuid: Uint8Array): Promise<Uint8Array> {
  const uuid = Buffer.from(_uuid)
  let b = uuid
  b = Buffer.concat([uuid, b1])
  let newid: Uint8Array
  while (true) {
    newid = createHash('md5').update(b).digest()
    if (uuid.compare(newid) !== 0) {
      return newid
    }
    b = Buffer.concat([b, b2])
  }
}
