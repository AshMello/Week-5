let storeTxt = document.getElementById("storeTxt")
let storeBtn = document.getElementById("storeBtn")
let storeList = document.getElementById("storeList")

let database = firebase.database()
let storesRef = database.ref("stores")


database.ref("stores")
.on('value',function(snapshot){

  let stores = []
  snapshot.forEach((childSnapshot) => {
    let storeObject = {name: childSnapshot.val().name, key: childSnapshot.key}
    stores.push(storeObject)
  })
  
  displayStores(stores)
})

storeBtn.addEventListener('click',function(){
    let name = storeTxt.value

    let storesRef = database.ref("stores")

    let storeRef = storesRef.push({
      name: name
    })
})

function deleteStore(key) {
    
    database.ref("stores").child(key).remove()
  }
  
function displayStores(stores) {
    let LIItems = stores.map((store) => {
      return `<div id="storeDisplay">
        <li>
          ${store.name}
          <button id="delete" onclick="deleteStore('${store.key}')">Delete</button>
        </li>
        </div>`
    })
    storeList.innerHTML = LIItems.join("")
  }