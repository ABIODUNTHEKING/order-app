let storedElement1
let storedElement2
let storedEvent
function viewPassword(element1, element2){
     storedElement1 = element1
     storedElement2 = element2
    element1 = document.getElementById(element1)
    element2 = document.getElementById(element2)
    element1.setAttribute('type', 'text')
    element2.innerHTML = "<i class='fa-solid fa-eye-slash'></i>"
    element2.setAttribute('onclick', `unviewPassword('${storedElement1}', '${storedElement2}')`)

}

function unviewPassword(element1, element2){
    
    element1 = document.getElementById(element1)
    element2 = document.getElementById(element2)
    element1.setAttribute('type', 'password')
    element2.innerHTML = "<i class='fa-solid fa-eye'></i>"
    element2.setAttribute('onclick', `viewPassword('${storedElement1}', '${storedElement2}')`)
}

