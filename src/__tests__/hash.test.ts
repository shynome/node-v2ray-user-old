import Int64 from "node-int64";
import { testUUID, testID as id } from "./common";
import { generateHash, getUnixTime, generateNewHashes } from "../hash";
import { newAlterUUIDs } from "../id";

describe('hash', () => {
  it('generateHash', async () => {
    let hash = generateHash(id)(getUnixTime())
    expect(hash).toBeDefined()
  })
  it('generateNewHashes speed', async () => {
    let aids = await newAlterUUIDs(testUUID, 2)
    let t1 = Date.now()
    let hashes = await generateNewHashes(getUnixTime(), aids, Buffer.from('shynome'))
    let b = hashes.length
    let t2 = Date.now()
    let t = t2 - t1
    expect(t).toBeLessThan(3e2)
  })
})
