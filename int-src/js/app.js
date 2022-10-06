import { createRoot } from 'react-dom/client'
import GiphySearch from './components/GiphySearch'

const container = document.querySelector('#giphy-search')
const root = container && createRoot(container)

root && root.render(<GiphySearch />)