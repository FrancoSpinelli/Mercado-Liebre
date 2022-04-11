//MENU BAR
document.querySelector('.nav-bar-celu').classList.add('hide-display');

let menuBar = document.querySelector('.bars');

menuBar.addEventListener('click', () => {
    document.querySelector('.nav-bar-celu').classList.toggle('hide-display');
})


// VER PASS

let pass = document.querySelectorAll('.fa-eye-slash');
let passInput = document.querySelector('#pass')

pass.forEach(icono => {
    icono.addEventListener('click', ()=> {
        if (passInput.type === 'password'){
            return passInput.type = 'text'
        } else {
            return passInput.type = 'password'
        }
        
    })

})