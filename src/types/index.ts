export interface artist {
  name: string
}

export interface track {
  song: {
    id: number,
    name: string,
    ar: artist[],
    al: { name: string },
    dt: number
  }
}