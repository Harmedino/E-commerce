
let count = 1;
let userName = document.getElementById("name");
let checkLogin;
let details = [];
let data;
let history = [];
let getindex = ''
let admin = false


// nav bar
const navbarToggle = document.querySelector('.navbar-toggler');
    navbarToggle.addEventListener('click', toggleNavbar);
  function toggleNavbar() {
      const navbar = document.querySelector('.navbar-collapse');
      navbar.classList.toggle('show');
    }


// sign up
function submit() {
  const firstName = input1.value;
  const lastName = input2.value;
  const email = input3.value;
  const passWord = input4.value;
  const username = input5.value;

  if (!firstName || !lastName || !email || !passWord || !username) {
    alert("error");
    return;
  } else if (details.length != 0) {
    let move1 = details.find(function (ele, i) {
      return ele.user == username || ele.Email == email;
    });
    if (move1) {
      alert("err");
      return;
    } else {
      alert("move");
      data = {
        name1: firstName,
        name2: lastName,
        user: username,
        Email: email,
        password: passWord,
        cart: history,
      };
      push();
    }

    return;
  } else {
    data = {
      name1: firstName,
      name2: lastName,
      user: username,
      Email: email,
      password: passWord,
      cart: history,
      
    };
    push();
  }
}
function push() {
  details.push(data);
  console.log(history);
  localStorage.setItem("userDetails", JSON.stringify(details));
  document.getElementById("login").click();
}

//  LOGIN IN JAVASCRIPT

function login() {
  const nameInput = inputuser.value;
  const passWordInput = inputPassword.value;

  if (!nameInput || !passWordInput) {
    console.log("input this field");
  } else if (nameInput || passWordInput) {
    let move = details.find(function (ele, i) {
      localStorage.setItem("index", JSON.stringify(i));
      return ele.user == nameInput && ele.password == passWordInput;
    });
    if (move) {
      //   console.log("move");
      document.getElementById("index").click();

      return;
    } else {
      console.log(nameInput, passWordInput);
      alert("incorrect input");
      return;
    }
  }
}

// login index
getindex = localStorage.getItem("index");

function getindex1() {
  let login = document.getElementById('login')
  let logout = document.getElementById('logout')
  let register = document.getElementById('register')
  let profile = document.getElementById('profile')

  if (getindex !== '') {
    if (getindex) {
    logout.hidden= false
    profile.hidden= false
    getindex = JSON.parse(getindex);
  } else {
    getindex = getindex;
  }
  console.log(getindex);
} else {
    login.hidden = false
    register.hidden = false
}

  
}
getindex1();

// logout

let logout = document.getElementById('logout')

logout.addEventListener('click', () => {
  localStorage.setItem("index", '')
  window.location = './HOME.html'
})

function getLocal() {
  let detail = localStorage.getItem("userDetails");
  if (detail) {
    details = JSON.parse(detail);
  } else {
    details = details;
  }
}
getLocal();

let dist = false;
let myar = []; 

async function getGuns() {
  const url = "https://pizza-and-desserts.p.rapidapi.com/pizzas";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c2d8abc9c8msh6272891cc33bfd5p1a1dc0jsne657f01ce020",
      "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    localStorage.setItem("foods", JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}

// getGuns();

function display() {
  let myFoods = JSON.parse(localStorage.getItem("foods"));
  if (myFoods) {
    myar = myFoods;
  }

  let display2 = document.getElementById("show");
  display2.innerHTML = "";

  myar.forEach((element, i) => {
    // console.log(i);
    display2.innerHTML += `

    <div class="col-md-4">
    <div class="product-card">
      <img src="${element.img}" alt="Product ${i}">
      <div class="product-title">${element.name}</div>
      <div class="product-price">$${element.price.toFixed(2)}</div>
      <div class="product-description">${element.description}</div>
      <button class="btn btn-add-to-cart"  onclick="addToCart(${i})" >Add to Cart</button>
    </div>
  </div>
        `;
  });
}

display();

let store;
function addToCart(index) {
 if (getindex !== '') {
  if (details[getindex].cart.length === 0) {
    console.log('first time');
    let imageC = myar[index].img;
    let detailC = myar[index].name;
    let priceC = myar[index].price;
    let quantity = 1;
    store = {
      image1: imageC,
      detail1: detailC,
      price1: priceC,
      total: priceC,
      quantity: quantity,
      
    };
    console.log(details[getindex].cart);
  } else {
    
  for (let i = 0; i < details[getindex].cart.length; i++) {
   
  
    if (myar[index].name === details[getindex].cart[i].detail1) {
     alert('this item is already inside the cart')
      return
   
    } else {
      console.log('new');
      let imageC = myar[index].img;
      let detailC = myar[index].name;
      let priceC = myar[index].price;
      let quantity = 1;
      store = {
        image1: imageC,
        detail1: detailC,
        price1: priceC,
        total: priceC,
        quantity: quantity,
        
      };
    }
  }
  }
 } else {
   alert('please login')
   window.location = './index.html'
 }
  send();
}

const orderNow = document.getElementById('orderNow')

try {
  orderNow.addEventListener('click', () => {
 
    if (getindex === '') {
      alert('please login')
    }
  
})
} catch (error) {
  
}

let cartDisplayLength = document.querySelectorAll('#cartLength')
if (getindex !== '') {

  let cartLength = ''

  cartDisplayLength.forEach(ele => {
  ele.hidden = false
  cartLength= ele
  })
}
const serial = document.getElementById("serial");

function send() {
  details[getindex].cart.push(store);
  localStorage.setItem("userDetails", JSON.stringify(details));
  cartLength.innerHTML = `Cart (${details[getindex].cart.length})` 
}

function getuser() {
  let get4 = localStorage.getItem("userDetails");
  if (get4) {
    details = JSON.parse(get4);
    if (getindex !== '') {
      if (details[getindex].cart.length !== 0) {
        cartLength.innerHTML = `Cart (${details[getindex].cart.length})`;
        
      }
    }
    cartDisplay();
  } else {
    details = details;
  }
  

}
getuser();


// cart javascript

function cartDisplay() {

  if (getindex !== '') {
    if (details[getindex].cart.length !== 0 ) {

      serial.innerHTML = "";
      details[getindex].cart.forEach((ele, i) => {
        let totl = Number(ele.total);
        serial.innerHTML += `
        <div class="row align-items-center w-100 justify-content-around">
          <div class="col-md-3">
            <img src="${ele.image1}" alt="Product ${i}" style="width: 40%;>
          </div>
          <div class="col-md-6 cart-item-info">
            <div class="cart-item-title">${ele.detail1}</div>
           
          </div>
          <div class="cart-item-price">$${ele.price1}</div>
          <div class="cart-item-price">$${totl} </div>
          <div class="col-md-3 text-right cart-item-quantity">
            <button class="btn btn-secondary btn-sm quantity-decrease"  onClick="decre(${i})">-</button>
            <input class="form-control quantity-input" type="number" disabled value="${ele.quantity}" min="1">
            <button class="btn btn-secondary btn-sm quantity-increase"  onClick="incre(${i})">+</button>
            <button class="btn btn-danger btn-sm ml-2" onclick="del(${i})">Remove</button>
          </div>
        </div>
        <hr>
        `;
        
      });
      }
  }
  grand()
}
cartDisplay()

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
  console.log(details);
  localStorage.setItem("userDetails", JSON.stringify(details));
  getuser();
  grand()
}
function grand() {
  let grandTotal = document.getElementById('grandTotal')

  if (getindex !== '') {
    if (details[getindex].cart.length != 0) {
      let gra =  details[getindex].cart.map((ele, i) => {
        return ele.total
     }).reduce((acc, tot) => {
       return acc+ tot
     })
     grandTotal.innerHTML = `Total: $${gra.toFixed(2)}`
    } else {
      grandTotal.innerHTML = `Total: $${total.toFixed(2)}`
      return
    }
  }

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

function getLocal3() {
  let detail3 = localStorage.getItem("ADMINPOST");
  if (detail3) {
    myar = JSON.parse(detail3);
    display();
  } else {
    myar = myar;
    display();
    // console.log(myar);
  }
}
getLocal3();

if (getindex) {
  log.innerHTML = details[getindex].user[0];
}

// CART FUNCTION



// PROFILE UPDATE



function updateUserProfile() {
console.log(details[getindex]);
  try {
    let userEmail = document.getElementById('userEmail')
  let firstnameValue = document.getElementById('firstnameValue')
  let lastnameValue = document.getElementById('lastnameValue')
  let usernameValue = document.getElementById('usernameValue')
    let userEmailValue = document.getElementById('userEmailValue')
    let phoneNumber = document.getElementById('phoneNumber')
    
    let phoneValue = document.getElementById('phoneValue')
    let address = document.getElementById('address')

  userEmail.innerHTML = details[getindex].Email
  userEmail.innerHTML.toLowerCase()
  firstnameValue.value = details[getindex].name1 
  lastnameValue.value =  details[getindex].name2
  userEmailValue.value = details[getindex].Email 
    usernameValue.value = details[getindex].user
    phoneValue.value = details[getindex].phoneNumber
    address.value = details[getindex].address
    phoneNumber.innerHTML = details[getindex].phoneNumber
  } catch (err) {
  
}
}
updateUserProfile()


try {
  let firstnameValue = document.getElementById('firstnameValue')
  let lastnameValue = document.getElementById('lastnameValue')
  let usernameValue = document.getElementById('usernameValue')
  let userEmailValue = document.getElementById('userEmailValue')
  let phoneValue = document.getElementById('phoneValue')
  let address = document.getElementById('address')

  editInfo.addEventListener('click', () => {
    if (editInfo.innerHTML === 'Edit Profile') {


      editInfo.innerHTML = 'Save Profile'
      firstnameValue.disabled = false
      lastnameValue.disabled = false
      usernameValue.disabled = false
      phoneValue.disabled = false
      address.disabled = false
      userEmailValue.disabled = false

      // details[getindex].address = address.value 
      firstnameValue.value = details[getindex].name1
      lastnameValue.value = details[getindex].name2
      usernameValue.value = details[getindex].user
      details[getindex].phoneNumber = phoneValue.value
      address.value = details[getindex].address
      
      userEmailValue.value = details[getindex].Email
      phoneValue.value = details[getindex].phoneNumber
    }
    else {
      editInfo.innerHTML = 'Edit Profile'
      firstnameValue.disabled = true
      lastnameValue.disabled = true
      usernameValue.disabled = true
      phoneValue.disabled = true
      address.disabled = true
      userEmailValue.disabled = true
    }
    localStorage.setItem("userDetails", JSON.stringify(details));
    console.log(details)
  })
} catch (error) {
  
}








