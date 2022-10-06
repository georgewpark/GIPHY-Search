
import { useState, useEffect, useRef, useMemo } from 'react'
import Header from './Header'
import Search from './Search'
import Results from './Results'
import Loader from './Loader'
import Footer from './Footer'
import debounce from '../debounce'

const GiphySearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLimit, setSearchLimit] = useState(30)
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState(false)
  const [gifs, setGifs] = useState([])

  const initialRender = useRef(true)

  const apiUrl = 'https://api.giphy.com/v1/gifs/search'
  const apiKey = '1caQBCCly08w0vinpWmp1AK5ep8o6gsj'
  const gifLimit = 50

  const handleSearchTermInput = useMemo(() =>
    debounce((inputValue) => {
      setSearching(true)
      setSearchTerm(inputValue)
    })
  )

  const handleSearchLimitInput = useMemo(() =>
    debounce((inputValue) => {
      if (inputValue > gifLimit) {
        inputValue = gifLimit
      } else if (inputValue < 1) {
        inputValue = 1
      }
      setSearching(true)
      setSearchLimit(inputValue)
    })
  )

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    fetch(`${apiUrl}?api_key=${apiKey}&q=${searchTerm}&limit=${searchLimit}`)
      .then((res) => res.json())
      .then((data) => {
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
  }, [searchTerm, searchLimit])

  return (
    <>
      <Header />
      <main>
        <div className='container'>
          <Search
            gifLimit={ gifLimit }
            handleSearchTermInput={ e => handleSearchTermInput(e.target.value) }
            handleSearchLimitInput={ e => handleSearchLimitInput(e.target.value) }
          />
          { searching && <Loader /> }
          { !searching && searched && <Results gifs={ gifs } error={ error } /> }
        </div>
      </main>
      <Footer />
    </>
  )
}


export default GiphySearch