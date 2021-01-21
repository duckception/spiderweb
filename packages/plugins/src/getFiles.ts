import { resolve } from 'path'
import { readdir } from 'fs/promises'
import { PathLike } from 'fs'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function * getFiles(dir: PathLike): any {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir.toString(), dirent.name)
    if (dirent.isDirectory()) {
      yield * getFiles(res)
    } else {
      yield res
    }
  }
}
