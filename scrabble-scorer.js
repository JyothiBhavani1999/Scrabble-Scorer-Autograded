// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let word = '';

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function scrabbleScorer(word)
 {
   let score = 0;
   for(let i = 0; i< word.length;i++)
      {
         let letter = word[i].toLowerCase();
         score = score + newPointStructure[letter];
      }
      return score;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   word = input.question("Enter a word to score: ");
   
};

let newPointStructure =  transform(oldPointStructure);

function simpleScorer(word)
{
   return word.toLowerCase().length;
}
  
function vowelBonusScorer(word){
   let vowels = ["A","I","E","O","U"];
   let score = 0; 
   for(const letter in word){
      if(vowels.includes(word[letter].toUpperCase()))
         score = score + 3;
      else
         score = score + 1;
   }
   return score;
}

let AlgoOne = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
};

let AlgoTwo = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

let AlgoThree = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};
//const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabble];
const scoringAlgorithms = [AlgoOne, AlgoTwo, AlgoThree];

function scorerPrompt() {
console.log(`Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system`);

let algorithm = input.question('Enter 0, 1, or 2: ');
while(isNaN(algorithm) || algorithm<0 || algorithm >2 )
   {
     algorithm =  input.question("Invalid Input!!! Enter 0, 1, or 2: ");
   }

   console.log(`Score for '${word}': ${scoringAlgorithms[algorithm].scorerFunction(word)}`);
}

function transform(objectInput) {
   let lowerCaseObject = {};

   for(let points in objectInput) 
      {
         //console.log(points);
         //console.log(objectInput[points].length);
         
         for(let i =0; i< objectInput[points].length; i++)
            {
               //console.log(objectInput[points][i].toLowerCase(),",", points);
               let key = objectInput[points][i].toLowerCase();
               lowerCaseObject[key] = Number(points);
            }

      }  
      //console.log(lowerCaseObject);
      //console.log(objectInput);
      return lowerCaseObject;     

};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   newPointStructure;
  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
