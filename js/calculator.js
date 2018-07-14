//input from user
var inputs = "";
//calculator's output
var totalString = "";
//operators for validation without "."" and "-"
var operators1 = ["+","*","/","="];
//operator "." and "-" for validation
var operators2 = ["."];
var operators3 = ["-"];
//array of numbers for validation
var numbers = [0,1,2,3,4,5,6,7,8,9];
//array for splitting input string
var numberArray = [];
//1st number
var nmb1;
//2nd number
var nmb2;
//var for storing result
var result;
//vars for counting "." in numbers
var counter = 0;
var counter2 = 0;
//place for outputs
var inpt = document.getElementById("inpt-numbers1");
var inpt2 = document.getElementById("inpt-numbers2");
var inptResult = document.getElementById("result");
var line = document.getElementById("line");
//array of buttons
var btns = document.getElementsByTagName("p");





function getValue(userInput){
  //clearing previous calculation if number is entered
  if(inptResult.innerHTML != "" && inpt2.innerHTML != "" && inpt.innerHTML != "" && numbers.includes(Number(userInput)))
    clearAll();
  //clearing result if there's another operation
  else if(inptResult.innerHTML != "" && (operators1.includes(userInput) || operators3.includes(userInput))) {
    inptResult.innerHTML = "";
    line.innerHTML = "";
  }   
   //"."" or "-"" can be at the beginning
  if(operators2.includes(inputs[inputs.length-1]) && userInput === "."){
      alert("Invalid action");
    }
  else if(operators3.includes(inputs[inputs.length-1]) && userInput === "-"){
      alert("Invalid action");
    }  
  //operators from operators1 can't be at the beginning
  else if(inputs.length === 0 && (operators1.includes(userInput))) {
      alert("Invalid action");
  }
  //operator can't be after "." or "-" 
  else if((inputs[inputs.length-1] === "." || inputs[inputs.length-1] === "-") 
    && (operators1.includes(userInput) || operators3.includes(userInput))) {
      alert("Invalid action");
  }

  //can't have more than one "."" in number
  else if(userInput === ".") {
    counter2 = 0;
    counter = 0;
    if(nmb1 != null) {
      if(nmb2 != null) {
          if(nmb2.includes(".")){
          counter2++;
          }
          if(counter2>=1) {
            alert("Invalid action");
            nmb2.toString().slice(0,-1);
            }
          else inputs += userInput;
          }
      else {
        if(nmb1.includes("."))
          counter++;
        if(counter>=1) {
          alert("Invalid aciton");
          nmb1.toString().slice(0,-1);
        }
        else 
          inputs += userInput;
      }
    }
  }
  //checking is last input operator and automatically processing previous numbers 
  else if((operators1.includes(inputs[inputs.length-1]) === false) && 
    (operators2.includes(inputs[inputs.length-1]) === false) && 
    (operators3.includes(inputs[inputs.length-1]) === false)) {
    if(inputs.length!==0 && 
      (operators1.includes(userInput) || operators3.includes(userInput))) {
      inputs = eval(inputs);
      if(inputs!="Infinity") {
        inputs=inputs.toPrecision(11);
        inputs=parseFloat(inputs);
        inpt2.innerHTML = userInput;
      }
      else{
        clearAll();
        alert("Invalid action");
        }
      }
      inputs += userInput;
    }
  //checking is input a number
  else if(numbers.includes(Number(userInput))) {
      inputs += userInput;
    }
  //adding "-" after "/" or "*"
  else if(userInput==="-" && inputs[inputs.length-1] === "/" || inputs[inputs.length-1] === "*") {
    inputs += userInput;
  }
  update();
  }
  


//function for updating content
function update() {
    var hlp;
    totalString = inputs;
    numberArray = totalString.toString().split(/[\-\+\*\/]/);
    if(totalString[0] === "-") {
      hlp = 1;
      nmb1 = "-" + numberArray[1];
      for(var i=1; i<totalString.length; i++) {
        if(totalString[i] === "-")
          hlp++;
      }
      if(hlp >= 2 && totalString.includes("/"))
        nmb2 = "-" + numberArray[2];
      else if(hlp >= 2 && totalString.includes("*"))
        nmb2 = "-" + numberArray[3];
      else 
        nmb2 = numberArray[2];
    }
    else {
      nmb1 = numberArray[0];
      hlp = 0;
      for(var i=1; i<totalString.length; i++) {
        if(totalString[i] === "-")
          hlp++;
      }
      if(hlp >= 1 && (totalString.includes("/") || totalString.includes("*")))
        nmb2 = "-" + numberArray[2];
      else 
        nmb2 = numberArray[1];
    }
    inpt.innerHTML = nmb1;
    if(nmb2!=null)
      inpt2.innerHTML = inpt2.innerHTML[0] + nmb2;
  }




//function for getting result
function getTotal() {
  if(inputs.length!==0) {
    result = eval(totalString);
    totalString = result;
    if(result == "Infinity") {
      alert("Invalid action");
      clearAll();
    }
    else {
      result = result.toPrecision(13);
      result = parseFloat(result);
      inptResult.innerHTML = result;
      line.innerHTML = "______";
    }
  }
}


//functions for clearing screen
function clearAll() {
    inputs = [];
    inpt.innerHTML = "0";
    result = null;
    inptResult.innerHTML = "";
    inpt2.innerHTML = "";
    line.innerHTML = ""; 
    counter = 0;
    counter2 = 0;
}


//function for clearing screen when "rmv" is pressed
function clearRes() {
  result = null;
  inptResult.innerHTML = result;
  line.innerHTML = null;
}

//function for deleting
function dlt() {
  inputs = inputs.slice(0, -1);
      //checking is there any numbers or operators in inpt2 if not delete from inpt1
  if(inpt2.textContent.length !== 0){
    inpt2.textContent.slice(0, -1);
    if(inpt2.textContent.length === 1) {
      inpt2.innerHTML = "";
      }
    }
    else
      nmb1.slice(0, -1);
    update();
}


for(var i=0; i<btns.length; i++)
  //click event on buttons for calculating
  btns[i].addEventListener("click", function() {
    //clearing screen when "C" is clicked
    if (this.getAttribute("data-value") === "C") {
      clearAll();  
    }
    //deleting numbers when "rmv" is clicked
    else if (this.id === "rmv") {
     if(inptResult.innerHTML!="") {
        clearRes();                              
        update();
     }
     else { 
      dlt();
      }
    } 
    //getting result when "=" is clicked, there must be 2 numbers to get the result
    else if (this.getAttribute("data-value") === "=") {
      if(inpt.innerHTML.length>0 && inpt2.innerHTML.length>1) 
        getTotal();
      else
        alert("Two numbers needed to operate");
    }
    //can't have more then 11 digits
    else if(inpt.innerHTML.length >= 11) {
      alert("Max number of digits");
      inputs = inputs.slice(0, -1);
      update();
    } 
     else if(inpt2.innerHTML.length >= 11) {
      alert("Max number of digits");
    }
    //all other buttons
    else {
        getValue(this.getAttribute("data-value"));
    }
  });



 
//functions for checking which key is pressed
function checkKeyDownInput(e) {
  if(inptResult.innerHTML!="") {
    var keyCode = e.keyCode;
    if(keyCode===8) {
      clearRes();                             
      update();
    } 
  }
  else 
    dlt();
}




//events on mouse over input and result
inpt.addEventListener("mouseover", function() {
  document.addEventListener("keydown", checkKeyDownInput);
});

inpt.addEventListener("mouseout", function() {
  document.removeEventListener("keydown", checkKeyDownInput);
});

inpt2.addEventListener("mouseover", function() {
  document.addEventListener("keydown", checkKeyDownInput);
});

inpt2.addEventListener("mouseout", function() {
  document.removeEventListener("keydown", checkKeyDownInput);
});

inptResult.addEventListener("mouseover", function() {
  document.addEventListener("keydown", checkKeyDownInput);
});

inptResult.addEventListener("mouseout", function() {
  document.removeEventListener("keydown", checkKeyDownInput);
});



