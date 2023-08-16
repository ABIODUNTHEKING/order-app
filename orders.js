let userDataBase = JSON.parse(localStorage.getItem('usersDataBase'))
let currentUser = JSON.parse(localStorage.getItem('currentUser'))

function getFromDataBase(){
    JSON.parse(localStorage.getItem('usersDataBase'))
    JSON.parse(localStorage.getItem('currentUser'))
}

function sendToDataBase(){
    localStorage.setItem('usersDataBase', JSON.stringify(userDataBase))
    localStorage.setItem('currentUser', JSON.stringify(currentUser))   
    
}

let selectedFoodList = []
let selectedFoodImage
let selectedFoodName
let selectedFoodPrice
let selectedFoodStatus = "Pending"

function displayOrder(){
    let orders = document.getElementById('orders')
    orders.style.display = "block"
}

function hideOrder(){
    let orders = document.getElementById('orders')
    orders.style.display = "none"
}


function createOrder(event){
    let button = event.target
    let selectedFooditem = button.parentElement.parentElement
    selectedFoodImage = selectedFooditem.querySelector('.foodImage').getAttribute('src')
    selectedFoodName = selectedFooditem.querySelector('.foodName').innerText
    selectedFoodPrice = selectedFooditem.querySelector('.foodPrice').innerText

    getFromDataBase()
    let selectedFood = {
        id: selectedFoodList.length + 1,
        selectedFoodImage,
        selectedFoodName,
        selectedFoodPrice,
        selectedFoodStatus 
    }

    selectedFoodList.push(selectedFood)
    let orderCount = document.getElementById('orderCount')
    orderCount.innerText = selectedFoodList.length
    displaySelectedFood()
    addOrderToDataBase()
    sendToDataBase()
}

function addOrderToDataBase(){
    currentUser.order = selectedFoodList
   userDataBase.map(user=>{
        if(currentUser.userEmail == user.userEmail){
            user.order = selectedFoodList
        }
    })
}

function deletOrder(event){
    let selectedOrder = event.target.parentElement.parentElement
    let selectedOrderId = selectedOrder.getAttribute("id")
    selectedOrder.remove()
    getFromDataBase()
    deleteOrderFromDataBase(selectedOrderId)
    totalPrice()
    sendToDataBase()
}

function deleteOrderFromDataBase(selectedFoodId){
    console.log("------------DELETE ORDER-------------")
    selectedFoodList.map(food=>{
        if(food.id == selectedFoodId){
            let orderNo = selectedFoodList.indexOf(food)
                    selectedFoodList.splice(orderNo, 1)
        }

    })
}

function displaySelectedFood(){
    let noOrder = document.querySelector('.noOrder')
    if(selectedFoodList.length != 0){
        noOrder.style.display = "none"
    }
    selectedFoodStructure()
}

function selectedFoodStructure(){
    let listedOrder = document.getElementById('listedOrder')
    listedOrder.innerHTML += `
                            <div class="selectedOrder" id="${selectedFoodList.length}">
                                <img src="${selectedFoodImage}" alt="food">
                                <div>
                                <p class="productName" id="productName">${selectedFoodName}</p>
                                <p class="productPrice" id="productPrice">${selectedFoodPrice}</p>
                                <p class="orderStatus" id="orderStatus">${selectedFoodStatus}</p>
                                <i class="fa-solid fa-trash trash" onclick="deletOrder(event)"></i>
                                </div>
                            </div>`;

    totalPrice()      
}

function totalPrice(){
    let foodTotalPrice = document.getElementById('totalPrice')
    let total = 0
    selectedFoodList.forEach(food=>{
        let price = parseInt(food.selectedFoodPrice.slice(1))
        total+=price
        foodTotalPrice.innerText = `Total: #${total}`
    })
}

window.addEventListener('load', ()=>{
    let listedOrder = document.getElementById('listedOrder')
    let orderCount = document.getElementById('orderCount')

    getFromDataBase()
    orderCount.innerText = currentUser['order'].length
    currentUser['order'].forEach(food =>{
    listedOrder.innerHTML += `
                            <div class="selectedOrder">
                                <img src="${food.selectedFoodImage}" alt="food">
                                <div>
                                <p class="productName" id="productName">${food.selectedFoodName}</p>
                                <p class="productPrice" id="productPrice">${food.selectedFoodPrice}</p>
                                <p class="orderStatus" id="orderStatus">${food.selectedFoodStatus}</p>
                                <i class="fa-solid fa-trash trash" onclick="deletOrder(event)"></i>
                                </div>
                            </div>`;
                            totalPrice()
    })
    sendToDataBase()
})

