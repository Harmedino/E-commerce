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
let msg = document.getElementById("msg");
let cartLength = document.querySelector("#cartLength");
let grandTotal = document.getElementById("grandTotal");

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
  updateDoc,
  arrayUnion,
  arrayRemove,
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
const products = [];

function displayProducts() {
  let productDisplay = document.getElementById("productDisplay");

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
    signupButton.disabled = true;
    signupButton.textContent = 'Registering...'

    const firstName = getData.firstName.value;
    const lastName = getData.lastName.value;
    const userName = getData.userName.value;
    const email = getData.email.value;
    const password = getData.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

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
              window.location = "./index.html";
            })
            .catch((error) => {
              msg.innerHTML = "Error registering user:" + error.message;
              setTimeout(() => {
                msg.innerHTML= ''
              }, 3000);
            });
        }
      })
      .catch((error) => {
        msg.innerHTML = "Error registering user:" + error.message;
        setTimeout(() => {
          msg.innerHTML= ''
        }, 3000);
      });
    signupButton.disabled = false;
    signupButton.textContent = 'Register'
  });
} catch (error) {}

// Login auth
const loginUserData = document.getElementById("loginUserData");

try {
  loginUserData.addEventListener("submit", (event) => {
    event.preventDefault();
    loginUserBtn.disabled = true;
    loginUserBtn.textContent = 'signing in...';

    let userEmail = loginUserData.userEmail.value;
    let userPassword = loginUserData.userPassword.value;

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        window.location = "./HOME.html";
        getLoginUser();
      })
      .catch((error) => {
        msg.innerHTML = error.message;
        setTimeout(() => {
          msg.innerHTML = ''
        }, 3000);
        
      });
    loginUserBtn.disabled = false;
    loginUserBtn.textContent = 'sign in';
  });
} catch (error) {}

//  LOGIN IN JAVASCRIPT
let uid;

function getLoginUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;

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
        cartLength.innerHTML = `Cart (${userData.cart.length})`;
        // Do something with the user data, e.g., display it on the page
        try {
          if (userData.admin) {
            admin.hidden = false;
          }
        } catch (error) {}
      } else {
        signOut(auth)
          .then((result) => {
            window.location = "./index.html";
          })
          .catch((err) => console.log("unable to logout"));

        console.log("User data not found.");
      }
    })
    .catch((error) => {
      signOut(auth)
        .then((result) => {
          window.location = "./index.html";
        })
        .catch((err) => console.log("unable to logout"));

      console.error("Error fetching user data:", err);
    });
}

function getindex1() {
  onAuthStateChanged(auth, (user) => {
    try {
      if (!user) {
        login.hidden = false;
        register.hidden = false;
        
      } else {
        
        logout.hidden = false;
        profile.hidden = false;
        order.hidden = false;
      }
    } catch (error) {}
  });
}
getindex1();

// logout

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
    if (event.target.nodeName === "BUTTON") {
      if (uid) {
        let number = event.target.id;
        console.log(products);
        store = {
          image1: products[number].result,
          detail1: products[number].productDescription,
          price1: products[number].productPrice,
          total: products[number].productPrice,
          quantity: 1,
          id: products[number].id,
        };

        const cartRef = doc(db, "users", uid);

        updateDoc(cartRef, {
          cart: arrayUnion(store),
        })
          .then((result) => {
            console.log(userData.cart.length);
            cartLength.innerHTML = `Cart (${cart.length})`;
          })
          .catch((err) => {
            console.log("error updating cart");
          });
      } else {
        alert("please login");
        window.location = "./index.html";
      }
    }
  });
} catch (error) {}

const orderNow = document.getElementById("orderNow");

try {
  orderNow.addEventListener("click", () => {
    if (uid) {
      alert("please login");
    }
  });
} catch (error) {}

const serial = document.getElementById("serial");

// cart javascript
let cart;

function cartDisplay() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      const docRef = doc(db, "users", uid);

      getDoc(docRef).then((result) => {
        const usercart = result.data();
        cart = usercart.cart;
        try {
          loadingSpinner.style.display = "none";
        } catch (err) {}

        try {
          if (cart.length !== 0) {
            serial.innerHTML = "";
            cart.forEach((ele, i) => {
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
                <input value="${ele.quantity}" min='1' disabled style="width:50px;" class="p-2 mr-2 ml-2 text-center"/>
                <button class="btn btn-secondary btn-sm quantity-increase" id="${i}" >+</button>
                <button class="btn btn-danger btn-sm ml-2" id="${i}">Remove</button>
              </div>
            </div>
            <hr>
            `;
            });
          } else {
            serial.innerHTML = "NO ITEMS INSIDE THE CART";
          }
        } catch (error) {}
        cartLength.innerHTML = `Cart (${cart.length})`;
        grand();
      });
    } else {
    }
  });
}

cartDisplay();

function displaying() {
  try {
    if (cart.length !== 0) {
      serial.innerHTML = "";
      cart.map((ele, i) => {
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
          <input value="${ele.quantity}" min='1' disabled style="width:50px;" class="p-2 mr-2 ml-2 text-center"/>
          
          <button class="btn btn-secondary btn-sm quantity-increase" id="${i}" >+</button>
          <button class="btn btn-danger btn-sm ml-2" id="${i}">Remove</button>
        </div>
      </div>
      <hr>
      `;
      });
      console.log("here");
    } else {
      serial.innerHTML = "NO ITEMS INSIDE THE CART";
    }
  } catch (error) {}
}

try {
  serial.addEventListener("click", (event) => {
    let id = event.target.id;
    const update = cart[id];
    let total = [];

    if (event.target.textContent === "Remove") {
      const cartRef = doc(db, "users", uid);

      updateDoc(cartRef, {
        cart: arrayRemove(update),
      });
      cartDisplay();

      // grand();
    } else if (event.target.textContent === "+") {
      let newQuantity = ++update.quantity;
      update.total = update.price1 * newQuantity;

      for (let i = 0; cart.length > i; i++) {
        if (cart[i].id === update.id) {
          cart[id] = update;
        }
        total.push(cart[i].total);
        let grand = total.reduce((acc, cur) => acc + cur);
        grandTotal.innerHTML = `Total: $${grand}.00`;
        displaying();
      }

      // grand();
    } else if (event.target.textContent === "-") {
      let newQuantity = --update.quantity;

      if (newQuantity >= 1) {
        update.total = update.price1 * newQuantity;

        for (let i = 0; cart.length > i; i++) {
          if (cart[i].id === update.id) {
            cart[id] = update;
          }
          total.push(cart[i].total);
          let grand = total.reduce((acc, cur) => acc + cur);
          grandTotal.innerHTML = `Total: $${grand.toFixed(2)}`;
          displaying();
        }
      } else {
        newQuantity = 1;
        // alert()
        return;
      }
    } else {
      return;
    }

    setTimeout(async () => {
      const userRef = doc(db, "users", uid);
      const update = {
        cart,
      };
      console.log(update);
      try {
        await updateDoc(userRef, update, { merge: true });
        console.log("User information stored successfully");
      } catch (error) {
        console.error("Error storing user information:", error);
      }
    }, 5000);
  });
} catch (error) {}

function grand() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      const docRef = doc(db, "users", uid);

      getDoc(docRef)
        .then((result) => {
          const usercart = result.data();
          const cart = usercart.cart;
          console.log(cart);
          let gra = cart
            .map((ele, i) => {
              return Number(ele.total);
            })
            .reduce((acc, tot) => {
              return acc + tot;
            });

          grandTotal.innerHTML = `Total: $${gra.toFixed(2)}`;
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
    }
  });

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
        let reg = new RegExp(sort, "i");
        let newAr = myar.filter((ele) => reg.test(ele.productCategory));

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
        display2.innerHTML = error.mesage;
        console.log(error.message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// LOGOUT FUNCTION
let logoutUser = document.getElementById("logout");

try {
  logoutUser.addEventListener("click", () => {
    signOut(auth)
      .then((result) => {})
      .catch((err) => console.log("unable to logout"));
    window.location = "./index.html";
  });
} catch (error) {}
