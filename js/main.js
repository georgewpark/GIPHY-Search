//DOM load event
window.addEventListener("DOMContentLoaded", () => {

    const gifSearch = document.querySelector('.gif-search-container'),
          gifSearchTerm = document.querySelector('.gif-search-term'),
          gifSearchLimit = document.querySelector('.gif-search-limit'),
          gifOutput = document.querySelector('.gifs-output'),
          loader = document.querySelector('.loader'),
          apiKey = '1caQBCCly08w0vinpWmp1AK5ep8o6gsj';

    let searchTerm = '',
        searchLimit = 1,
        output = '';

    gifSearch.addEventListener('keyup', debounce(() => {

        //Display loader
        loader.style.display = 'block';

        //Clear gif output
        gifOutput.innerHTML = '';

        //Clear output string
        output = '';

        //Get search term
        searchTerm = gifSearchTerm.value;

        //Get search limit
        searchLimit = gifSearchLimit.value;

        if(searchLimit < 1 || searchLimit > 200) {
            searchLimit = 30;
            gifSearchLimit.value = searchLimit;
        }

        //Get gifs
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${searchLimit}`)
            .then(res => res.json())
            .then(data => {

                const gifs = data.data;

                //Remove loader
                loader.style.display = 'none';

                //Check if any gifs were returned
                if (gifs.length > 0) {

                    gifs.forEach(gif =>
                        output +=
                        `<div class="gif-container">
                            <a href="${gif.images.original.url}" target="_blank">
                                <img src="${gif.images.fixed_width_downsampled.url}" class="gif">
                            </a>
                         </div>`);

                    //Output gifs
                    gifOutput.innerHTML = output;

                } else {

                    //No gifs found
                    gifOutput.innerHTML = '<p>😔 No GIFs Found 😔</p>';

                }
            })
            .catch(err => {

                //Remove loader
                loader.style.display = 'none';

                //Display error message
                gifOutput.innerHTML = `<p>😔 Error: ${err.message} 😔</p>`;

            });
    }));

    //Debounce function
    function debounce(func, wait = 700, immediate) {

        let timeout;

        return () => {

            const context = this,
                  args = arguments;

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                timeout = null;
                if (!immediate) func.apply(context, args);

            }, wait);

            if (immediate && !timeout) func.apply(context, args);
        };
    }
});
