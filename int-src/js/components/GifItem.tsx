import { Gif } from '../types/types'

type GifProps = {
  gif: Gif
}

const GifItem = ({ gif }: GifProps) => {
  return (
    <div className='gif'>
      <a
        className='gif__link'
        href={gif.images.original.url}
        aria-label={gif.title}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          src={gif.images.fixed_width_downsampled.url}
          className='gif__image'
          alt={gif.title}
        />
      </a>
    </div>
  )
}

export default GifItem
