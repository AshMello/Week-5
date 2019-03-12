let allItems = document.getElementById("allItems")
let oneItemView = document.getElementById("oneItemView")
let masterList = document.getElementById("masterList")
let createBtn = document.getElementById("createBtn")
let createEmail = document.getElementById("createEmail")
let createCoffee = document.getElementById("createCoffee")
let delBtn = document.getElementById("delBtn")
let delInfo = document.getElementById("delInfo")
let viewBtn = document.getElementById("viewBtn")
let viewInfo = document.getElementById("viewInfo")

function refreshPage(timeoutPeriod) {
    setTimeout('location.reload(true);', timeoutPeriod)
}

function viewAll() {
    fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/')
        .then(function(response){
            return response.json()
          }).then(function(myJSON){
            Object.keys(myJSON).forEach(function(item){
                let orders = `<li id="all">
                <div id="displaydrink"> 
                <div id="coffee">               
                <span> Coffee: ${myJSON[item].coffee}   </span>
                <span>  Email: ${myJSON[item].emailAddress}</span>
                </div>
                             </li>`
            console.log(myJSON)
            allItems.innerHTML += orders
          }) 
})
}

masterList.addEventListener('click', function() {
    viewAll()
}) 

createBtn.addEventListener('click',function(){
    let paramsToSend = {emailAddress: createEmail.value, coffee: createCoffee.value}
    fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paramsToSend)
  }).then(function(response){
    return response.json()
  })
})

viewBtn.addEventListener('click', function() {
    email = viewInfo.value
    emailURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${email}`
    fetch(emailURL)
        .then(function(response){
            return response.json()
          }).then(function(myJSON){
                let singleOrder = `<li id="all">                
                <span>Coffee: ${myJSON.coffee}</span>
                <span>Size: ${myJSON.size}</span>
                <span>Flavor: ${myJSON.flavor}</span>
                <span>Email: ${myJSON.emailAddress}</span>
                <span>-------</span>
                             </li>`
            oneItemView.innerHTML += singleOrder
            })
})

delBtn.addEventListener('click', function() {
    let email = delInfo.value
    fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${email}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(function(response){
    return response.json()
  })
   
})
