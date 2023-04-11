import { Gif } from '../types/types'
import GifItem from './GifItem'

type ResultsProps = {
  gifs: Gif[],
  error: boolean
}

const Results = ({ gifs, error }: ResultsProps) => {
  return (
    <div className='gif-results' aria-live='polite'>
      {gifs.length > 0 && !error ? (
        gifs.map((gif) => <GifItem key={gif.id} gif={gif} />)
      ) : error ? (
        <p>Error retrieving Gifs</p>
      ) : (
        <p>No Gifs Found</p>
      )}
    </div>
  )
}

export default Results