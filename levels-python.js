// Python Levels config for Bug Fixing Simulator
// Difficulty: Easy (1-7), Medium (8-14), Hard (15-20)

const PYTHON_LEVELS = [
  // ===== EASY LEVELS (1-7) =====
  {
    id: 1,
    title: "Missing Colon",
    description: "Python requires a colon at the end of function definitions, if statements, loops, etc.",
    buggyCode: `def greet()
    print("Hello")`,
    correctCode: `def greet():
    print("Hello")`,
    hints: [
      "Look at the function definition line",
      "Add a colon after the parentheses",
      "def greet():"
    ],
  },
  {
    id: 2,
    title: "Wrong Indentation",
    description: "Python uses indentation to define code blocks. The print statement should be indented.",
    buggyCode: `def greet():
print("Hello")`,
    correctCode: `def greet():
    print("Hello")`,
    hints: [
      "Check the indentation of the print statement",
      "Add 4 spaces before print",
      "Code inside functions must be indented"
    ],
  },
  {
    id: 3,
    title: "Missing Quotes",
    description: "String values must be wrapped in quotes. The name needs quotes around it.",
    buggyCode: `name = John`,
    correctCode: `name = "John"`,
    hints: [
      "Strings need quotes around them",
      "Add quotes around John",
      "Use 'John' or \"John\""
    ],
  },
  {
    id: 4,
    title: "Wrong Print Syntax",
    description: "In Python 3, print is a function and requires parentheses.",
    buggyCode: `print "Hello World"`,
    correctCode: `print("Hello World")`,
    hints: [
      "print requires parentheses in Python 3",
      "Add parentheses around the string",
      "print(\"Hello World\")"
    ],
  },
  {
    id: 5,
    title: "Wrong Boolean Value",
    description: "Boolean values in Python are capitalized. 'true' should be 'True'.",
    buggyCode: `flag = true`,
    correctCode: `flag = True`,
    hints: [
      "Boolean values are capitalized in Python",
      "Change true to True",
      "Use True or False with capital letters"
    ],
  },
  {
    id: 6,
    title: "Incorrect List Index",
    description: "Lists are zero-indexed. The first element is at index 0, not 1.",
    buggyCode: `first = items[1]`,
    correctCode: `first = items[0]`,
    hints: [
      "Lists start at index 0",
      "The first element is at position 0",
      "Change 1 to 0"
    ],
  },
  {
    id: 7,
    title: "Variable Name Typo",
    description: "Variable names must match exactly. 'mesage' is misspelled - it should be 'message'.",
    buggyCode: `mesage = "Hello"
print(message)`,
    correctCode: `message = "Hello"
print(message)`,
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
    description: "Use == for comparison, not =. Single = is for assignment only.",
    buggyCode: `if x = 5:
    print("Five")`,
    correctCode: `if x == 5:
    print("Five")`,
    hints: [
      "Single = is assignment, not comparison",
      "Use == for equality comparison",
      "Change = to =="
    ],
  },
  {
    id: 9,
    title: "Missing Return Statement",
    description: "This function should return the sum but it's missing a return statement.",
    buggyCode: `def add(a, b):
    a + b`,
    correctCode: `def add(a, b):
    return a + b`,
    hints: [
      "The function doesn't return anything",
      "Add the return keyword",
      "return a + b"
    ],
  },
  {
    id: 10,
    title: "Range Off-by-one Error",
    description: "range(5) generates numbers 0-4, not 1-5. To get 1-5, use range(1, 6).",
    buggyCode: `for i in range(5):
    print(i)  # Should print 1-5`,
    correctCode: `for i in range(1, 6):
    print(i)  # Should print 1-5`,
    hints: [
      "range(5) gives 0-4, not 1-5",
      "Use range(start, stop)",
      "range(1, 6) gives 1-5"
    ],
  },
  {
    id: 11,
    title: "Incorrect List Method",
    description: "Lists use append() to add elements, not add(). The add() method doesn't exist on lists.",
    buggyCode: `items.add(5)`,
    correctCode: `items.append(5)`,
    hints: [
      "Lists don't have an add() method",
      "Use append() to add elements",
      "Change add to append"
    ],
  },
  {
    id: 12,
    title: "Missing Parentheses in Function Call",
    description: "Function calls require parentheses. Without them, you're referencing the function, not calling it.",
    buggyCode: `result = calculate`,
    correctCode: `result = calculate()`,
    hints: [
      "You need to call the function",
      "Add parentheses to call the function",
      "Add () after function name"
    ],
  },
  {
    id: 13,
    title: "Dictionary Key Error",
    description: "Accessing a non-existent key raises KeyError. Use .get() method for safe access.",
    buggyCode: `value = data['missing_key']`,
    correctCode: `value = data.get('missing_key', None)`,
    hints: [
      "Direct key access can raise KeyError",
      "Use .get() method for safe access",
      "data.get('key', default_value)"
    ],
  },
  {
    id: 14,
    title: "String Concatenation Type Error",
    description: "You cannot concatenate strings and integers directly. Convert the integer to string first.",
    buggyCode: `message = "Age: " + 25`,
    correctCode: `message = "Age: " + str(25)`,
    hints: [
      "Cannot concatenate str and int",
      "Convert the number to string",
      "Use str() function"
    ],
  },

  // ===== HARD LEVELS (15-20) =====
  {
    id: 15,
    title: "Mutable Default Argument",
    description: "Using mutable objects as default arguments is dangerous. The list is shared across all calls.",
    buggyCode: `def add_item(item, items=[]):
    items.append(item)
    return items`,
    correctCode: `def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`,
    hints: [
      "Default mutable arguments are shared",
      "Use None as default instead",
      "Create new list inside function"
    ],
  },
  {
    id: 16,
    title: "List Modification During Iteration",
    description: "Modifying a list while iterating over it causes unexpected behavior. Create a copy first.",
    buggyCode: `for item in items:
    if item < 0:
        items.remove(item)`,
    correctCode: `for item in items[:]:
    if item < 0:
        items.remove(item)`,
    hints: [
      "Don't modify list while iterating",
      "Create a copy with items[:]",
      "Iterate over a copy of the list"
    ],
  },
  {
    id: 17,
    title: "Variable Scope Issue",
    description: "Variables defined inside if blocks are local. Use proper scope or return values.",
    buggyCode: `def get_status(score):
    if score >= 50:
        status = "Pass"
    return status`,
    correctCode: `def get_status(score):
    status = "Fail"
    if score >= 50:
        status = "Pass"
    return status`,
    hints: [
      "Variable might not be defined",
      "Initialize status before if block",
      "Set a default value first"
    ],
  },
  {
    id: 18,
    title: "Integer Division Issue",
    description: "In Python 3, / always returns float. Use // for integer division if needed.",
    buggyCode: `average = total / count  # Need integer result`,
    correctCode: `average = total // count  # Need integer result`,
    hints: [
      "/ returns float division",
      "Use // for integer division",
      "Change / to //"
    ],
  },
  {
    id: 19,
    title: "Missing Exception Handling",
    description: "File operations can fail. Always use try-except to handle potential errors gracefully.",
    buggyCode: `file = open('data.txt', 'r')
data = file.read()
file.close()`,
    correctCode: `try:
    file = open('data.txt', 'r')
    data = file.read()
    file.close()
except FileNotFoundError:
    data = ""`,
    hints: [
      "File operations can raise exceptions",
      "Use try-except block",
      "Handle FileNotFoundError"
    ],
  },
  {
    id: 20,
    title: "Generator vs List Comprehension",
    description: "Using list comprehension for large data wastes memory. Use generator expression instead.",
    buggyCode: `squares = [x**2 for x in range(1000000)]
total = sum(squares)`,
    correctCode: `squares = (x**2 for x in range(1000000))
total = sum(squares)`,
    hints: [
      "List comprehension loads all in memory",
      "Use generator with () instead of []",
      "Change [] to () for generator"
    ],
  },
];
