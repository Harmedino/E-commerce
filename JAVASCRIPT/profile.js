
// Declare variables to store DOM elements
let firstnameValue = document.getElementById("firstnameValue");
let lastnameValue = document.getElementById("lastnameValue");
let usernameValue = document.getElementById("usernameValue");
let userEmailValue = document.getElementById("userEmailValue");
let phoneValue = document.getElementById("phoneValue");
let address = document.getElementById("address");
let userEmail = document.getElementById("userEmail");
let phoneNumber = document.getElementById("phoneNumber");
let uid;
let profileBody = document.getElementById('profileBody')

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

// Your web app's Firebase configuration
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
const db = getFirestore();
const auth = getAuth();


// Function to get the currently logged-in user and fetch their profile data
function getLoginUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      
      // Fetch user profile data using the UID
      getUserProfileData(uid);
    } else {
      // Handle the case when no user is logged in
    }
  });
  
}

// Call the function to get the currently logged-in user
getLoginUser();

// Function to fetch user profile data from Firestore
function getUserProfileData(userId) {
  const docRef = doc(db, "users", userId);

  getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        // Display user profile data on the page
        userEmail.innerHTML = userData.email;
        userEmail.innerHTML.toLowerCase();
        firstnameValue.value = userData.firstName;
        lastnameValue.value = userData.lastName;
        userEmailValue.value = userData.email;
        usernameValue.value = userData.username;
        phoneValue.value = userData.phoneNumber;
        address.value = userData.address;
        phoneNumber.innerHTML = userData.phoneNumber;
        loadingSpinner.style.display = "none";
        profileBody.hidden = false
      } else {
        console.log("User profile not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
    
   
}

// Add an event listener to the "Edit Profile" button
editInfo.addEventListener("click", async (event) => {
  if (editInfo.innerHTML === "Edit Profile") {
    // Enable editing mode
    editInfo.innerHTML = "Save Profile";
    firstnameValue.disabled = false;
    lastnameValue.disabled = false;
    usernameValue.disabled = false;
    phoneValue.disabled = false;
    address.disabled = false;
    userEmailValue.disabled = false;
  } else {
    // Save changes and disable editing mode

    editInfo.innerHTML = "Saving...";
    editInfo.disabled = true
    const userRef = doc(db, "users", uid);
    const updatedData = {
      phoneNumber: phoneValue.value,
      address: address.value,
    };

    try {
      await setDoc(userRef, updatedData, { merge: true });
      getUserProfileData(uid); // Fetch updated user data
      console.log("User information stored successfully");
    } catch (error) {
      console.error("Error storing user information:", error);
    }

    editInfo.innerHTML = "Edit Profile";
    editInfo.disabled = false
    firstnameValue.disabled = true;
    lastnameValue.disabled = true;
    usernameValue.disabled = true;
    phoneValue.disabled = true;
    address.disabled = true;
    userEmailValue.disabled = true;
  }
});


 