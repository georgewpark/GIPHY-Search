import React, { Component, Fragment } from 'react';
import SearchInput from './SearchInput.js';
import SearchOutput from './SearchOutput.js';
import Loader from './Loader.js';
import attribution from '../powered-by-giphy.png';
import debounce from '../debounce';

export default class App extends Component {

    state = {
        searchTerm: '',
        searchLimit: 30,
        searching: false,
        searched: false,
        gifs: [],
        url: 'https://api.giphy.com/v1/gifs/search?',
        apiKey: '1caQBCCly08w0vinpWmp1AK5ep8o6gsj'
    }

    handleSearchInput = debounce(target => {
        target.className.includes('gif-search-term') ?
            this.setState({ searchTerm: target.value, searching: true }, this.fetchGifs) :
            this.setState({ searchLimit: target.value <= 200 ? target.value : 200, searching: true }, this.fetchGifs);
    });

    fetchGifs = () => {
        fetch(`${this.state.url}api_key=${this.state.apiKey}&q=${this.state.searchTerm}&limit=${this.state.searchLimit}`)
            .then(res => res.json())
            .then(data => this.setState({ gifs: data.data, searching: false, searched: true }));
    }

    render() {
        return (
            <Fragment >
                <header>
                    <h1><span className="giphy-logo">GIPHY</span> <span>Search API</span></h1>
                </header>
                <main>
                    <div className="container">
                        <SearchInput handleSearchInput={ e => this.handleSearchInput(e.target) } />
                        { this.state.searching ? <Loader /> : null }
                        { !this.state.searching && this.state.searched ? <SearchOutput gifs={ this.state.gifs } /> : null }
                    </div>
                </main>
                <footer>
                    <a href="https://developers.giphy.com/">
                        <img src={ attribution } alt="Powered By GIPHY" />
                    </a>
                </footer>
            </Fragment >
        );
    }
}
