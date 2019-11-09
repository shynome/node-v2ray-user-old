import { newAlterUUIDs } from '../id'
import UUID from "pure-uuid"

describe('id', () => {
  const baseUUID = new UUID(4).toString()
  it('newAlterUUIDs', async () => {
    const count = 2
    let alterUUIDs = await newAlterUUIDs(baseUUID, count)
    expect(alterUUIDs).toHaveLength((count + 1) * 16)
  })
})