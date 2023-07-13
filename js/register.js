var username = document.querySelector("#username")
var password = document.querySelector("#Password")
var rPassword = document.querySelector("#rp")
var email = document.querySelector("#email")
var sign = document.querySelector("#sign")

sign.addEventListener("click" , function reg(e){
    e.preventDefault()
    if(username.value == ""|| password.value == "" ||rPassword.value == "" ||email.value == ""){
        alert("Please enter the data")
    }else{
        localStorage.setItem("username", username.value.trim())
        localStorage.setItem("email" , email.value.trim())
        if(password.value  == rPassword.value){
        localStorage.setItem("password", password.value.trim())
        }
        setTimeout(() => location = "login.html",1500)
    }
})