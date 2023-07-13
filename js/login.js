var username = document.querySelector("#username")
var password = document.querySelector("#Password")
var show = document.querySelector("#showpass")

function fShow(){
    var type = password.getAttribute("type")
    if(type == "password"){
        password.setAttribute("type" , "text")
    }else{
        password.setAttribute("type" , "password")
    }
}

show.addEventListener("click" , fShow)

login.addEventListener("click", function reg(e) {
    e.preventDefault()
    if (username.value == "" || password.value == "") {
        alert("Please enter the data")
    } else {
        if (password.value.trim() == localStorage.getItem("password") && (username.value.trim() == localStorage.getItem("username") || username.value.trim() == localStorage.getItem("email"))) {
            setTimeout(() => location = "index.html", 1500)
        }else{
            alert("There is an error in username or password")
        }
    }
})