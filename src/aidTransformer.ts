export const aidTransformer = {
  to(val: Buffer[]) {
    return Buffer.concat(val)
  },
  from(val: Buffer): Buffer[] {
    let arr: Buffer[] = []
    for (let i = 0, p = 0; i < val.length;) {
      i += 16
      arr.push(val.slice(p, i))
      p = i
    }
    return arr
  },
}
