const keys = Array.from(document.getElementsByClassName(`keys`))
const display_input = document.querySelector(`.input`);
const display_output = document.querySelector(`.output`);

let input = "";

for(let key of keys){
    const value = key.innerHTML;

    key.addEventListener(`click`, () => {
        if(value == "AC"){
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        }
        else if (value == "&lt;"){
            input = input.slice(0, -1);
            display_output.innerHTML = improveInput(input);
        }
        else if (value === "=" && value !== " "){
            let result = eval(input);
            
            input = " ";
            display_input.innerHTML = "";
            display_output.innerHTML = (result);
        }    
        else if (value == "( )"){
            if (
                input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")
                )
            {
                input += "(";
            }
                
            else if 
                (
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")
                )
            {
                input += ")";
            }

            display_input.innerHTML = improveInput(input);
        }else{
            if(ValidateInput(value)){
            input += value;
            display_input.innerHTML = (input);
            display_output.innerHTML = improveInput(input);
            }
        }
    })
}
//// suppose to check proper inputs of user
function improveInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for (let i = 0; i < inputArrayLength; i++){
        if (inputArray[i] == "*") {
            inputArray[i] ==`<button class="keys">*</button>`;
        }else if (inputArray[i] == "/") {
            inputArray[i] ==`<button class="keys">/</button>`;
        }else if (inputArray[i] == "+") {
            inputArray[i] ==`<button class="keys">+</button>`;
        }else if (inputArray[i] == "-") {
            inputArray[i] ==`<button class="keys">-</button>`;
        }else if (inputArray[i] == "( )") {
            inputArray[i] ==`<button class="keys">( )</button>`;
        // }else if (inputArray[i] == ")") {
        //     inputArray[i] ==`<button class="keys">( )</button>`;
        }else if (inputArray[i] == "%") {
            inputArray[i] ==`<button class="keys">%</button>`;
        }
    }
    return inputArray.join("");
}

//// suppose to check proper out put for the user
function improveOutput(result){
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
        output_string = output_string.split(".")[0];
    
    let outputArray = output_String.split("");

    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i>0;i -= 3){
            outputArray.splice(i,0,",");
        }
    }
    if (decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }
    return outputArray.join("");
}

function ValidateInput(value){
    let last_input = input.slice(-1);
    let operators = ["+","-","*","/"];

    if (value == "," && last_input == "."){
        return false;
    }
    if(operators.includes(value)){
        if (operators.includes(last_input)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function prepareInput(input){
    let inputArray = input.split("");

    for (let i = 0; i < inputArray.lenght; i++){
        if (inputArray[i] == "%") {
            inputArray[i] =="/100";
        }
    }
    return inputArray.join("");
}