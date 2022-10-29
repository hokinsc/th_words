import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let currentGuessFull = [];
let nextLetter = 0;
let nextIndex = 0;
let selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log("selected word: ",selectedWord)

let rightGuessString = selectedWord[0];
let translation = selectedWord[1];


var rightGuessString_cons = '';
var rightGuessString_vowel_box = '';
var rightGuessString_vowel_vert = '';
var rightGuessString_categories = '';

document.getElementById("word-reveal").textContent = rightGuessString;
document.getElementById("word-reveal").style.display = "none";


document.getElementById("translation").textContent = translation;
document.getElementById("translation").style.display = "none";




for (let char = 0; char < rightGuessString.length; char++) {
    
    
    if (rightGuessString[char].match('[\u0E00-\u0E2F]') !== null) {
        //console.log("line 14");
        rightGuessString_cons += char;
        rightGuessString_categories += 'c';
    }


    else if (rightGuessString[char].match('[\u0E40-\u0E46]') !== null || (rightGuessString[char].match('[\u0E30]') !== null) || rightGuessString[char].match('[\u0E32-\u0E33]') !== null)
    {
        rightGuessString_vowel_box += char;
        rightGuessString_categories += 'v';

    }

    else if (rightGuessString[char].match('[\u0E31-\u0E4E]') !== null) {
        rightGuessString_vowel_vert += char;
        rightGuessString_categories += 't';
        //console.log("right guess vowel vert string is: ",rightGuessString_vowel_vert);

    }

    else {
        console.log('Character ',rightGuessString[char],' not matched');
        continue;
    }
    console.log('Final Char Mapping: ',rightGuessString_categories);

}

function initKeyboard(){
    let keys = document.getElementsByName("shift");
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].style.display = "none";
        console.log("shift keys supposed to be hidden");
    }

    let nonkeys = document.getElementsByName("non-shift");
    
    for (let i = 0; i < keys.length; i++) {
        nonkeys[i].style.display = "block";
        console.log("shift keys supposed to be hidden");
    }

    //keys.style.display = "none";
    

}

initKeyboard();

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
   /*      let tone = document.createElement("div")
        tone.className = "tone-row"

        let vowel_upper = document.createElement("div")
        vowel_upper.className = "vowel-row-upper"
        console.log(vowel_upper)

        let vowel_lower = document.createElement("div")
        vowel_lower.className = "vowel-row-lower"
 */
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < rightGuessString.length; j++) {
        
            console.log("About to run switch for index : ",j);
            console.log("About to run switch for character : ",rightGuessString[j]);

            switch (rightGuessString_categories[j]) {

                case 'v':
                    let box = document.createElement("div")
                    box.className = "vowel-box"
                    row.appendChild(box)
                    break;
                
                case 'c':
                    if (rightGuessString_categories[j+1] == 't' && rightGuessString_categories[j+2] == 't') {
                        let box = document.createElement("div")
                        box.className = "cons-double-top-box"
                        row.appendChild(box)
                        break;
                    }

                    else if(rightGuessString_categories[j+1] == 't') {
                        let box = document.createElement("div")
                        box.className = "cons-single-top-box"
                        row.appendChild(box)
                    }
                    
                    else {
                        let box = document.createElement("div")
                        box.className = "letter-box"
                        row.appendChild(box)
                        break;
                    }
                
                case 't':
                    break;

                
            }

        }



        //board.appendChild(vowel_upper)

        board.appendChild(row)
    }
}

initBoard()

document.addEventListener("keydown", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Shift") {
        toggleShift()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match('[\u0E00-\u0E7F]')
    
    if (!found || found.length > 1) {
        //console.log("found length is: ",found.length);
        return
    } else {
        insertLetter(pressedKey)
    }
})

function toggleShift() {
    //console.log("first row diaply: ");
    let firstRow = document.getElementsByName("non-shift");
    //console.log(firstRow[0].display);

    if (firstRow[0].style.display === "none") {
        
        let shiftkeys = document.getElementsByName("shift");
    
        for (let i = 0; i < shiftkeys.length; i++) {
            shiftkeys[i].style.display = "none";
            
        }
        //console.log("shift keys supposed to be hidden");

        let keys = document.getElementsByName("non-shift");
    
        for (let i = 0; i < keys.length; i++) {
            keys[i].style.display = "block";
            
        }
        //("non shift keys supposed to be shown");


    }

    else {
        //console.log("else function run")
        let shiftkeys = document.getElementsByName("shift");
    
        for (let i = 0; i < shiftkeys.length; i++) {
            shiftkeys[i].style.display = "block";
            
        }
        //console.log("shift keys supposed to be shown");

        let keys = document.getElementsByName("non-shift");
    
        for (let i = 0; i < keys.length; i++) {
            keys[i].style.display = "none";
            
        }
        //console.log("shift keys supposed to be hidden");

    }
}

function insertLetter (pressedKey) {
    if (nextLetter === rightGuessString.length) {
        return
    }
    //pressedKey = pressedKey.toLowerCase()
    console.log("insert letter fired");
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    console.log("Current class list at row 253:",box.className)
    //animateCSS(box, "pulse")
    box.textContent += pressedKey
    //box.classList.add("filled-box")
    
    console.log("Current class list at row 257:",box.className)

    //nextIndex += 1;

    if( box.className === "letter-box") {
        nextLetter +=1;
        nextIndex = 0;
        console.log("261 run")
        currentGuess.push(pressedKey);
        currentGuessFull.push(pressedKey);
    }

    else if (box.className === "cons-double-top-box" && nextIndex === 0)
    {
        nextIndex +=1;
        currentGuessFull.push(pressedKey);
        currentGuess.push(pressedKey);
    }

    else if (box.className === "cons-double-top-box" && nextIndex < 3)
    {
        nextIndex +=1;
        currentGuessFull.push(pressedKey);
    }

    else if (box.className === "cons-double-top-box" && nextIndex === 3)
    {
        nextLetter +=1;
        nextIndex = 0;
        //currentGuess.push(pressedKey);
        currentGuessFull.push(pressedKey);
    }

    else if (box.className === "cons-single-top-box" && nextIndex === 0)
    {
        nextIndex +=1;
        currentGuessFull.push(pressedKey);
        currentGuess.push(pressedKey);
    }
    
/*     else if (box.className === "cons-single-top-box" && nextIndex < 2)
    {
        nextIndex +=1;
        currentGuessFull.push(pressedKey);
    } */

    else if (box.className === "cons-single-top-box" && nextIndex > 0)
    {
        nextLetter +=1;
        nextIndex = 0;
        //console.log("line 288")
        //currentGuess.push(pressedKey);
        currentGuessFull.push(pressedKey);
    }

    else if (box.className === "vowel-box")
    {
        nextLetter +=1;
        nextIndex = 0;
        currentGuess.push(pressedKey);
        currentGuessFull.push(pressedKey);
        //box.classList.add("vowel-box")
        //console.log("vowel box supposed to be added")
    }

    console.log("Next letter is: ",nextLetter);
    console.log("Next index is: ",nextIndex);
    console.log("Current Guess String: ",currentGuess);
    console.log("Current Guess FULL String: ",currentGuessFull);

    let rowCheck = document.getElementsByName("non-shift");
    if (rowCheck[0].style.display === "none")
    {toggleShift()
    }
    else {
        return;
    }

    
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    console.log("delete letter function started")
    if (nextIndex > 0) {
        let box = row.children[nextLetter]
        box.textContent = ""
        box.classList.remove("filled-box")
        currentGuess.pop()

        for (let i = 0; i < nextIndex; i++) {
            currentGuessFull.pop()
            console.log("one pop occured");
        }
        //nextLetter -= 1;
        nextIndex = 0;
        console.log("Current Guess String: ",currentGuess);
        console.log("Current Guess FULL String: ",currentGuessFull);
        
    }
    else {
        
        
        let box = row.children[nextLetter - 1]
        box.textContent = ""
        box.classList.remove("filled-box")
        currentGuess.pop()

        if (box.className === "cons-single-top-box") {
            currentGuessFull.pop();
            currentGuessFull.pop();
        }

        else if (box.className === "cons-double-top-box") {
            currentGuessFull.pop();
            currentGuessFull.pop();
            currentGuessFull.pop();
        }

        else {
            currentGuessFull.pop();
            
        }
        
        nextLetter -= 1;
        nextIndex = 0;
        console.log("one pop occured 350");
        console.log("Current Guess String: ",currentGuess);
        console.log("Current Guess FULL String: ",currentGuessFull);
        
        
    }

    //console.log("358 Current Guess String: ",guessString);
/*     box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1;
    nextIndex = 0; */
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)
    let boxIndex = 0;

    for (const val of currentGuessFull) {
        guessString += val
    }

    if (guessString.length != rightGuessString_categories.length) {
        toastr.error("Not enough letters, vowels or tones!")
        return
    }

/*     if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    } */

    console.log("length of right guess string is: ",rightGuessString_categories.length)
    for (let i = 0; i < rightGuessString_categories.length; i++) {
        let letterColor = ''
        let box = row.children[boxIndex]
        let letter = currentGuessFull[i]
        let boxType = box.className;
        console.log("test number and character: ",i," ",currentGuessFull[i])
        let letterPosition = rightGuess.indexOf(currentGuessFull[i],i)
        // is letter in the correct guess
        
        if (rightGuessString_categories[i] === "t")
        {
            console.log("skipped because tone or vowel on top")
            continue;
            
        }

        else {
        switch (boxType) {
            case "vowel-box":
                console.log("vowel box tested")
                if (letterPosition === -1) {
                    letterColor = 'grey'
                }
                else if (currentGuessFull[i] === rightGuess[i]){
                    letterColor = 'green'
                }
                
                else {
                    
                    if (rightGuess.indexOf(currentGuessFull[i],i+1) !== letterPosition) {
                        letterColor = 'yellow'
                    }
                    else {
                        letterColor = 'grey';
                    }
                    
                }
                break;

            case "letter-box":
                console.log("letter box tested")
                if (letterPosition === -1) {
                    letterColor = 'grey'
                }
                else if (currentGuessFull[i] === rightGuess[i]){
                    letterColor = 'green'
                }
                else {
                    
                    if (rightGuess.indexOf(currentGuessFull[i],i+1) !== letterPosition) {
                        letterColor = 'yellow'
                    }
                    else {
                        letterColor = 'grey';
                    }
                    
                }
                break;

            case "cons-single-top-box":
                console.log("cons single box tested")
                if (letterPosition === -1) {
                    letterColor = 'grey'
                }
                else if (currentGuessFull[i] === rightGuess[i]){
                    
                    if (currentGuessFull[i+1] === rightGuess[i+1]) {
                        letterColor = 'green';
                    }
                    else {
                        letterColor = 'lightblue'
                    }
                    
                }
                else {
                    
                    if (rightGuess.indexOf(currentGuessFull[i],i+1) !== letterPosition) {
                        letterColor = 'yellow'
                    }
                    else {
                        letterColor = 'grey';
                    }
                    
                }
                break;

            case "cons-double-top-box":
                console.log("cons double box tested")
                if (letterPosition === -1) {
                    letterColor = 'grey'
                }
                else if (currentGuessFull[i] === rightGuess[i]){
                    
                    if (currentGuessFull[i+1] === rightGuess[i+1] && currentGuessFull[i+2] === rightGuess[i+2]) {
                        letterColor = 'green';
                    }
                    else {
                        letterColor = 'lightblue'
                    }
                    
                }
                else {
                    
                    if (rightGuess.indexOf(currentGuessFull[i],i+1) !== letterPosition) {
                        letterColor = 'yellow'
                    }
                    else {
                        letterColor = 'grey';
                    }
                    
                }
                break;
            

        }
        boxIndex += 1;
        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)

    }


    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
        nextIndex = 0;
        currentGuessFull =[];

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
    for (const elem of document.getElementsByClassName("keyboard-button-vowel")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}



document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    

    
    if (!target.classList.contains("keyboard-button") && !target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "⇧") {
        key = "Shift"
        console.log("Shift pressed")
    }

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keydown", {'key': key}))
})

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.getElementById("myCheck").onclick = easyMode();
function easyMode() {
    var checkBox = document.getElementById("myCheck");
    // Get the output text
    var text = document.getElementById("translation");
    console.log("easy mode execute")

  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
      console.log("easy mode enabled")
    } else {
      text.style.display = "none";
    }
}

