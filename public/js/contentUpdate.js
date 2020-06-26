let resetNotifs = () => {
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

document.addEventListener('click', ev => {
    let element = ev.target;
    if (element.id == 'tv_update') {
        fetchSearchResults('TV');
    } else {
        fetchSearchResults('Movie')
    }
});

let fetchSearchResults = (content_type) => {
    let searchParam = 'la';
    const route = `/admin/searchMedia/${content_type}/${searchParam}`
    fetch(route, {
        method: 'POST'   
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}