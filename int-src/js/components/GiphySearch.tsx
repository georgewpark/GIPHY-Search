import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Gif } from '../types/types'
import Footer from './Footer'
import Header from './Header'
import Results from './Results'
import Search from './Search'

const GiphySearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLimit, setSearchLimit] = useState(30)
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState(false)
  const [gifs, setGifs] = useState<Gif[]>([])

  const initialRender = useRef(true)

  const apiUrl = 'https://api.giphy.com/v1/gifs/search'
  const apiKey = '1caQBCCly08w0vinpWmp1AK5ep8o6gsj'
  const gifLimit = 50

  const handleSearchTermInput = useDebounce((inputValue: string) => {
    setSearching(true)
    setSearchTerm(inputValue)
  }, 800)

  const handleSearchLimitInput = useDebounce((inputValue: number) => {
    if (inputValue > gifLimit) {
      inputValue = gifLimit
    } else if (inputValue < 1) {
      inputValue = 1
    }
    setSearching(true)
    setSearchLimit(inputValue)
  }, 800)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    const fetchController = new AbortController()
    const { signal } = fetchController

    fetch(`${apiUrl}?api_key=${apiKey}&q=${searchTerm}&limit=${searchLimit}`, {
      signal
    })
      .then(res => res.json())
      .then(data => {
        if (data.meta.status === 200) {
          setGifs([...data.data])
          setError(false)
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => {
        setSearching(false)
        setSearched(true)
      })

    return () => fetchController.abort()
  }, [searchTerm, searchLimit])

  return (
    <>
      <Header />
      <main>
        <div className='container'>
          <Search
            gifLimit={gifLimit}
            handleSearchTermInput={e => handleSearchTermInput(e.target.value)}
            handleSearchLimitInput={e =>
              handleSearchLimitInput(parseInt(e.target.value))
            }
          />
          <Results
            gifs={gifs}
            searching={searching}
            searchResponse={!searching && searched && !error}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default GiphySearch
