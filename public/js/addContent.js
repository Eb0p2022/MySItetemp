let content_choice = document.getElementById('content_type');
let movie_choice = document.getElementById('movie_choice');
let tv_choice = document.getElementById('tv_choice');

let movieImage_choice = document.getElementById('imageFileLinkType');
let movieImage_fileChoice = document.getElementById('imageFileChoice');
let movieImage_linkChoice = document.getElementById('imageLinkChoice');

let tvImage_choice = document.getElementById('tvFileLinkType');
let tvImage_fileChoice = document.getElementById('tvFileChoice');
let tvImage_linkChoice = document.getElementById('tvLinkChoice');

let createHideEventListener = (target, [firstSubElement, secondSubElement], [firstChoice, secondChoice]) => {
    target.addEventListener('change', (ev) => {
        if (target.value.trim() == secondChoice) {
            firstSubElement.classList.add('hide_content');
            secondSubElement.classList.remove('hide_content');
        }
        else if (target.value.trim() == firstChoice) {
            firstSubElement.classList.remove('hide_content');
            secondSubElement.classList.add('hide_content');
        } else {
            firstSubElement.classList.add('hide_content');
            secondSubElement.classList.add('hide_content');
        }
    });
};

createHideEventListener(content_choice, [movie_choice, tv_choice], ['Movie', 'TV Show']);
createHideEventListener(movieImage_choice, [movieImage_fileChoice, movieImage_linkChoice], ['File', 'Link']);
createHideEventListener(tvImage_choice, [tvImage_fileChoice, tvImage_linkChoice], ['File', 'Link']);

let notify = (html_element, data) => {
    data.forEach(message => {
        html_element.innerHTML += `<p>${message}</p>`;
    })
    html_element.classList.remove('hide_content');
};

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
    if(element.classList.contains('close')){
        element.parentElement.classList.add('hide_content');
    }
})

const content_form = document.querySelector('#content_form');
const content_form_submit = document.getElementById('content_form_submit');

content_form_submit.addEventListener('click', (ev)=> {
    ev.preventDefault();
    
    const success_field = document.querySelector('#submit_success');
    const error_field = document.querySelector('#submit_error');
    resetNotifs();

    const content_choice = document.getElementById('content_type').value;
    let route;
    if(content_choice == 'Movie'){
        route = '/admin/postContent/movie';
    } else {
        route = '/admin/postContent/tv';
    }
    const formData = new FormData(content_form);
    fetch(route, {
        method: 'POST',
        body: formData
    }).then(response => {
        if(response.status === 200){
            let info = [`${content_choice} uploaded successfully.`];
            notify(success_field, info);
        } else {
            response.json().then(error_obj => {
                console.log(error_obj.errors);
                notify(error_field, error_obj.errors);
            });
        }
    }).catch(err => {
        console.log(err);
    });
    content_form.reset();
})
