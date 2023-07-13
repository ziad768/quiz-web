let username = document.querySelector(".ul-login")
if(localStorage.getItem("username")){
    username.innerHTML = `
    <li class="badge border border-danger text-danger p-2 fs-5">${localStorage.getItem("username")}</li>
    <li><a class="btn btn-outline-danger " onclick = "log()">Log out</a></li>
    `
}
function log(){
    localStorage.clear()
    setTimeout(() => location = "login.html",1000)
}

let selectCategory = document.getElementById("Location-select1")
let selectDifficulty = document.getElementById("Location-select2")
let inputNumber = document.getElementById("input-number")
let quizDiv = document.querySelector(".quiz-input")
let btnStart = document.getElementById("Start")
var startorSelect = 0
//Select Category
function Category() {
        if(i > inputNumber.value){
            quizDiv.innerHTML =`
            <h2>Quiz</h2>
            <hr>
            <h2>You Scored 2 out of 4</h2>
            <div class="text-center">
                <div class="btn p-2 fs-3 btn-outline-danger my-3 text-light playAgain">play Again</div>
            </div>`
        }else{
        if (selectCategory.value == "General Knowledge") {
            getApi("json/GeneralKnowledge.json")
        } else if (selectCategory.value == "Science Nature") {
            getApi("json/ScienceNature.json")
        } else if (selectCategory.value == "Science: Computers") {
            getApi("json/Computers.json")
        } else if (selectCategory.value == "Sports") {
            getApi("json/Sports.json")
    
        } else if (selectCategory.value == "Geography") {
            getApi("json/Geography.json")
    
        } else if (selectCategory.value == "History") {
            getApi("json/History.json")
    
        } else if (selectCategory.value == "Celebrities") {
            getApi("json/Celebrities.json")
        } else if (selectCategory.value == "Animals") {
            getApi("json/animals.json")
    
        } else if (selectCategory.value == "Vehicles") {
            getApi("json/Vehicles.json")
    
        } else if (selectCategory.value == "Entertainment: Comics") {
            getApi("json/comics.json")
    
        } else if (selectCategory.value == "Science: Gadgets") {
            getApi("json/scienceGadgets.json")
    
        }
        }
    
    }

//=============================================//


function getApi(url) {
    var x = new XMLHttpRequest()
    x.open("GET", url)
    x.send()
    x.onreadystatechange = function () {
        if (x.status == 200 && x.readyState == 4) {
            if(startorSelect == 0){
                maxNum(JSON.parse(this.responseText))
            }else{
            quizTask(JSON.parse(this.responseText))
            }
        }
    }
}
// //=============================================//

// // Difficulty setting and max number in input
function quizTask(res) {
        if (selectDifficulty.value == "easy") {
            res = res[0]
            inputNumber.setAttribute("max" , res.response_code)
            res.results.length = inputNumber.value;
            buildHtml(res.results)
        } else if (selectDifficulty.value == "medium") {
            res = res[0]
        inputNumber.setAttribute("max" , res.response_code)
        res.results.length = inputNumber.value;
        buildHtml(res.results)
    } else if (selectDifficulty.value == "hard") {
        res = res[0]
        inputNumber.setAttribute("max" , res.response_code)
        res.results.length = inputNumber.value;
        buildHtml(res.results)
        
    }
}

function maxNum(res) {

    if (selectDifficulty.value == "easy") {
        res = res[0]
        inputNumber.setAttribute("max" , res.response_code)
    } else if (selectDifficulty.value == "medium") {
        res = res[0]
        inputNumber.setAttribute("max" , res.response_code)
    } else if (selectDifficulty.value == "hard") {
        res = res[0]
        inputNumber.setAttribute("max" , res.response_code)
    }
}
// //=============================================//

var i = 0 
localStorage.setItem("numberCorrects",numberCorrects = 0)
function buildHtml(numQuiz){
    if(i == inputNumber.value){
        quizDiv.innerHTML =`
        <h2>Quiz</h2>
        <hr>
        <h2>You Scored ${localStorage.getItem("numberCorrects")} out of ${inputNumber.value}</h2>
        <div class="text-center">
    <div class="btn p-2 fs-3 btn-outline-danger my-3 text-light" onclick ="var numberCorrects = 0; window.location.reload() ">play Again</div>
        </div>`
        clearTimeout(st)
    }else{
    localStorage.setItem("correct_answer" , numQuiz[i].correct_answer )
        let option = [numQuiz[i].correct_answer , ...numQuiz[i].incorrect_answers]
        option.sort()
        quizDiv.innerHTML = `
        <h2>Quiz</h2>
        <hr>
        <h4>${(i+1) + " " + numQuiz[i].question}</h4>
        <button class="btn btnHover p-2 w-100 my-3 text-start border text-light fs-4 checkbtn" onclick="check(0)" >${option[0]}</button>
        <button class="btn btnHover p-2 w-100 my-3 text-start border text-light fs-4 checkbtn" onclick="check(1)" >${option[1]}</button>
        <button class="btn btnHover p-2 w-100 my-3 text-start border text-light fs-4 checkbtn" onclick="check(2)" >${option[2]}</button>
        <button class="btn btnHover p-2 w-100 my-3 text-start border text-light fs-4 checkbtn" onclick="check(3)" >${option[3]}</button>
        <span class="border p-1 rounded ">Remaining seconds : <span id="counter">120</span></span>
        `
        i++
        var counter = document.getElementById("counter")
        var st = setInterval(function() {
            if(counter.innerHTML == 0) {
                console.log(st);
                buildHtml(numQuiz)
            }
            else{
                counter.innerHTML -=1
            }
        }, 1000)
    }
    }
    // //=============================================================//
function check(correct){
    let checkbtn = document.querySelectorAll(".checkbtn")
    if(checkbtn[correct].innerHTML == localStorage.getItem("correct_answer")){
        checkbtn[correct].style.backgroundColor = "#71f28fac"
        numberCorrects++
        localStorage.setItem("numberCorrects",numberCorrects)
    }else{
        checkbtn[correct].style.backgroundColor = "#ff0000"
        checkbtn.forEach((el)=> el.innerHTML == localStorage.getItem("correct_answer") ? el.style.backgroundColor = "#71f28fac" : "")  
    }

    setTimeout(function(){
        Category()
    } , 1000)
}

selectDifficulty.addEventListener("change" , Category)
btnStart.addEventListener("click" ,  function () {
    if(localStorage.getItem("username")){
        if(selectDifficulty.value == "select" || selectCategory == "select"){
            alert("Please select data")
        }else{
            ++startorSelect
            Category()
        }
    }else{
        location = "login.html"
    }
})
