import { ChangeEvent } from 'react'

type SearchProps = {
  gifLimit: number
  handleSearchTermInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleSearchLimitInput: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = ({
  gifLimit,
  handleSearchTermInput,
  handleSearchLimitInput
}: SearchProps) => {
  return (
    <section className='gif-search' aria-label='gif search'>
      <div className='gif-search__field'>
        <label htmlFor='search' className='gif-search__label'>
          GIF Search:
        </label>
        <input
          type='text'
          id='search'
          className='gif-search__input gif-search__input--term'
          placeholder='funny cats'
          onChange={handleSearchTermInput}
        />
      </div>
      <div className='gif-search__field'>
        <label htmlFor='limit' className='gif-search__label'>
          No. of GIFs:
        </label>
        <input
          type='number'
          id='limit'
          className='gif-search__input gif-search__input--limit'
          placeholder='30'
          defaultValue='30'
          min='1'
          max={gifLimit}
          onChange={handleSearchLimitInput}
        />
      </div>
    </section>
  )
}

export default Search
