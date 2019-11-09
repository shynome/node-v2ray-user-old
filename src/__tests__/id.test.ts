import { newAlterUUIDs } from '../id'
import fse from 'fs-extra'

describe('id', () => {
  const testUUID = 'e9a4f695-63e9-4f6f-9bf1-610e9708f69c'
  it('newAlterUUIDs', async () => {
    const count = 16
    let alterUUIDs = await newAlterUUIDs(testUUID, count)
    expect(alterUUIDs).toHaveLength((count + 1) * 16)
    let expectAlterUUIDs = await fse.readFile(__dirname + '/testAlterUUIDs.bytes')
    expect(Buffer.compare(alterUUIDs, expectAlterUUIDs)).toBe(0)
  })
})