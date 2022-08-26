
'strict mode'

let userName = document.getElementById('name')
let checkLogin;
let details = [];
let data;
myCart = [];

function submit() {
    const firstName = input1.value;
    const lastName = input2.value;
    const email = input3.value;
    const passWord = input4.value;
    const username = input5.value;


    if (!firstName || !lastName || !email || !passWord || !username) {
        alert('error');
        return;
    } else if (details.length != 0) {
        details.find(function (ele) {
            if (ele.user == username || ele.Email == email) {
                alert('err');
                return;

            } else {
                alert('move');
                data = { name1: firstName, name2: lastName, user: username, Email: email, password: passWord }
                push()
            }
        })
        return;
    } else {
        data = { name1: firstName, name2: lastName, user: username, Email: email, password: passWord }
        push()
    }

}
function push() {
    details.push(data)
    console.log(details);
    localStorage.setItem('userDetails', JSON.stringify(details));
    document.getElementById('login').click();
}



//  LOGIN IN JAVASCRIPT
let accName = '';
function login() {
    console.log('ewed');
    const nameInput = inputuser.value;
    const passWordInput = inputPassword.value

    if (!nameInput || !passWordInput) {
        console.log('input this field');
    } else if (nameInput || passWordInput) {
        details.find(function (ele) {

            if (nameInput === ele.user && passWordInput === ele.password) {
                console.log('move');
                document.getElementById('index').click();
                ele.user = accName;

                return;
            } else {
                alert('wrong input')
            }

        })
        console.log('let move');
    }

}



function getLocal() {
    detail = localStorage.getItem('userDetails')
    if (detail) {
        details = JSON.parse(detail);
    } else {
        details = details;
    }

}
getLocal()

let dist = false;
let myar = [{ image: './images/thumbnail.jpg', detail: '100 YARD RIFLE SIGHT PRACTICE TARGET 12 PER PACKAGE', price: 400 },
// { image: './images/shooting-target.jpg', detail: '100 YARD RIFLE SIGHT PRACTICE TARGET 12 PER PACKAGE', price: 700 },
{ image: './images/shooting-target.jpg', detail: '100 YARD RIFLE ', price: 900 }];

let display2 = document.getElementById('show');


function display() {
    show.innerHTML = ""

    myar.forEach((element, i) => {
        display2.innerHTML +=
            `
              <div class="gun">
            <img src="${element.image}" alt="" style="width: 70%;">
            <p class="mt-2><strong  id="pri1">${element.detail}</strong></p>

            <div class="cart2 d-flex">
                <p id="pri">$${element.price}</p>
               <button onclick="addToCart(${i})">Add to cart</button>
               <button hidden><a href="./cart.html" id="cart"></a></</button>
            </div>
        </div>
        `
    });

}


display()

let store;
function addToCart(index) {

    let imageC = myar[index].image;
    let detailC = myar[index].detail;
    let priceC = myar[index].price;

    store = { image1: imageC, detail1: detailC, price1: priceC }

    send()
}

const serial = document.getElementById('serial')




function send() {
    myCart.push(store)
    localStorage.setItem('userCart', JSON.stringify(myCart));
    document.getElementById('cart').click();
}


console.log(myCart.length);
function cartDisplay() {
    // let multy = document.getElementById('mul').innerHTML;
    serial.innerHTML = ""
    serial.innerHTML = `
    <tr class="mt-2">
    <th>Items</th>
    <th>Price</th>
    <th>QTY</th>
    <th>Total</th>
</tr>`


    myCart.forEach((ele, i) => {
        if (myCart.length != 0) {
            serial.innerHTML += `
        <tr class="mt-2">
        <th class="d-flex mage"><img src="${ele.image1}" alt="">
            <div class="d-flex del">
                <p>${ele.detail1}</p>
                <button onclick="del(${i})">delete</button>
            </div>
        </th>
        <th>
            <p>${ele.price1}</p>
        </th>
        <th>
            <div class="d-flex bord">
                <p class="p-3 " id="mullly">1</p>
                <div class="no">
                    <p class="p-1" >+</p>
                    <p class="p-1">-</p>
                </div>
            </div>
        </th>
        <th>
        
        </th>
    </tr>
     `}
    })
}



// console.log(mullly.innerHTML);
cartDisplay()


function getLocal2() {
    detail2 = localStorage.getItem('userCart')
    if (detail2) {
        myCart = JSON.parse(detail2);
        cartDisplay()
    } else {
        myCart = myCart;
        cartDisplay()
    }

}
getLocal2()


function del(por) {
    myCart.splice(por, 1);
    localStorage.setItem('userCart', JSON.stringify(myCart));
    getLocal2()

}