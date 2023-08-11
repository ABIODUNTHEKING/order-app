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
        event.preventDefault()
    }
    else{
        emailError.style.display = "none"
    }

    if(userPhoneNo.trim() == ""){
        phoneError.style.display = "block"
        phoneError.innerText = "Enter in your phone number"
        event.preventDefault()
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
    else if(confirmUserPassword !== userPassword){
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
        registerUser()
        console.log('SMIle')
     }

}

function registerUser(){
    let userEmail = document.getElementById('email').value
    let userPhoneNo = document.getElementById('phoneNumber').value
    let userPassword = document.getElementById('password').value

    let newUserInfo = {
        userEmail,
        userPhoneNo,
        userPassword
    }
    console.log(usersDataBase)
    if(usersDataBase.length == 0){
        usersDataBase.push(newUserInfo)
        localStorage.setItem('usersDataBase', JSON.stringify(usersDataBase))
        form.reset()
    }
    else{
        console.log(typeof usersDataBase)
        
        usersDataBase.map(userInfo=>{
            if(userInfo.userEmail == userEmail){
                alert("Email address already exists")
                return
            }
            else if(userInfo.userPhoneNo == userPhoneNo){
                alert("Phone Number already exists")
                return
            }
            else{
                usersDataBase.push(newUserInfo)
                localStorage.setItem('usersDataBase', JSON.stringify(usersDataBase))
                form.reset()
            }
        })
    }
    
    

    
}





