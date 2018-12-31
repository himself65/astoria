declare module 'fs-writefile-promise' {
  import { PathLike } from 'fs'
  type PathType = PathLike | number
  type OptionsType = { encoding: string; flag?: string; } | string

  function fsWriteFilePromise (path: PathType, options: OptionsType): Promise<string>

  function fsWriteFilePromise (path: PathType, options?: null): Promise<Buffer>

  export = fsWriteFilePromise

  namespace fsWriteFilePromise {
  }
}
