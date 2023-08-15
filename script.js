//VARIABLES
let storedElement1
let storedElement2
let usersDataBase = JSON.parse(localStorage.getItem('usersDataBase')) || []
let form = document.getElementById('form')



//FUNCTIONS

//REGISTER AND LOGIN PAGE
//HIDE AND REVEAL USER PASSWORD
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



//REGISTER PAGE
//VALIDATE AND CREATE NEW USERS
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

//ADD NEW USER TO THE DATABASE
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

//CHECK YOUR INFORMATION IF IT IS AVAILABLE ON THE DATA BASE
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

function hideDashBoard(){
    header.classList.toggle('hidden')
    let main = document.getElementById('main')
    main.classList.toggle('width')
}


function menuPage(){
    window.location.assign("./menu.html")
}

function dashboardPage(){
    window.location.assign("./dashboard.html")
}

let availableFoods = []

// let userOrders = {
//     productName 
// }


function createorder(userOrders){
        let orderDetail = {
            productName : userOrders.productName == undefined ||  userOrders.productName == "" || typeof userOrders.productName == Number? alert('Put in a valid product name so we can accept your order') : userOrders.productName,
            productId : orderDataBase.length + 1,
            productPrice : typeof userOrders.productPrice == String ? alert('Put in a valid price') : userOrders.productPrice,
            eta : timeOfArrival,
            userId: userOrders.userId == undefined || userOrders.userId == "" ? console.log('Put in a valid user ID so we can accept your order') : userOrders.userId,
            productStatus : 'Pending'
        }
        availableFoods.push(orderDetail)
}

function displayFoods(){
    let menu = document.getElementById('menu')
    availableFoods.forEach(food=>{
        menu.innerHTML += `
        <div class="food">
          <img src="${food.productImage}" alt="food" class="foodImage"/>
          <div class="foodDetail">
            <p class="foodName">${food.productName}</p>
            <p class="foodPrice">#${food.productPrice}</p>
            <div>
                <button class="deleteButton" id="deleteButton" onclick="deleteOrder(event)">Delete Order</button>
                <button class="editButton">Edit Button</button> 
            </div>
          </div>
        `
    })
}
