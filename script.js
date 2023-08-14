//VARIABLES
let storedElement1
let storedElement2
let usersDataBase = JSON.parse(localStorage.getItem('usersDataBase')) || []
let form = document.getElementById('form')


//FUNCTIONS
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

function validateInput(event){
    event.preventDefault()
    let userEmail = document.getElementById('email').value
    let userPhoneNo = document.getElementById('phoneNumber').value
    let userPassword = document.getElementById('password').value
    let confirmUserPassword = document.getElementById('second-password').value
    let emailError = document.getElementById('emailError')
    let phoneError = document.getElementById('phoneError')
    let passwordError = document.getElementById('passwordError')
    let confirmError = document.getElementById('confirmError')
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    const numberPattern = /^[0-9]+$/
    const alphabetPattern = /^[a-zA-Z]+$/

    if(userEmail.trim() == ""){
        emailError.style.display = "block"
        emailError.innerText = 'Enter in your email address'  
    }
    
    else if(!emailPattern.test(userEmail)){
        emailError.style.display = "block"
        emailError.innerText = 'Enter in a valid email address'
    }

    else{
        emailError.style.display = "none"
    }


    if(userPhoneNo.trim() == ""){
        phoneError.style.display = "block"
        phoneError.innerText = "Enter in your phone number"
    }
    else if(userPhoneNo.length > 15 || userPhoneNo.length < 10){
        phoneError.style.display = "block"
        phoneError.innerText = "Enter in a valid phone number"
    }
    else if(!numberPattern.test(userPhoneNo)){
        phoneError.style.display = "block"
        phoneError.innerText = "Enter in a valid phone number"
      
    }
    else{
       phoneError.style.display = "none" 
    }


    if(userPassword.trim() == ""){
       passwordError.style.display = "block"
       passwordError.style.marginTop = "5px"
       passwordError.innerText = "Enter in your password"
      
    }
    else if(userPassword.length < 5){
        passwordError.style.display = "block"
       passwordError.style.marginTop = "5px"
       passwordError.innerText = "Password is not strong enough"
    }
    // else if(!userPassword.includes(/^[a-zA-Z0-9]+$/)){
    //     console.log('E DON SUP')
    //     passwordError.style.display = "block"
    //    passwordError.style.marginTop = "5px"
    //    passwordError.innerText = "Password should include a number and alphabet"
    //    event.preventDefault()
    // }
    else{
        passwordError.style.display = "none"
    }
    
    if(confirmUserPassword.trim() == ""){
        confirmError.style.display = "block"
       confirmError.style.marginTop = "5px"
       confirmError.innerText = "Confirm your password"
       
    }
    else if(confirmUserPassword.toLowerCase() !== userPassword.toLowerCase()){
        console.log('SMILE')
        confirmError.style.display = "block"
       confirmError.style.marginTop = "5px"
       confirmError.style.marginBottom = "0"
       confirmError.innerText = "Passwords do not match" 
    }
    else{
        confirmError.style.display = "none"
    }

     if(emailPattern.test(userEmail) && numberPattern.test(userPhoneNo) && userPassword.length >= 5 && confirmUserPassword == userPassword){
        registerUser(event)
     }

}

function registerUser(event){
    event.preventDefault()
    let userEmail = document.getElementById('email').value
    let userPhoneNo = document.getElementById('phoneNumber').value
    let userPassword = document.getElementById('password').value
    let error = document.getElementById('error')
    

    let newUserInfo = {
        id: usersDataBase.length + 1,
        userEmail,
        userPhoneNo,
        userPassword
    }
    
    if(usersDataBase.length == 0){
        usersDataBase.push(newUserInfo)
        localStorage.setItem('usersDataBase', JSON.stringify(usersDataBase))
        form.reset()
        window.location.assign("./dashboard.html")
    }
    else{
        usersDataBase.every(userInfo=>{
            if(userInfo.userEmail == userEmail){
                error.style.display = "block"
                error.innerText = "Email address already exists"
                return
            }
            if(userInfo.userPhoneNo == userPhoneNo){
                error.style.display = "block"
                error.innerText = "Phone Number already exists"
                return
            }
            else{
                usersDataBase.push(newUserInfo)
                localStorage.setItem('usersDataBase', JSON.stringify(usersDataBase))
                error.style.display = "none"
                form.reset()
                window.location.assign("./dashboard.html")
            }
        })
    }
}

function login(event){
    event.preventDefault()
    let userEmail0rPhone = document.getElementById('email-or-phone').value
    let userPassword = document.getElementById('password').value
    let error = document.getElementById('error')
    usersDataBase = JSON.parse(localStorage.getItem('usersDataBase')) || []

    if(userEmail0rPhone == 'admin' && userPassword == 'admin'){
        error.style.display = "none"
        form.reset()
        let currentUser = {
            userEmail : 'admin',
            userPassword : 'admin',
            userPhoneNo : 'admin'
        } 
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        window.location.assign("./dashboard.html")
    }

    else if(usersDataBase.length == 0){
        error.style.display = "block"
        error.innerText = "Email/Phone number do not exist"
    }


    usersDataBase.map(userInfo=>{
        if(userEmail0rPhone.trim() == ""){
            error.style.display = "block"
            error.innerText = 'Enter in your email address or phone number'  
            return
        }

        else if(userPassword.trim() == ""){
            error.style.display = "block"
            error.innerText = 'Enter in your password'  
            return
        }
        
        if((userInfo.userPhoneNo == userEmail0rPhone || userInfo.userEmail == userEmail0rPhone) && userInfo.userPassword == userPassword){
            error.style.display = "none"
            form.reset()
            localStorage.setItem('currentUser', JSON.stringify(userInfo))
            window.location.assign("./dashboard.html")
        }
        
        else{
            console.log(userInfo)
            error.style.display = "block"
            error.innerText =  "Invalid email/phone number or password"
            return 
        }
        
    })
    
}

let firstLink = document.getElementById('first-link')
let secondLink = document.getElementById('second-link')
let order = document.getElementById('order')
let account = document.getElementById('account')
let header = document.getElementById('header')
let pageTitle = document.getElementById('page-title') 


function displayOrder(){
    localStorage.getItem('currentPage')
    localStorage.setItem('currentPage', 'order')
    order.style.display = "grid"
    account.style.display = "none"
    secondLink.classList.add('first-link')
    firstLink.classList.remove('first-link')
    pageTitle.innerText = "ORDER"
    
}

function displayAccount(){
    localStorage.getItem('currentPage')
    localStorage.setItem('currentPage', 'account')
    firstLink.classList.add('first-link')
    secondLink.classList.remove('first-link')
    order.style.display = "none"
    account.style.display = "flex"
    pageTitle.innerText = "ACCOUNT"
}

window.addEventListener('load', ()=>{
    currentPage = localStorage.getItem('currentPage')
    if(currentPage == "account"){
        displayAccount()   
    }
    
    else{
        displayOrder()
        console.log('I THINK IT IS CORRECT')
    }
}
) 


function hideDashBoard(){
    console.log('MD')
    console.log(header)
    header.classList.toggle('hidden')
}

function pageReload(){
    window.location.assign("./dashboard.html")
}









