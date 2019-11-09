import { newAlterUUIDs } from '../id'
import fse from 'fs-extra'
import { testUUID } from "./common";

describe('id', () => {

  it('newAlterUUIDs', async () => {
    const count = 16
    let alterUUIDs = await newAlterUUIDs(testUUID, count)
    expect(alterUUIDs).toHaveLength((count + 1) * 16)
    let expectAlterUUIDs = await fse.readFile(__dirname + '/testAlterUUIDs.bytes')
    expect(Buffer.compare(alterUUIDs, expectAlterUUIDs)).toBe(0)
  })
})