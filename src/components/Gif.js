import React from 'react';
import PropTypes from 'prop-types';

export default function Gif({ gif }) {
    return (
        <div className="gif-container">
            <a href={ gif.images.original.url } target="_blank" rel="noopener noreferrer">
                <img src={ gif.images.fixed_width_downsampled.url } className="gif" alt="" />
            </a>
        </div>
    );
}

Gif.propTypes = {
    gif: PropTypes.object.isRequired
}
