
let myar = []; 

let getindex = ''


function cartDisplay() {

    if (getindex) {
      if (details[getindex].cart.length !== 0 ) {
  
        serial.innerHTML = "";
        serial.innerHTML = `
          <tr class="mt-2">
          <th>Items</th>
          <th>Price</th>
          <th>QTY</th>
          <th>Total</th>
      </tr> `;
      
        details[getindex].cart.forEach((ele, i) => {
         
          let totl = Number(ele.total);
      
          // if (history.length != 0) {
          serial.innerHTML += `
              <tr class="mt-2">
              <th class="d-flex mage"><img src="${ele.image1}" alt="" style="width: 40%;">
                  <div class="d-flex del">
                      <p>${ele.detail1}</p>
                      <button onclick="del(${i})" class="btn btn-danger"> Delete </button>
                  </div>
              </th>
              <th>
                  <p>${ele.price1}</p>
              </th>
              <th>
                  <div class="d-flex bord">
                  <div id='minus'>${ele.quantity}</div>
                      <div class="no">
                          <div class='increase'> <p id='${i}' class="p-1" onClick="incre(${i})" >+</p><div>
                          <p class="p-1"  onClick="decre(${i})">-</p>
                      </div>
                  </div>
              </th>
              <th>
              <P>${totl}</p>
              </th>
              <th>
              </th>
          </tr>
          `;
        });
        }
    }
    
  }
  
  
  function incre(params) {
    
  
    let newQuantity = ++details[getindex].cart[params].quantity
    details[getindex].cart[params].total = details[getindex].cart[params].price1 * newQuantity
    localStorage.setItem("userDetails", JSON.stringify(details));
    cartDisplay()
    grand()
   
    
  }
  function decre(params) {
    let newQuantity = --details[getindex].cart[params].quantity;
    if (newQuantity > 0) {
     console.log(newQuantity);
      details[getindex].cart[params].total = details[getindex].cart[params].price1 * newQuantity
      localStorage.setItem("userDetails", JSON.stringify(details));
      cartDisplay()
      grand()
    }
    else {
      del(params)
    }
  }
  
  
  function del(por) {
    details[getindex].cart.splice(por, 1);
    localStorage.setItem("userDetails", JSON.stringify(details));
    getuser();
    grand()
  }
  
  // ADMIN POSTING
  let data3;
  let image;
  function post() {
    let img = document.getElementById("img").value;
    let a = img.slice(12, img.length);
    let b = `../images/${a}`;
  
    if (!img || !text.value || !mount.value) {
      console.log("empty");
      return;
    } else {
      data3 = { image: b, details: text.value, price: mount.value };
      setAdminPost();
    }
    img = "";
    text.value = "";
    mount.value = "";
  }
  
  function setAdminPost() {
    myar.push(data3);
    console.log(myar);
    localStorage.setItem("ADMINPOST", JSON.stringify(myar));
    admin.hidden = true;
  }
  
 
  
  if (getindex) {
    log.innerHTML = details[getindex].user[0];
  }
  
  // CART FUNCTION
  
  
  // grand totoal of goods
  
  function grand() {
    let grandTotal = document.getElementById('grandTotal')
    if (getindex) {
      if (details[getindex].cart.length != 0) {
        let gra =  details[getindex].cart.map((ele, i) => {
          return ele.total
       }).reduce((acc, tot) => {
         return acc+ tot
       })
       grandTotal.innerHTML = '$'+gra
      } else {
        grandTotal.innerHTML = '$00'
        return
      }
    }
  
  }
  grand()