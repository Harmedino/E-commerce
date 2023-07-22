let getindex = ''
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