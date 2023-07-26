// let count = 1;
// let userName = document.getElementById("name");
// let checkLogin;
let details = [];
let data;
let history = [];
let getindex = "";
let loggedInUserId = "";
// let admin = false

let login = document.getElementById("login");
let logout = document.getElementById("logout");
let register = document.getElementById("register");
let profile = document.getElementById("profile");
let admin = document.getElementById("admin");
let order = document.getElementById("order");

// nav bar
try {
  let showt = document.querySelector(".navs");

  hamburger.addEventListener("click", show);
  function show() {
    showt.classList.toggle("active");
  }
} catch (error) {}

// ADMIN PANEL AND FIREBASE INITILIZATION

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvlN8Bjcqf9u4VNmH0y5RqmGjl_eRCBoA",
  authDomain: "foods-e-commerce.firebaseapp.com",
  projectId: "foods-e-commerce",
  storageBucket: "foods-e-commerce.appspot.com",
  messagingSenderId: "848556447314",
  appId: "1:848556447314:web:897c8da42a113f62de718b",
  measurementId: "G-5RD7FH8SNL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initiliaze Firestore

const db = getFirestore();
const storage = getStorage();

// const collection

const colRef = collection(db, "Products");

try {
  formData.addEventListener("submit", (event) => {
    event.preventDefault();

    let productName = formData.productName.value;
    let productDescription = formData.productDescription.value;
    let productPrice = formData.productPrice.value;
    let productCategory = formData.productCategory.value;

    const file = productImage.files[0];

    const storageRef = ref(
      storage,
      `image/${file.name}${Math.floor(Math.random() * 12282)}`
    );

    uploadBytes(storageRef, file)
      .then((result) => {
        getDownloadURL(storageRef)
          .then((result) => {
            // console.log(result);

            addDoc(colRef, {
              productName,
              result,
              productDescription,
              productCategory,
              productPrice,
            })
              .then((result) => {
                console.log("data sent ");
                displayProducts();
                display();
              })
              .catch((err) => {
                console.log("add doc error", err);
              });
          })
          .catch((err) => {
            console.log("download error", err);
          });
      })
      .catch((err) => {
        console.log("upload error", err);
      });

    // console.log(productName)
  });
} catch (error) {}

// getting posted products

function displayProducts() {
  let productDisplay = document.getElementById("productDisplay");

  const products = [];

  getDocs(colRef)
    .then((result) => {
      result.forEach((user) => {
        let id = user.id;
        products.push({ id, ...user.data() });
      });
      try {
        productDisplay.innerHTML = "";
        products.forEach((element, i) => {
          productDisplay.innerHTML += `
          <div class="col-md-4">
            <div class="product-card">
              <img src="${element.result}" alt="Product ${i}">
              <div class="product-title">${element.productName}</div>
              <div class="product-price">$${element.productPrice}.00</div>
              <div class="product-description">${element.productDescription.slice(
                0,
                20
              )}...</div>
              <button class="btn btn-danger mt-2" id="${
                element.id
              }" >Remove</button>
            </div>
          </div>
        `;
        });
      } catch (error) {
        console.log(error.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

displayProducts();

try {
  productDisplay.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      let id = event.target.id;

      const docRef = doc(db, "Products", id);

      deleteDoc(docRef).then((result) => {
        displayProducts();
      });
    }
  });
} catch (error) {}

// AUTH
const auth = getAuth();

try {
  // Event listener for form submission
  getData.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = getData.firstName.value;
    const lastName = getData.lastName.value;
    const userName = getData.userName.value;
    const email = getData.email.value;
    const password = getData.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", user.email);

        if (user) {
          // const userId = user.uid

          const userRef = await setDoc(
            doc(db, "users", user.uid),
            {
              firstName: firstName,
              lastName: lastName,
              username: userName,
              email: email,
              admin: false,
              cart: [],
            },
            { merge: true }
          )
            .then(() => {
              console.log("User information stored successfully");
              window.location.href = "./index.html";
              // function getUserProfileData(userId)
            })
            .catch((error) => {
              console.error("Error storing user information:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  });
} catch (error) {}

// Login auth

try {
  loginUser.addEventListener("submit", (event) => {
    event.preventDefault();

    let userEmail = loginUser.userEmail.value;
    let userPassword = loginUser.userPassword.value;

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        window.location = "./HTML/HOME.html";
      })
      .catch((error) => {
        console.log("unble to login", error);
      });
  });
} catch (error) {}

//  LOGIN IN JAVASCRIPT

function getLoginUser() {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      const uid = user.uid;

      getUserProfileData(uid);
    } else {
    }
  });
}
let userData;
getLoginUser();

function getUserProfileData(userId) {
  // const userRef = db.collection("users").doc(userId);
  const docRef = doc(db, "users", userId);
  console.log(userId);

  getDoc(docRef)
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        console.log("User Profile Data:", userData);
        // Do something with the user data, e.g., display it on the page
        try {
          if (userData.admin) {
            admin.hidden = false;
          }
        } catch (error) {}
      } else {
        console.log("User data not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

function getindex1() {
  onAuthStateChanged(auth, (user) => {
    try {
      if (!user) {
        logout.hidden = true;
        profile.hidden = true;
        order.hidden = true;
        admin.hidden = true;
      } else {
        login.hidden = true;
        register.hidden = true;
        admin.hidden = true;
      }
    } catch (error) {}
  });
}
getindex1();

// logout

let logoutUser = document.getElementById("logout");

try {
  logoutUser.addEventListener("click", () => {
    signOut(auth)
      .then((result) => {})
      .catch((err) => console.log("unable to logout"));
    window.location = "./HOME.html";
  });
} catch (error) {}

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

display();

let store;

try {
  show.addEventListener("click", (event) => {
    // console.log(event.target.id)
    if (event.target.nodeName === "BUTTON") {
      console.log(myar);
      let id = event.target.id;

      if (getindex !== "") {
        if (details[getindex].cart.length === 0) {
          console.log("first time");
          let imageC = myar[id].result;
          let detailC = myar[id].productName;
          let priceC = myar[id].productPrice;
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
            if (myar[id].productName === details[getindex].cart[i].detail1) {
              alert("this item is already inside the cart");
              return;
            } else {
              let imageC = myar[id].result;
              let detailC = myar[id].productName;
              let priceC = myar[id].productPrice;
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
        alert("please login");
        window.location = "./index.html";
      }
      send();
    }
  });
} catch (error) {}

const orderNow = document.getElementById("orderNow");

try {
  orderNow.addEventListener("click", () => {
    if (getindex === "") {
      alert("please login");
    }
  });
} catch (error) {}

let cartDisplayLength = document.querySelectorAll("#cartLength");
if (getindex !== "") {
  let cartLength = "";

  cartDisplayLength.forEach((ele) => {
    ele.hidden = false;
    cartLength = ele;
  });
}
const serial = document.getElementById("serial");

function send() {
  details[getindex].cart.push(store);
  localStorage.setItem("userDetails", JSON.stringify(details));
  cartLength.innerHTML = `Cart (${details[getindex].cart.length})`;
}

function getuser() {
  let get4 = localStorage.getItem("userDetails");
  if (get4) {
    details = JSON.parse(get4);
    if (getindex !== "") {
      try {
        if (details[getindex].cart.length !== 0) {
          cartLength.innerHTML = `Cart (${details[getindex].cart.length})`;
        }
      } catch (error) {}
    }
    cartDisplay();
  } else {
  }
}
getuser();

// cart javascript

function cartDisplay() {
  if (getindex !== "") {
    try {
      if (details[getindex].cart.length !== 0) {
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
            <button class="btn btn-secondary btn-sm quantity-decrease"  id="${i}" >-</button>
            <p class='border p-2 m-2'>${ele.quantity}</p> 
            <button class="btn btn-secondary btn-sm quantity-increase" id="${i}" >+</button>
            <button class="btn btn-danger btn-sm ml-2" id="${i}">Remove</button>
          </div>
        </div>
        <hr>
        `;
        });
      } else {
        serial.innerHTML = "";
        // grandTotal.innerHTML = `Total: $00:00`;
        getuser();
        // alert()
      }
    } catch (error) {}
  }
  grand();
}
cartDisplay();

try {
  serial.addEventListener("click", (event) => {
    let id = event.target.id;

    if (event.target.textContent === "Remove") {
      details[getindex].cart.splice(id, 1);

      localStorage.setItem("userDetails", JSON.stringify(details));
      getuser();
      grand();
    } else if (event.target.textContent === "+") {
      let newQuantity = ++details[getindex].cart[id].quantity;
      details[getindex].cart[id].total =
        details[getindex].cart[id].price1 * newQuantity;
      localStorage.setItem("userDetails", JSON.stringify(details));
      cartDisplay();

      grand();
    } else if (event.target.textContent === "-") {
      let newQuantity = --details[getindex].cart[id].quantity;
      if (newQuantity > 0) {
        details[getindex].cart[id].total =
          details[getindex].cart[id].price1 * newQuantity;
        localStorage.setItem("userDetails", JSON.stringify(details));
        cartDisplay();
        grand();
      } else {
        details[getindex].cart.splice(id, 1);

        localStorage.setItem("userDetails", JSON.stringify(details));
        getuser();
        grand();
      }
    } else {
      return;
    }
  });
} catch (error) {}

function grand() {
  let grandTotal = document.getElementById("grandTotal");

  try {
    if (getindex !== "") {
      if (details[getindex].cart.length != 0) {
        let gra = details[getindex].cart
          .map((ele, i) => {
            return Number(ele.total);
          })
          .reduce((acc, tot) => {
            return acc + tot;
          });
        grandTotal.innerHTML = `Total: $${gra.toFixed(2)}`;
      } else {
        grandTotal.innerHTML = `Total: $${total.toFixed(2)}`;
        return;
      }
    }
  } catch (error) {}
}

try {
  if (getindex) {
    log.innerHTML = details[getindex].user[0];
  }
} catch (error) {}

// CART FUNCTION

// PROFILE UPDATE

// Function to show or hide the "Scroll to Top" button

function toggleScrollButton() {
  try {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  } catch (error) {}
}

// Function to scroll to the top of the page

try {
  scrollToTopBtn.addEventListener("click", scrollToTop);
  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
} catch (error) {}

// Event listener to show/hide the button on scroll
window.onscroll = function () {
  toggleScrollButton();
};

// category sorting

try {
  showAll.addEventListener("click", display);
} catch (error) {}

try {
  sortFoods.addEventListener("click", (event) => {
    let sort = event.target.textContent.trim();
    console.log(sort);

    let display2 = document.getElementById("show");
    myar = [];
    getDocs(colRef).then((result) => {
      result.forEach((user) => {
        let id = user.id;
        myar.push({ id, ...user.data() });
      });

      if (sort === "All") {
        display();
      } else {
        let newAr = myar.filter((ele) => ele.productCategory === sort);
        try {
          display2.innerHTML = "";

          newAr.forEach((element, i) => {
            display2.innerHTML += `
                <div class="col-md-4">
                  <div class="product-card">
                    <img src="${element.result}" alt="Product ${i}">
                    <div class="product-title">${element.productName}</div>
                    <div class="product-price">$${element.productPrice}.00</div>
                    <div class="product-description">${element.productDescription}</div>
                    <button class="btn btn-add-to-cart" id="${i}">Add to Cart</button>
                  </div>
                </div>
              `;
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  });
} catch (error) {}

function display() {
  let display2 = document.getElementById("show");
  myar = [];
  getDocs(colRef)
    .then((result) => {
      loadingSpinner.style.display = "none";
      result.forEach((user) => {
        let id = user.id;
        myar.push({ id, ...user.data() });
      });

      try {
        display2.innerHTML = "";

        myar.forEach((element, i) => {
          display2.innerHTML += `
            <div class="col-md-4">
              <div class="product-card">
                <img src="${element.result}" alt="Product ${i}">
                <div class="product-title">${element.productName}</div>
                <div class="product-price">$${element.productPrice}.00</div>
                <div class="product-description">${element.productDescription}</div>
                <button class="btn btn-add-to-cart" id="${i}">Add to Cart</button>
              </div>
            </div>
          `;
        });
      } catch (error) {
        console.log(error.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
