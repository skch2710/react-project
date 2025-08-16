******************************************************************************************************
					Java Script Notes by CH Sathish Kumar
******************************************************************************************************

VS Code Usages :
---------------- 

1. Open VS Code Terminal: Terminal > New Terminal or press "Ctrl + ~"
2. Run JavaScript file : node JavaScriptEx.js
3. 1. In VS Code, create a new file, name it with the `.html`  extension, then type `!`  and press **Tab** — it will auto-generate the basic HTML structure.
4. Recommended Naming Style for Files - Use lowercase with hyphens (kebab-case)
	JavaScript: user-login.js
	HTML: index.html , user-details.html
	CSS: user-style.css



Calling Script file in HTML:
----------------------------

To call a JavaScript file in HTML, use the `<script>` tag with the `src` attribute inside your HTML file, like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JS File Example</title>
</head>
<body>
    <h1>Hello World</h1>

    <!-- Call external JavaScript file -->
    <script src="script.js"></script>
</body>
</html>
```
`script.js` (same folder as HTML):

```javascript
console.log("JavaScript file loaded!"); //This is printed on Console network
// alert("Hello from external JS file!");

let headerMain = document.getElementsByClassName("headerMain");

console.log(headerMain);

document.querySelector(".headerMain").innerHTML = "Sathish Kumar CH";

document.getElementById("h1Id").innerHTML = "SSSSSS";
```
If you want the script to run **after** the page loads, add `defer`:

```html
<script src="script.js" defer></script>
```



Introduction to JavaScript:
---------------------------

1. **Definition** – JavaScript is a programming language used mainly for web development.
2. **Purpose** – It makes websites interactive and dynamic.
3. **Where it runs** – Runs in web browsers and also on servers (using Node.js).
4. **Type** – Lightweight, interpreted language.
5. **Model** – Single-threaded and event-driven.
6. **Features** – Dynamic typing, prototype-based, first-class functions.
7. **Usage examples** – Form validation, animations, API calls, and real-time updates.


Variables (`var`, `let`, `const`):
-----------------------------------

There are three Variables:  `var`, `let`, and `const` in JavaScript.

---

## **1. `var`**

* **Introduced in**: Original JavaScript (before ES6).
* **Scope**:

  * Function-scoped (available anywhere inside the function where declared).
  * If declared outside any function, becomes global.
* **Hoisting**: Yes — variable is hoisted and initialized as `undefined`.
* **Re-declaration**: Allowed in the same scope.
* **Re-assignment**: Allowed.
* **Best use**: Rarely used now; replaced by `let`/`const` for better control.

**Example:**

```javascript
var name = "Sathish";
var name = "Kumar"; // ✅ Allowed
console.log(name); // "Kumar"
```

---

## **2. `let`**

* **Introduced in**: ES6 (2015).
* **Scope**:

  * Block-scoped (works only within `{}` where declared).
* **Hoisting**: Yes, but in a "temporal dead zone" (can't use before declaration).
* **Re-declaration**: ❌ Not allowed in the same scope.
* **Re-assignment**: ✅ Allowed.
* **Best use**: For variables whose value will change.

**Example:**

```javascript
let age = 25;
age = 26; // ✅ Allowed
// let age = 30; ❌ Error: already declared in this scope
```

---

## **3. `const`**

* **Introduced in**: ES6 (2015).
* **Scope**: Block-scoped (same as `let`).
* **Hoisting**: Yes, but in a temporal dead zone.
* **Re-declaration**: ❌ Not allowed in the same scope.
* **Re-assignment**: ❌ Not allowed (value is constant).
* **Best use**: For values that never change (constants, config values).

**Example:**

```javascript
const PI = 3.14159;
// PI = 3.14; ❌ Error: Assignment to constant variable
```

---

## **Special Note on `const` with Objects & Arrays**

`const` only makes the **binding** constant, not the data inside; you can still change object properties or array elements.

**Example:**

```javascript
const user = { name: "Sathish" };
user.name = "Kumar"; // ✅ Allowed
console.log(user); // { name: "Kumar" }
```

---

### **Quick Comparison Table**

| Feature          | `var`    | `let`     | `const`   |
| ---------------- | -------- | --------- | --------- |
| Scope            | Function | Block     | Block     |
| Hoisting         | Yes      | Yes (TDZ) | Yes (TDZ) |
| Re-declaration   | ✅ Yes    | ❌ No      | ❌ No      |
| Re-assignment    | ✅ Yes    | ✅ Yes     | ❌ No      |
| Use in modern JS | ❌ Avoid  | ✅ Common  | ✅ Common  |


Summary Points:
---------------

1.var and let variables can be reassigned; const cannot be reassigned.
2.var is hoisted and can be accessed before declaration; let and const cannot.
3.var allows duplicate declarations; let and const do not.
4.let and const were introduced in ES6 (2015).
5.let and const have block-level scope (work only inside { }).
6.var has function scope or becomes global if declared outside a function.


### Rules for Variable Names in JavaScript :
-------------------------------------------

* Variable names can contain: **letters (a–z, A–Z), digits (0–9), underscore (\_) and dollar sign (\$)**.
* A variable **must start** with a **letter**, **underscore (\_)**, or **dollar sign (\$)** — *cannot start with a number*.
* Variable names are **case sensitive** (`name`, `Name` and `NAME` are all different).
* **Camel case** is a commonly used naming convention in JavaScript (like `firstName`, `userEmail`).


# Data Types in JavaScript :
----------------------------

JavaScript is a dynamically typed language, meaning variables can hold values of any type without explicit type declarations. Here are the main data types in JavaScript:

## Primitive Data Types (immutable)

1. **Number**: Represents both integer and floating-point numbers
   ```javascript
   let age = 25;
   let price = 99.99;
   ```

2. **String**: Represents textual data
   ```javascript
   let name = "Alice";
   let greeting = 'Hello World';
   ```

3. **Boolean**: Represents logical values `true` or `false`
   ```javascript
   let isActive = true;
   let isCompleted = false;
   ```

4. **Undefined**: A variable that has been declared but not assigned a value
   ```javascript
   let x;
   console.log(x); // undefined
   ```

5. **Null**: Represents the intentional absence of any object value
   ```javascript
   let emptyValue = null;
   ```

6. **BigInt**: Represents integers larger than 2^53 - 1
   ```javascript
   let bigNumber = 9007199254740991n;
   ```

7. **Symbol**: A unique and immutable primitive value
   ```javascript
   let sym = Symbol('description');
   ```

## Non-Primitive Data Type (mutable)

1. **Object**: Used to store collections of data and more complex entities
   ```javascript
   let person = {
     name: "John",
     age: 30
   };
   ```

   - This includes:
     - Arrays: `let colors = ["red", "green", "blue"];`
     - Functions: `function greet() { console.log("Hello!"); }`
     - Dates: `let now = new Date();`
     - Regular Expressions: `let regex = /abc/;`

## Type Checking

You can check a value's type using the `typeof` operator:
```javascript
typeof 42;          // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" (this is a known bug in JavaScript)
typeof {};          // "object"
typeof [];          // "object"
typeof function(){}; // "function"
```

## Type Conversion

JavaScript performs automatic type conversion (coercion) in certain contexts:
```javascript
let result = "5" + 2;  // "52" (string concatenation)
let sum = "5" - 2;     // 3 (numeric subtraction)
```

You can also explicitly convert types:
```javascript
Number("123");  // 123
String(123);    // "123"
Boolean(1);     // true
```


Sure! Here’s a quick and clear explanation of **comments in JavaScript**:

---

### 📝 Comments in JavaScript :
--------------------------------
JavaScript supports two types of comments:

#### 1. **Single-line Comment**

Used for short notes or to disable one line.

```javascript
// This is a single-line comment
let x = 5; // Inline comment
```

#### 2. **Multi-line Comment**

Used for longer explanations or block comments.

```javascript
/*
  This is a multi-line comment.
  It can span multiple lines.
*/
let y = 10;
```

### ✅ Why comments are used:

* To explain code (for yourself or others)
* To make code easier to read
* To temporarily disable code during testing

### ✨ Summary Points:

* `//` → single-line comment
* `/*  */` → multi-line comment
* Comments are ignored by the browser
* Help in documentation and debugging


Template Literals in JavaScript :
----------------------------------
Template literals use backticks (`) instead of single or double quotes:

const message = `Hello World`;

const user = { name: 'Bob', score: 95 };
const message = `User ${user.name} scored ${user.score} points`;



Sure! Here’s a clean summary of **Conditional Statements in JavaScript**:

---

Conditional Statements in JavaScript :
--------------------------------------

#### 1. **if statement**

Checks a condition – if true, execute the code.

```javascript
if (condition) {
   // code to run
}
```

---

#### 2. **if...else**

Runs one block if true, otherwise runs the else block.

```javascript
if (condition) {
   // code if true
} else {
   // code if false
}
```

---

#### 3. **else if**

Used for multiple conditions.

```javascript
if (condition1) {
   // code
} else if (condition2) {
   // code
} else {
   // default code
}
```

---

#### 4. **switch statement**

Used to compare one value with multiple cases.

```javascript
switch (value) {
  case 'A':
    // code
    break;
  case 'B':
    // code
    break;
  default:
    // code
}
```

---

#### 5. **Ternary Operator** (short form of if-else)

```javascript
condition ? valueIfTrue : valueIfFalse;
```

---

### Notes:

* Always use `break` in switch cases to stop fall-through.
* Ternary is good for simple decisions, not for complex logic.


Sure! Here's a simple and clear explanation of **Type Conversion in JavaScript**:

---

### Type Conversion in JavaScript :
--------------------------------------

There are two types:

#### 1. **Implicit Conversion (Type Coercion)**

JavaScript automatically converts one type to another during operations.

Examples:

```javascript
"5" + 2      // "52"   (number becomes string)
"5" - 2      // 3      (string becomes number)
true + 1     // 2
```

---

#### 2. **Explicit Conversion (Manual)**

We convert the type ourselves using functions.

##### ➤ Convert to Number:

* `Number("45")` → 45
* `parseInt("20")` → 20
* `parseFloat("3.14")` → 3.14

##### ➤ Convert to String:

* `String(123)` → "123"
* `123..toString()` → "123"

##### ➤ Convert to Boolean:

* `Boolean(1)` → true
* `Boolean(0)` → false
* `Boolean("text")` → true
* `Boolean("")` → false

---

### ✅ Truthy & Falsy Values (important for conversion)

**Falsy values in JS:**

* `0`
* `""` (empty string)
* `null`
* `undefined`
* `false`
* `NaN`

Everything else is **truthy**.

---

### Summary Points:

* Implicit = auto conversion by JS
* Explicit = manual conversion using functions
* Common conversions: Number(), String(), Boolean()
* Know the falsy values!


Sure! Here's a clean and simple list of all the **Loops in JavaScript**, with short explanations:

---

### Types of Loops in JavaScript:
---------------------------------

#### 1. **for loop**

Used when you know how many times to run.

```javascript
for (let i = 0; i < 5; i++) {
  // code
}
```

---

#### 2. **while loop**

Runs as long as the condition is true.

```javascript
while (condition) {
  // code
}
```

---

#### 3. **do...while loop**

Runs the code at least once before checking the condition.

```javascript
do {
  // code
} while (condition);
```

---

#### 4. **for...of loop**

Used to iterate over arrays or iterable objects (gives values).

```javascript
for (const item of array) {
  console.log(item);
}
```

---

#### 5. **for...in loop**

Used to loop over object keys or array indexes.

```javascript
for (const key in object) {
  console.log(key, object[key]);
}
```

---

#### 6. **forEach loop** (array method)

Works only for arrays.

```javascript
array.forEach((value, index) => {
  console.log(value);
});
```

---

### ✅ Summary Points:

* `for` → traditional loop with counter
* `while` → runs while condition true
* `do...while` → runs at least once
* `for...of` → values of an array
* `for...in` → keys of an object or index of array
* `forEach` → array iteration (callback function)



### Arrays in JavaScript :
---------------------------

An **array** is a special variable that can hold **multiple values** in a single variable.

```javascript
let arr = [10, 20, 30, 40];
```

### 👉 Key Points:

* Arrays are written using **square brackets** `[]`

* The values inside are called **elements**

* JavaScript arrays can store **different data types** in one array

  ```javascript
  let mix = [1, "hello", true, null];
  ```

* Elements are accessed using **index numbers** (starting from 0)

  ```javascript
  console.log(arr[0]); // 10
  ```

### ✅ Common Array Methods:

| Method name  | Description                        |
| ------------ | ---------------------------------- |
| `push()`     | Add element at the **end**         |
| `pop()`      | Removes element from the **end**   |
| `shift()`    | Removes element from the **start** |
| `unshift()`  | Add element at the **start**       |
| `length`     | Returns total number of elements   |
| `forEach()`  | Loop through each element          |
| `includes()` | Check if value exists in array     |
| `indexOf()`  | Find the index of a value          |
| `join()`     | Join array into a string           |
| `slice()`    | Copy a portion of array            |
| `splice()`   | Add/remove elements inside array   |

---

### Example:

```javascript
let fruits = ["apple", "banana", "orange"];

fruits.push("mango"); // add at end
console.log(fruits); // ["apple", "banana", "orange", "mango"]

fruits.pop(); // remove last
console.log(fruits); // ["apple", "banana", "orange"]

console.log(fruits.length); // 3
```


Map in JavaScript :
-------------------

What is a Map in JavaScript?
A Map is a collection of key-value pairs where keys can be any data type, and it maintains the insertion order of the keys.

Creating a Map:
1. Using Map constructor:
   const myMap = new Map([
     ['a', 1],
     ['b', 2]
   ]);

2. Dynamically:
   const myMap = new Map();
   myMap.set('a', 1);
   myMap.set('b', 2);

Map Methods:

1. set(key, value)
   - Adds or updates a key-value pair.
   - Returns the map itself.
   Example:
   myMap.set('c', 3);

2. get(key)
   - Returns the value for the specified key.
   Example:
   myMap.get('a'); // 1

3. delete(key)
   - Deletes the key-value pair by key.
   - Returns true if the key existed, else false.
   Example:
   myMap.delete('b');

4. has(key)
   - Returns true if the map contains the key.
   Example:
   myMap.has('a'); // true

5. clear()
   - Removes all key-value pairs.
   Example:
   myMap.clear();

6. forEach(callback)
   - Iterates through each key-value pair.
   Example:
   myMap.forEach((value, key) => {
     console.log(key, value);
   });

7. values()
   - Returns an iterator of values.
   Example:
   for (let val of myMap.values()) {
     console.log(val);
   }

8. keys()
   - Returns an iterator of keys.
   Example:
   for (let key of myMap.keys()) {
     console.log(key);
   }

9. entries()
   - Returns an iterator of [key, value] pairs.
   Example:
   for (let [key, val] of myMap.entries()) {
     console.log(key, val);
   }

Map Property:

1. size
   - Returns the number of key-value pairs.
   Example:
   myMap.size;

Convert an object array to a Map:

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

const userMap = new Map(users.map(user => [user.id, user]));

console.log(userMap.get(1)); // Output: { id: 1, name: 'John' }






