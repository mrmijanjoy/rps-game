import readline from 'readline';
import { TableGenerator } from './tableGenerator.js';
import { MoveRules } from './moveRules.js';
import { KeyGenerator } from './keyGenerator.js';
import { HMACGenerator } from './hmacGenerator.js';

// readline 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// cmd
const args = process.argv.slice(2);

if (args.length < 3 || args.length % 2 === 0) {
  console.error("Incorrect input. Please provide an odd number of unique moves.");
  process.exit(1);
}

// Check for repeated arguments
const movesSet = new Set(args);
if (movesSet.size !== args.length) {
  console.error("Invalid input. Moves must be unique.");
  process.exit(1);
}

const moves = args;

// classes
const tableGenerator = new TableGenerator(moves);
const moveRules = new MoveRules(moves);
const keyGenerator = new KeyGenerator();
const hmacGenerator = new HMACGenerator();

// computer's move
const key = keyGenerator.generateKey();

const computerMove = moves[Math.floor(Math.random() * moves.length)];
const hmac = hmacGenerator.calculateHMAC(key, computerMove);
console.log(`HMAC: ${hmac}`);

// user move menu
const displayMenu = () => {
  console.log("Menu:");
  moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
  console.log("0 - Exit");
  console.log("? - Help");
};

// result table
const displayResultTable = () => {
  console.log("\nResult Table:");
  tableGenerator.printTable();
};

// user move
const promptUserMove = () => {
  rl.question('Enter your move: ', (input) => {
    if (input === '0') {
      console.log("Exiting...");
      rl.close();
      return;
    }

    if (input === '?') {
      displayResultTable();
      displayMenu();
      promptUserMove();
      return;
    }

    const userMoveIndex = parseInt(input, 10);

    // if wrong move given
    if (isNaN(userMoveIndex) || userMoveIndex < 1 || userMoveIndex > moves.length) {
      console.error("Invalid selection. Please enter a valid number from the menu.");
      displayMenu();
      promptUserMove();
      return;
    }

    const userMove = moves[userMoveIndex - 1];

    // winner selection
    const result = moveRules.determineWinner(userMove, computerMove);

    // results
    console.log(`User's move: ${userMove}`);
    console.log(`Computer's move: ${computerMove}`);
    console.log(`Result: ${result}`);
    console.log(`Key: ${key}`);

    // end
    rl.close();
  });
};

if (moves.length === 5) {
  displayResultTable();
}

displayMenu();
promptUserMove();
