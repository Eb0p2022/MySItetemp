let passwords = document.querySelector('#passwords');
let inputPassword = document.querySelector('#inputPassword');
let repeatPassword = document.querySelector('#repeatPassword');

let test = () => {
    if (inputPassword.value != repeatPassword.value) {
        passwords.innerText = 'Passwords do not match';
        passwords.style.display = 'block';
    } else {
        passwords.innerText = '';
        passwords.style.display = 'none';
    }
}

let submitBtn = document.getElementById("create-submit");
const createAdminForm = document.querySelector('#newAdminForm');

submitBtn.addEventListener('click', ev => {
    if (passwords.innerText == '') {
        const createAdminFormData = new FormData(createAdminForm);
        console.log(createAdminFormData.has("password"));
        fetch('/admin/createAdmin', {
            method: 'POST',
            body: createAdminFormData
        }).then(() => {
            console.log('Form submitted!');
        }).catch(err => {
            console.log(err);
        })
    }
    else {
        ev.preventDefault();
    }
})
