const search_results_div = document.getElementById('search_content');
const mediaFilter = document.getElementById('mediaFilterBtn');
const search_results = document.querySelector('#search_results')
const error_field = document.querySelector('#submit_error')

const resetNotifs = () => {

    let closeBtnHTML = `<span class="close" aria-hidden="false">&times;</span>`;

    error_field.innerHTML = closeBtnHTML;

    let closeBtns = document.getElementsByClassName('close');
    for (let index = 0; index < closeBtns.length; index++) {
        closeBtns[index].classList.add('close_fix');
    }

    error_field.classList.add('hide_content');
    search_results_div.innerHTML = '';
    search_results.classList.add('hide_content')
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

const fetchSearchResults = async (searchParams) => {
    return new Promise((resolve, reject) => {
        const error_field = document.querySelector('#submit_error');
        resetNotifs();
        let mediaType;

        if (searchParams.mediaParam === 'Media Choice') {
            notify(error_field, ['Filter type not indicated.']);
            return;
        }
        const route = `/admin/search${searchParams.mediaParam}/${searchParams.query}`
        fetch(route, {
            method: 'GET'
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                return
            })
            .then(data => {
                if (data.error !== '') {
                    notify(error_field, [data.error]);
                    return;
                }
                resolve(data.results);
            })
            .catch(err => reject(err))
    }); 
}

const fetchSearchParams = () => {
    const searchParam = document.getElementById('search_param');
    return {
        mediaParam: mediaFilter.innerText.trim(),
        query: searchParam.value.trim()
    }
}

const fillSearchResults = async () => {
    let results = []
    try {
        let searchParams = fetchSearchParams()
        results = await fetchSearchResults(searchParams)
        results.forEach(result => {
            let searchHTML = `<div class="col-lg-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                                                    <div class="card-body pt-0">
                                                        <div class="row">
                                                            <div class="col-7">
                                                                <h2 class="lead"><b>${result.title}</b></h2>
                                                                <p class="text-muted text-sm"><b>Synopsis: </b> ${result.description} </p>
                                                            </div>
                                                            <div class="col-5 text-center">
                                                                <img src="${result.image}" alt="" class="img-fluid img-update-fix">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-footer">
                                                        <div class="text-right">
                                                            <a href="/admin/updateContent/movie/${result.id}" class="btn btn-sm btn-primary btn-fix btn-update-fix">
                                                                Edit
                                                            </a>
                                                        </div>
                                                    </div>
                                                    </div>`
            search_results_div.innerHTML += searchHTML
            search_results.classList.remove('hide_content')
        })
    } catch (error) {
        throw error
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

        case 'submit_search':
        case 'submit_search_2':
            resetNotifs();
            fillSearchResults();
            break;

        default:
            break;
    }
});
