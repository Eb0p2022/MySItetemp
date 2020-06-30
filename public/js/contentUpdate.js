const mediaFilter = document.getElementById('mediaFilterBtn');

const resetNotifs = () => {
    const success_field = document.querySelector('#submit_success');
    const error_field = document.querySelector('#submit_error');

    let closeBtnHTML = `<span class="close" aria-hidden="false">&times;</span>`;

    success_field.innerHTML = closeBtnHTML;
    error_field.innerHTML = closeBtnHTML;

    let closeBtns = document.getElementsByClassName('close');
    for (let index = 0; index < closeBtns.length; index++) {
        closeBtns[index].classList.add('close_fix');
    }

    success_field.classList.add('hide_content');
    error_field.classList.add('hide_content');
}

let notify = (html_element, data) => {
    data.forEach(message => {
        html_element.innerHTML += `<p>${message}</p>`;
    })
    html_element.classList.remove('hide_content');
};

const setMediaFilterText = (filterText) => {
    mediaFilter.innerText = filterText;
}

const fetchSearchResults = (searchParams) => {
    const success_field = document.querySelector('#submit_success');
    const error_field = document.querySelector('#submit_error');
    resetNotifs();
    let mediaType;

    if (searchParams.mediaParam === 'Media Choice'){
        notify(error_field, ['Filter type not indicated.']);
        return;
    } 
    const route = `/admin/search${searchParams.mediaParam}/${searchParams.query}`
    fetch(route, {
        method: 'GET'   
    })
    .then(response => {
        if(response.status === 200){
            return response.json();
        }
    })
    .then(data => {
        if(data.error !== ''){
            notify(error_field, [(data.error)]);
            return;
        }
        notify(success_field, data.results.results)
    })
    .catch(err => console.log(err))
}

const fetchSearchParams = () => {
    const searchParam = document.getElementById('search_param');
    return {
        mediaParam: mediaFilter.innerText.trim(),
        query: searchParam.value.trim()
    }
}

document.addEventListener('click', ev => {
    let element = ev.target;
    if (element.classList.contains('close')) {
        element.parentElement.classList.add('hide_content');
        return;
    }
    switch (element.id) {
        case 'movie_filter':
            setMediaFilterText('Movie')
            break;
        
        case 'tv_filter':
            setMediaFilterText('TV')
            break;

        case 'search_param':
            resetNotifs();
            break;

        case 'submit_search':
        case 'submit_search_2':
            fetchSearchResults(fetchSearchParams());
            break;

        default:
            break;
    }
});
