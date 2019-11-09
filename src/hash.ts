
import { createHmac } from "crypto";
import Int64 from "node-int64";
import os from "os";

export let cacheDurationSec = 120

export const getUnixTime = (d = Date.now()) => Math.floor(d / 1e3)

const emptyMetaData = Buffer.from([])

export const generateNewHashes = async (nowSec: number, aids: Uint8Array[], metadata: Uint8Array = emptyMetaData) => {
  const genStartSec = nowSec - cacheDurationSec
  const genEndSec = nowSec + cacheDurationSec
  let hashMap: [Uint8Array, Uint8Array][] = []
  const genHashForID = (id: Uint8Array) => {
    const genHashValue = generateHash(id)
    let hashValue: Uint8Array, timeAndMetadata: Uint8Array
    for (let i = genStartSec; i <= genEndSec; i++) {
      hashValue = genHashValue(i)
      timeAndMetadata = Buffer.concat([new Int64(i).toBuffer(), metadata])
      hashMap.push([hashValue, timeAndMetadata])
    }
  }
  for (let id of aids) {
    genHashForID(id)
  }
  return hashMap
}

export const generateHash = (id: Uint8Array) => {
  const genHashValue = (val: Int64) => createHmac('md5', id).update(val.toBuffer()).digest()
  return (nowSec: number) => {
    return genHashValue(new Int64(nowSec))
  }
}