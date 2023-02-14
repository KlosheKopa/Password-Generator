// Assignment code here

//Array of unicode for special characters
const specialCharacters = [' ', '!', '\"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
//Array of letters
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//Returns a letter from the letter array lowercase
function getLowerLetter(){
  return letters[Math.floor(Math.random() * (letters.length + 1))];
}

//Returns a letter from the letter array uppercase
function getUpperLetter(){
  return letters[Math.floor(Math.random() * (letters.length + 1))].toUpperCase();
}

//Returns a special character from the special character array
function getSpecialCharacter(){
  return specialCharacters[Math.floor(Math.random() * (specialCharacters.length + 1))];
}

//Returns a random number from 0 to 9
function getNumber(){
  return Math.floor(Math.random() * 10);
}

// Takes a string and converts it to an array to shuffle the elements around. Copied from https://www.codespeedy.com/shuffle-characters-of-a-string-in-javascript/
function shuffle(password){
  let array = password.split('');

  array.sort(function() {
    return 0.5 - Math.random();
  })

  password = array.join('');
  
  return password;
}

//Seperate function to do the processing of calling the other functions and narrowing down the options
function generatePasswordChild(lower, upper, special, number, length){
  //Variable declarations
  let password;
  let options = [];

  //Series of ifs to add a corresponding number for the option array tied to a switch statement later on. Also adds the initial type of character upon making sure password is undefined or not to make sure there is at least one of each option
  if(lower){
    password = getLowerLetter();
    options.push(1);
  }

  if(upper){
    if(password != undefined){
      password += getUpperLetter();
    } else{
      password = getUpperLetter();
    }
    options.push(2);
  }

  if(special){
    if(password != undefined){
      password += getSpecialCharacter();
    } else{
      password = getSpecialCharacter();
    }
    options.push(3);
  }

  if(number){
    if(password != undefined){
      password += getNumber();
    } else{
      password = getNumber();
    }
    options.push(4);
  }

  //Loop that adds an additional amount of random characters of the specified types based on the options array and switch statement
  for (let i = 0; i < length - options.length; i++){
    let random = options[Math.floor(Math.random() * (options.length + 1))];
    switch (random){
      case 1:
        password += getLowerLetter();
        break;
      case 2:
        password += getUpperLetter();
        break;
      case 3:
        password += getSpecialCharacter();
        break;
      default:
        password += getNumber();
        break;
    }
  }
  return password;
}


//Parent function for generating and ultimately returning the new password
function generatePassword() {
  //Variable declarations
  let passwordLength;
  let includeUpper;
  let includeLower;
  let inludeSpecial;
  let includeNumber;
  let password;

  //Verification loop to get desired length between 8 and 128 characters long
  do {
    passwordLength = parseInt(window.prompt("How long would you like your password? Enter a number from 8 to 128:"));
  } while(passwordLength < 8 || passwordLength > 128);
  
  //Confirmation windows for all of the various options
  includeLower = window.confirm("Do you want to include lower case letters?");

  includeUpper = window.confirm("Do you want to include uppercase letters?");

  inludeSpecial = window.confirm("Do you want to include special characters?");

  includeNumber = window.confirm("Do you want to include numbers?");

  password = generatePasswordChild(includeLower, includeUpper, inludeSpecial, includeNumber, passwordLength);

  //Returns shuffled password
  return shuffle(password);
}


// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
