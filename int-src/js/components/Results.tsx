import { Gif } from '../types/types'
import GifItem from './GifItem'
import Loader from './Loader'

type ResultsProps = {
  gifs: Gif[]
  searching: boolean
  searchResponse: boolean
  error: boolean
}

const Results = ({ gifs, searching, searchResponse, error }: ResultsProps) => {
  return (
    <section aria-label='gif results'>
      <ul className='gif-results' aria-live='polite'>
        {searching && <Loader />}

        {searchResponse &&
          gifs.length > 0 &&
          gifs.map(gif => <GifItem key={gif.id} gif={gif} />)}

        {searchResponse && gifs.length === 0 && <li>No Gifs Found</li>}

        {error && <li>Error Retrieving Gifs</li>}
      </ul>
    </section>
  )
}

export default Results
