// Levels config for Bug Fixing Simulator
// Difficulty: Easy (1-7), Medium (8-14), Hard (15-20)

const LEVELS = [
  // ===== EASY LEVELS (1-7) =====
  {
    id: 1,
    title: "Missing Semicolon",
    description: "JavaScript statements should end with semicolons. This code is missing semicolons at the end of each line.",
    buggyCode: `const x = 5
const y = 10`,
    correctCode: `const x = 5;
const y = 10;`,
    hints: [
      "Look at the end of each line",
      "Add semicolons after statements",
      "Place ; at the end of each line"
    ],
  },
  {
    id: 2,
    title: "Missing Quotes",
    description: "String values must be wrapped in quotes. The name 'John' needs quotes around it.",
    buggyCode: `const name = John;`,
    correctCode: `const name = 'John';`,
    hints: [
      "Strings need quotes around them",
      "Add quotes around John",
      "Use 'John' or \"John\""
    ],
  },
  {
    id: 3,
    title: "Wrong Operator",
    description: "This code should calculate the difference between two numbers, but it's using the wrong operator.",
    buggyCode: `const diff = a + b;`,
    correctCode: `const diff = a - b;`,
    hints: [
      "Check the operator for subtraction",
      "Use - instead of +",
      "Change + to -"
    ],
  },
  {
    id: 4,
    title: "Missing Return Statement",
    description: "This function is supposed to return the sum but it's missing a return statement. Add 'return' before the calculation.",
    buggyCode: `function getSum(a, b) {
  a + b;
}`,
    correctCode: `function getSum(a, b) {
  return a + b;
}`,
    hints: [
      "The function doesn't return anything",
      "Add the return keyword",
      "return a + b;"
    ],
  },
  {
    id: 5,
    title: "Wrong Boolean Value",
    description: "Boolean values in JavaScript are lowercase. 'True' should be 'true'.",
    buggyCode: `const flag = True;`,
    correctCode: `const flag = true;`,
    hints: [
      "Boolean values are lowercase in JavaScript",
      "Change True to true",
      "Use lowercase: true or false"
    ],
  },
  {
    id: 6,
    title: "Incorrect Index",
    description: "Arrays are zero-indexed. The first element is at index 0, not 1.",
    buggyCode: `const first = arr[1];`,
    correctCode: `const first = arr[0];`,
    hints: [
      "Arrays start at index 0",
      "The first element is at position 0",
      "Change 1 to 0"
    ],
  },
  {
    id: 7,
    title: "Variable Name Typo",
    description: "Variable names must match exactly. 'mesage' is misspelled - it should be 'message'.",
    buggyCode: `const mesage = 'Hello';
console.log(message);`,
    correctCode: `const message = 'Hello';
console.log(message);`,
    hints: [
      "Check the spelling carefully",
      "The variable name has a typo",
      "mesage should be message"
    ],
  },

  // ===== MEDIUM LEVELS (8-14) =====
  {
    id: 8,
    title: "Assignment vs Equality",
    description: "This code uses assignment (=) instead of comparison (===) in the if condition. This always sets isReady to true and executes the block.",
    buggyCode: `if (isReady = true) {
  launch();
}`,
    correctCode: `if (isReady === true) {
  launch();
}`,
    hints: [
      "Single = is assignment, not comparison",
      "Use === for strict equality comparison",
      "Change = to ==="
    ],
  },
  {
    id: 9,
    title: "Missing Parentheses",
    description: "Function calls require parentheses. Without them, you're referencing the function, not calling it.",
    buggyCode: `const result = calculate;`,
    correctCode: `const result = calculate();`,
    hints: [
      "You need to call the function",
      "Add parentheses to call the function",
      "Add () after function name"
    ],
  },
  {
    id: 10,
    title: "Off-by-one Error",
    description: "This loop is supposed to sum all elements in an array, but it's missing the last element. The condition stops one element too early.",
    buggyCode: `for (let i = 0; i < arr.length - 1; i++) {
  sum += arr[i];
}`,
    correctCode: `for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}`,
    hints: [
      "Look at the loop condition carefully",
      "The condition should be i < arr.length",
      "Remove the '- 1' from the condition"
    ],
  },
  {
    id: 11,
    title: "Incorrect Method Call",
    description: "Arrays use push() to add elements, not add(). The add() method doesn't exist on arrays.",
    buggyCode: `arr.add(item);`,
    correctCode: `arr.push(item);`,
    hints: [
      "Arrays don't have an add() method",
      "Use push() to add elements",
      "Change add to push"
    ],
  },
  {
    id: 12,
    title: "Missing Curly Braces",
    description: "Multi-line blocks need curly braces. Without them, only the first line is part of the if statement.",
    buggyCode: `if (condition)
  doThis();
  doThat();`,
    correctCode: `if (condition) {
  doThis();
  doThat();
}`,
    hints: [
      "Add curly braces for multi-line blocks",
      "Wrap both statements in { }",
      "if (condition) { ... }"
    ],
  },
  {
    id: 13,
    title: "Missing Comma in Object",
    description: "Object properties need commas between them. Without commas, you'll get a syntax error.",
    buggyCode: `const obj = {
  name: 'John'
  age: 30
};`,
    correctCode: `const obj = {
  name: 'John',
  age: 30
};`,
    hints: [
      "Object properties need commas",
      "Add comma after first property",
      "name: 'John',"
    ],
  },
  {
    id: 14,
    title: "Undefined Variable",
    description: "Using a variable before declaring it causes a ReferenceError. Always declare variables before use.",
    buggyCode: `console.log(message);`,
    correctCode: `const message = 'Hello';
console.log(message);`,
    hints: [
      "The variable needs to be declared first",
      "Add const message = 'Hello';",
      "Declare before using"
    ],
  },

  // ===== HARD LEVELS (15-20) =====
  {
    id: 15,
    title: "Null Reference Error",
    description: "Accessing properties on potentially null/undefined objects causes crashes. Use optional chaining (?.) to safely access nested properties.",
    buggyCode: `const len = user.name.length;`,
    correctCode: `const len = user.name?.length ?? 0;`,
    hints: [
      "What if user or user.name is null?",
      "Use optional chaining operator ?.",
      "Add a fallback value with ??"
    ],
  },
  {
    id: 16,
    title: "Array Mutation Bug",
    description: "The sort() method mutates the original array. To avoid side effects, create a copy first using the spread operator or slice().",
    buggyCode: `const sorted = arr.sort();`,
    correctCode: `const sorted = [...arr].sort();`,
    hints: [
      "sort() modifies the original array",
      "Create a copy before sorting",
      "Use spread operator [...arr] to copy"
    ],
  },
  {
    id: 17,
    title: "Closure Variable Bug",
    description: "Using var in a loop creates a single variable shared across all iterations. Use let to create a new variable for each iteration.",
    buggyCode: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    correctCode: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    hints: [
      "var is function-scoped, not block-scoped",
      "Use let instead of var in loops",
      "Change var to let"
    ],
  },
  {
    id: 18,
    title: "Missing Break in Switch",
    description: "Without break statements, switch cases fall through to the next case. Add break after each case to prevent unintended execution.",
    buggyCode: `switch (day) {
  case 'Mon':
    console.log('Monday');
  case 'Tue':
    console.log('Tuesday');
}`,
    correctCode: `switch (day) {
  case 'Mon':
    console.log('Monday');
    break;
  case 'Tue':
    console.log('Tuesday');
    break;
}`,
    hints: [
      "Switch cases fall through without break",
      "Add break after each case",
      "break; after each console.log"
    ],
  },
  {
    id: 19,
    title: "Infinite Loop Bug",
    description: "The loop counter never increments, causing an infinite loop. Always ensure loop variables are updated.",
    buggyCode: `for (let i = 0; i < 10;) {
  console.log(i);
}`,
    correctCode: `for (let i = 0; i < 10; i++) {
  console.log(i);
}`,
    hints: [
      "The loop variable never changes",
      "Add i++ to increment the counter",
      "for (let i = 0; i < 10; i++)"
    ],
  },
  {
    id: 20,
    title: "Complex Nested Callback Hell",
    description: "Deeply nested callbacks are hard to read and maintain. Use async/await or Promises to flatten the structure.",
    buggyCode: `getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      console.log(c);
    });
  });
});`,
    correctCode: `async function fetchData() {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getMoreData(b);
  console.log(c);
}`,
    hints: [
      "Nested callbacks create 'callback hell'",
      "Use async/await to flatten the code",
      "Convert to async function with await"
    ],
  },
];
