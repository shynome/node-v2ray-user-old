export const aidTransformer = {
  to(val: Uint8Array[]) {
    return Buffer.concat(val)
  },
  from(val: Uint8Array): Uint8Array[] {
    let arr: Uint8Array[] = []
    for (let i = 0, p = 0; i < val.length;) {
      i += 16
      arr.push(val.slice(p, i))
      p = i
    }
    return arr
  },
}
