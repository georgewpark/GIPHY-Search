import React from 'react';
import PropTypes from 'prop-types';

export default function SearchInput({ handleSearchInput }) {
    return (
        <div className="gif-search-container" onChange={ handleSearchInput } >
            <div>
                <label htmlFor="search" className="gif-search-label">GIF Search:</label>
                <input type="text" id="search" className="gif-search-input gif-search-term" placeholder="e.g. funny cats" />
            </div>

            <div>
                <label htmlFor="limit" className="gif-search-label">No. of GIFs:</label>
                <input type="number" id="search" className="gif-search-input gif-search-limit" placeholder="e.g. 30" defaultValue="30" />
            </div>
        </div>
    );
}

SearchInput.propTypes = {
    handleSearchInput: PropTypes.func.isRequired
}
