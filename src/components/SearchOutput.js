import React from 'react';
import Gif from './Gif.js';
import PropTypes from 'prop-types';

export default function SearchOutput({ gifs }) {
    return (
        <div className="gifs-output">
            { gifs.length > 0 ? gifs.map(gif => <Gif key={ gif.id } gif={ gif } />) : <p>No GIFs Found</p> }
        </div>
    );
}

SearchOutput.propTypes = {
    gifs: PropTypes.arrayOf(PropTypes.object).isRequired
}
