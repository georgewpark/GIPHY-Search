export type Gif = {
  id: string
  title: string
  images: {
    original: {
      url: string
    }
    fixed_width_downsampled: {
      url: string
    }
  }
}
