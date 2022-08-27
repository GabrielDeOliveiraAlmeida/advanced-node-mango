export interface SaveUserPicture {
  savePicture: (params: SaveUserPicture.Input) => Promise<void>
}

export namespace SaveUserPicture {
  export type Input = {
    pictureUrl: string | undefined
  }
}

export interface LoadUserProfile {
  load: (params: LoadUserProfile.Input) => Promise<void>
}

export namespace LoadUserProfile {
  export type Input = {
    id: string
  }

  export type Output = undefined | {
    id: string
    name?: string
  }
}
