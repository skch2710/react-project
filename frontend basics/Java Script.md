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
5. Extensions for VS Code 
	a. Live Server
	b. ES7+ React/Redux/React-Native snippets
	c. Prettier - Code formatter
	



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


### Functions :
-----------------

In **JavaScript**, functions are blocks of reusable code that perform a specific task.

---

### 🔑 Ways to Declare Functions:

1. **Function Declaration**

   ```js
   function greet(name) {
     return `Hello, ${name}`;
   }
   console.log(greet("Sathish")); // Hello, Sathish
   ```

2. **Function Expression**
   (Assigning a function to a variable)

   ```js
   const greet = function(name) {
     return `Hello, ${name}`;
   };
   console.log(greet("Kumar"));
   ```

3. **Arrow Functions (ES6)**
   Shorter syntax, no own `this`.

   ```js
   const greet = (name) => `Hello, ${name}`; //Single Line
   
   //Multiple Lines
   const greet = (name) => {
		return `Hello, ${name}`;
   };
   
   console.log(greet("CH"));
   ```

4. **Anonymous Functions**
   Functions without a name (often used as callbacks).

   ```js
   setTimeout(function() {
     console.log("This runs after 2 sec");
   }, 2000);
   ```

5. **Immediately Invoked Function Expression (IIFE)**
   Executes immediately after creation.

   ```js
   (function() {
     console.log("I run instantly!");
   })();
   ```

6. **Constructor Function (for creating objects)**

   ```js
   function Person(name, age) {
     this.name = name;
     this.age = age;
   }
   const user = new Person("Sathish", 25);
   console.log(user.name); // Sathish
   ```

7. **Generator Functions**
   Can pause and resume with `yield`.

   ```js
   function* numbers() {
     yield 1;
     yield 2;
     yield 3;
   }
   const gen = numbers();
   console.log(gen.next().value); // 1
   ```

8. **Async Functions**
   Always return a Promise; used with `await`.

   ```js
   async function fetchData() {
     return "Data received";
   }
   fetchData().then(console.log);
   ```

### 🔑 Key Points about Functions:

* Functions can be **parameters** of other functions (callbacks).
* Functions can be **returned** from other functions (higher-order functions).
* Functions form the basis of **closures** in JavaScript.



### Scope :
---------------

In **JavaScript**, scope defines where variables, functions, and objects are accessible in your code.

### 🔑 Types of Scope in JavaScript:

1. **Global Scope**

   * Variables declared outside any function/block are in global scope.
   * Accessible everywhere in the code.

   ```js
   var globalVar = "I am global";

   function test() {
     console.log(globalVar); // ✅ Accessible
   }

   test();
   console.log(globalVar); // ✅ Accessible
   ```

2. **Function Scope**

   * Variables declared inside a function are only accessible within that function.
   * Created using `var`.

   ```js
   function demo() {
     var name = "Inside Function";
     console.log(name); // ✅ Accessible here
   }

   demo();
   console.log(name); // ❌ ReferenceError
   ```

3. **Block Scope (ES6: let, const)**

   * Variables declared with `let` or `const` are limited to the block `{}` where they are defined.

   ```js
   {
     let a = 10;
     const b = 20;
     var c = 30;
   }

   console.log(c); // ✅ Accessible (var is not block scoped)
   console.log(a); // ❌ ReferenceError
   console.log(b); // ❌ ReferenceError
   ```

4. **Lexical Scope (Static Scope)**

   * Inner functions have access to variables of outer functions (scope chaining).

   ```js
   function outer() {
     let x = "outer value";
     function inner() {
       console.log(x); // ✅ Can access outer variable
     }
     inner();
   }

   outer();
   ```

5. **Module Scope (ES6 Modules)**

   * Variables/functions declared in a module are scoped to that module by default.

   ```js
   // file1.js
   const secret = "hidden";
   export const name = "Sathish";

   // file2.js
   import { name } from "./file1.js";
   console.log(name); // ✅ Accessible
   console.log(secret); // ❌ Not accessible
   ```

👉 In short:

* `var` → function scope
* `let` & `const` → block scope
* Functions → create their own scope
* Nested functions → use lexical scope


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


]**Default Parameters** and **Rest Parameters** in JavaScript:
----------------------------------------------------------------

## 🔹 Default Parameters

* Allow you to set default values for function parameters if no value (or `undefined`) is passed.

```js
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greet("Sathish"); // Hello, Sathish
greet();          // Hello, Guest
```

✅ If no argument is passed, `"Guest"` is used by default.

---

## 🔹 Rest Parameters

* Allow a function to accept an **infinite number of arguments** as an array.
* Uses the syntax `...variableName`.

```js
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(5, 10, 15, 20));  // 50
```

✅ Collects all extra arguments into an array.

---

## 🔹 Both Together

You can combine **default** and **rest** parameters in one function:

```js
function introduce(name = "Guest", ...hobbies) {
  console.log(`Name: ${name}`);
  console.log(`Hobbies: ${hobbies.join(", ")}`);
}

introduce("Sathish", "Coding", "Music", "Cricket");
/*
Name: Sathish
Hobbies: Coding, Music, Cricket
*/

introduce();
/*
Name: Guest
Hobbies:
*/
```

---

👉 In short:

* **Default Parameters** → Provide fallback values.
* **Rest Parameters** → Collect multiple arguments into an array.



### Set In JavaScript :
------------------------


In **JavaScript**, `Set` is a built-in **object** that lets you store **unique values** of any type (primitive or object).

---

## 🔹 Creating a Set

```js
const mySet = new Set([1, 2, 3, 3, 4]);
console.log(mySet); // Set(4) { 1, 2, 3, 4 }
```

✅ Duplicates are removed automatically.

---

## 🔹 Common Methods

```js
const set = new Set();

// Add values
set.add(10);
set.add(20);
set.add(10); // duplicate, ignored

// Check existence
console.log(set.has(20)); // true
console.log(set.has(30)); // false

// Delete value
set.delete(10);

// Size of Set
console.log(set.size); // 1

// Clear all values
set.clear();
console.log(set.size); // 0
```

---

## 🔹 Iterating over a Set

```js
const numbers = new Set([1, 2, 3]);

// for..of loop
for (let num of numbers) {
  console.log(num);
}

// forEach
numbers.forEach(num => console.log(num));
```

---

## 🔹 Converting Between Set and Array

```js
const arr = [1, 2, 2, 3, 4, 4];
const uniqueSet = new Set(arr);
console.log(uniqueSet); // Set { 1, 2, 3, 4 }

// Convert Set → Array
const uniqueArr = [...uniqueSet];
console.log(uniqueArr); // [1, 2, 3, 4]
```

---

## 🔹 Set Operations (using spread + filter)

JavaScript doesn’t have built-in union/intersection, but you can simulate:

```js
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);

// Union
const union = new Set([...a, ...b]);
console.log(union); // {1,2,3,4,5}

// Intersection
const intersection = new Set([...a].filter(x => b.has(x)));
console.log(intersection); // {3}

// Difference
const difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference); // {1,2}
```

---

👉 `Set` is mainly used when you want **unique values**, quick **existence checks**, or to perform **set operations** like union, intersection, and difference.

**WeakSet** (the lighter version of Set).



### Sorting in JavaScript :
---------------------------

In **JavaScript**, you can sort arrays using the built-in **`sort()`** method.
---

## 🔹 Default Sorting (as strings)

```js
const fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry"]

const nums = [100, 5, 20];
nums.sort();
console.log(nums); // [100, 20, 5] ❌ (sorted as strings)
```

⚠️ By default, `sort()` converts elements to **strings** and sorts alphabetically.

---

## 🔹 Numeric Sorting

Use a **compare function**:

```js
const numbers = [100, 5, 20];

// Ascending
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 20, 100]

// Descending
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 20, 5]
```

---

## 🔹 Sorting Strings (Case-insensitive)

```js
const names = ["Sathish", "kumar", "CH"];

names.sort((a, b) => a.localeCompare(b)); // Ascending
console.log(names); // ["CH", "Sathish", "kumar"]

names.sort((a, b) => b.localeCompare(a)); // Descending
console.log(names); // ["kumar", "Sathish", "CH"]
```

---

## 🔹 Sorting Objects (by property)

```js
const users = [
  { name: "Sathish", age: 30 },
  { name: "Kumar", age: 25 },
  { name: "CH", age: 35 }
];

// Sort by age (ascending)
users.sort((a, b) => a.age - b.age);
console.log(users);

// Sort by name (alphabetical)
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users);
```

---

## 🔹 Reverse an Array

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

---

👉 In short:

* `sort()` alone → sorts as strings.
* `sort((a,b)=>a-b)` → numbers ascending.
* `localeCompare()` → better for strings.
* Custom compare functions → sort objects.


### Objects in Java :
---------------------

Great topic 👍 — let’s break down **Objects in JavaScript** clearly.

---

## 🔹 What is an Object?

* An **object** is a collection of **key–value pairs**.
* Keys are called **properties** (or methods if the value is a function).
* Values can be primitives, arrays, functions, or other objects.

```js
const person = {
  name: "Sathish",
  age: 30,
  isDeveloper: true,
  greet: function() {
    return `Hello, I am ${this.name}`;
  }
};

console.log(person.name);      // Sathish
console.log(person.greet());   // Hello, I am Sathish
```

---

## 🔹 Creating Objects

1. **Object Literal (most common)**

   ```js
   const obj = { key: "value" };
   ```

2. **Using new Object()**

   ```js
   const obj = new Object();
   obj.key = "value";
   ```

3. **Constructor Function**

   ```js
   function Person(name, age) {
     this.name = name;
     this.age = age;
   }
   const user = new Person("Kumar", 25);
   ```

4. **Class Syntax (ES6)**

   ```js
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   const user = new Person("CH", 35);
   ```

---

## 🔹 Accessing Properties

```js
const user = { name: "Sathish", age: 30 };

console.log(user.name);    // dot notation → "Sathish"
console.log(user["age"]);  // bracket notation → 30
```

---

## 🔹 Adding / Updating / Deleting

```js
const user = { name: "Kumar" };

user.age = 25;          // add
user.name = "Sathish";  // update
delete user.age;        // delete

console.log(user); // { name: "Sathish" }
```

---

## 🔹 Useful Object Methods

```js
const user = { name: "CH", age: 35 };

console.log(Object.keys(user));   // ["name", "age"]
console.log(Object.values(user)); // ["CH", 35]
console.log(Object.entries(user));// [["name","CH"],["age",35]]
```

---

## 🔹 Copying & Merging Objects

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Shallow copy
const copy = { ...obj1 };
console.log(copy); // { a:1, b:2 }

// Merge
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a:1, b:3, c:4 }
```

---

## 🔹 Nested Objects

```js
const user = {
  name: "Sathish",
  address: {
    city: "Chennai",
    pin: 600001
  }
};

console.log(user.address.city); // Chennai
```

---

👉 In short:

* Objects store **key–value pairs**.
* You can **create, access, modify, delete** properties.
* Methods like `Object.keys`, `Object.values`, `Object.entries` help work with objects.

---

## 🔹 Object vs Map in JavaScript :
--------------------------------------


| Feature           | **Object**                                                                                                   | **Map**                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Key types**     | Keys must be `string` or `symbol`.                                                                           | Keys can be any type (`string`, `number`, `object`, function, etc.). |
| **Order of keys** | Property order is not guaranteed (though in modern JS: integer keys → ascending, strings → insertion order). | Maintains insertion order of keys.                                   |
| **Iteration**     | Needs `for...in`, `Object.keys()`, `Object.values()`, `Object.entries()`.                                    | Directly iterable with `for...of`.                                   |
| **Performance**   | Optimized for small sets of static properties.                                                               | Optimized for frequent additions/removals.                           |
| **Size**          | No direct way to know number of properties (need `Object.keys(obj).length`).                                 | Has `.size` property.                                                |
| **Prototype**     | Objects inherit from `Object.prototype` (may cause key collisions).                                          | Maps have no prototype keys (cleaner).                               |
| **Serialization** | Easily converted to JSON with `JSON.stringify()`.                                                            | Not directly serializable to JSON (need conversion).                 |

---

## 🔹 Example: Object

```js
const obj = { name: "Sathish", age: 30 };

obj.city = "Chennai";
console.log(obj); // { name: "Sathish", age: 30, city: "Chennai" }

console.log(Object.keys(obj));   // ["name", "age", "city"]
console.log(Object.values(obj)); // ["Sathish", 30, "Chennai"]
```

---

## 🔹 Example: Map

```js
const map = new Map();

map.set("name", "Sathish");
map.set(1, "Number key");
map.set({ id: 1 }, "Object key");

console.log(map.get("name"));   // "Sathish"
console.log(map.size);          // 3

// Iteration
for (let [key, value] of map) {
  console.log(key, value);
}
```

---

👉 **Quick Summary**

* Use **Object** when you need a simple structure (JSON-like, model/entity).
* Use **Map** when you need **key-value pairs with any key type**, frequent additions/removals, or guaranteed order.


### DOM (Document Object Model) in JavaScript :
------------------------------------------------

---

## 🔹 What is the DOM?

* DOM = **Document Object Model**.
* It’s a **tree-like structure** representing the HTML document.
* Each HTML element becomes a **node** (object) in the tree.
* JavaScript can use the DOM to **create, read, update, and delete** elements dynamically.

---

## 🔹 DOM Tree Example

HTML:

```html
<html>
  <body>
    <h1 id="title">Hello DOM</h1>
    <p class="msg">This is a paragraph.</p>
  </body>
</html>
```

DOM Structure (simplified):

```
Document
 └── html
     ├── head
     │   └── title
     └── body
         ├── h1 (id="heading")
         ├── p (class="para")
         ├── div (id="container")
         │   ├── p
         │   └── span
         └── a (href="#")

```

---

## 🔹 Accessing Elements

```js
// By ID
document.getElementById("title");

// By Class
document.getElementsByClassName("msg");

// By Tag
document.getElementsByTagName("p");

// Modern query selectors
document.querySelector(".msg");       // first match
document.querySelectorAll(".msg");    // all matches
```

---

## 🔹 Manipulating Content

```js
const title = document.getElementById("title");

// Change text
title.textContent = "New Title";
title.innerHTML = "<i>Italic Title</i>";

// Change style
title.style.color = "blue";
title.style.fontSize = "24px";

// Add attribute
title.setAttribute("data-id", "123");
```

---

## 🔹 Creating & Removing Elements

```js
// Create new element
const newPara = document.createElement("p");
newPara.textContent = "This is dynamically added!";
document.body.appendChild(newPara); // add to body

// Remove element
const oldPara = document.querySelector(".msg");
oldPara.remove();
```

---

## 🔹 Event Handling

```js
const btn = document.createElement("button");
btn.textContent = "Click Me";
document.body.appendChild(btn);

btn.addEventListener("click", () => {
  alert("Button was clicked!");
});
```

---

## 🔹 Traversing the DOM

```js
const body = document.body;

console.log(body.firstChild);    // First child node
console.log(body.lastChild);     // Last child node
console.log(body.children);      // All child elements
console.log(body.parentNode);    // Parent node
```

---

## 🔹 DOM vs BOM

* **DOM** → Represents HTML document structure (tags, elements, attributes).
* **BOM (Browser Object Model)** → Represents browser objects (window, navigator, history, screen).

Example:

```js
console.log(window.innerWidth); // BOM
console.log(document.title);    // DOM
```

---

👉 **In summary:**

* DOM lets JavaScript **interact with HTML** (read, update, create, delete).
* Key parts: **Access → Manipulate → Events → Traverse**.


## 🔹 Add Styles in JavaScript :

// Set style directly
document.getElementById("heading").style.color = "blue";
document.querySelector(".para").style.fontSize = "20px";

// Multiple styles
let box = document.getElementById("container");
box.style.cssText = "background: yellow; padding: 10px; border: 1px solid black;";



### JavaScript Events :
-------------------------

JavaScript events are actions or occurrences that happen in the browser, which you can respond to using JavaScript. They form the foundation of interactive web applications by allowing scripts to react to user interactions, browser activities, and other occurrences.

## Table of Contents

1. [Event Basics](#event-basics)
2. [Event Types](#event-types)
3. [Event Handling](#event-handling)
4. [Event Object](#event-object)
5. [Event Propagation](#event-propagation)
6. [Event Delegation](#event-delegation)
7. [Custom Events](#custom-events)
8. [Best Practices](#best-practices)

## Event Basics

### What are Events?
Events are signals that something has occurred in the document - user interactions (clicks, key presses), browser events (page loaded, resized), or other occurrences.

### Event Flow
Events follow a propagation path:
1. **Capturing Phase**: From window down to target element
2. **Target Phase**: At the target element
3. **Bubbling Phase**: From target element back up to window

## Event Types

### Mouse Events
- `click`: Element is clicked
- `dblclick`: Element is double-clicked
- `mousedown`: Mouse button is pressed
- `mouseup`: Mouse button is released
- `mousemove`: Mouse is moved over element
- `mouseover`: Mouse moves onto element
- `mouseout`: Mouse moves out of element
- `contextmenu`: Right-click context menu is opened

### Keyboard Events
- `keydown`: Key is pressed down
- `keyup`: Key is released
- `keypress`: Key is pressed (deprecated)

### Form Events
- `submit`: Form is submitted
- `change`: Input value changes
- `focus`: Element receives focus
- `blur`: Element loses focus
- `input`: Input value changes (immediate)
- `select`: Text is selected in input

### Window/Document Events
- `load`: Page and resources finished loading
- `DOMContentLoaded`: DOM is ready (no styles/images)
- `resize`: Window is resized
- `scroll`: Element is scrolled
- `hashchange`: URL hash changes
- `beforeunload`: Window is about to unload

### Touch Events
- `touchstart`: Touch interaction begins
- `touchmove`: Finger moves during touch
- `touchend`: Touch interaction ends
- `touchcancel`: Touch is interrupted

### Other Events
- `transitionend`: CSS transition completes
- `animationend`: CSS animation completes
- `error`: Error occurs loading resource

## Event Handling

### Inline HTML Event Handlers
```html
<button onclick="handleClick()">Click me</button>
```

### DOM Property Event Handlers
```javascript
const button = document.querySelector('button');
button.onclick = function() {
  console.log('Button clicked!');
};
```

### addEventListener() (Recommended)
```javascript
const button = document.querySelector('button');

// Basic syntax
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
});

// With options
button.addEventListener('click', handlerFunction, {
  capture: false,    // Use capturing phase
  once: true,        // Run once then remove
  passive: false     // Never call preventDefault()
});

// Named function
function handleClick(event) {
  console.log('Button clicked!');
}
button.addEventListener('click', handleClick);
```

### Removing Event Listeners
```javascript
// Must reference the same function
button.removeEventListener('click', handleClick);
```

## Event Object

When an event occurs, the browser creates an event object containing information about the event.

### Common Properties
- `type`: Event type ('click', 'keydown', etc.)
- `target`: Element that triggered the event
- `currentTarget`: Element that has the event handler
- `timeStamp`: When event occurred
- `bubbles`: Whether event bubbles
- `cancelable`: Whether event can be canceled

### Event Methods
- `preventDefault()`: Prevents default browser action
- `stopPropagation()`: Stops event from propagating
- `stopImmediatePropagation()`: Stops other handlers from executing

### Mouse Event Properties
- `clientX`, `clientY`: Coordinates relative to viewport
- `pageX`, `pageY`: Coordinates relative to document
- `button`: Which mouse button was pressed
- `altKey`, `ctrlKey`, `shiftKey`: Modifier key states

### Keyboard Event Properties
- `key`: String representation of key pressed
- `code`: Physical key code
- `keyCode`: Numeric code (deprecated)
- `repeat`: Whether key is being held down

## Event Propagation

### Event Bubbling
Events bubble up from the target element through its ancestors:
```html
<div id="parent">
  <button id="child">Click me</button>
</div>

<script>
  document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked');
  });
  
  document.getElementById('child').addEventListener('click', function() {
    console.log('Button clicked');
  });
  // Clicking button logs: "Button clicked" then "Parent clicked"
</script>
```

### Event Capturing
Events can be captured on the way down to the target:
```javascript
document.getElementById('parent').addEventListener('click', function() {
  console.log('Parent clicked');
}, true); // Use capturing phase

document.getElementById('child').addEventListener('click', function() {
  console.log('Button clicked');
});
// Clicking button logs: "Parent clicked" then "Button clicked"
```

### Stopping Propagation
```javascript
document.getElementById('child').addEventListener('click', function(event) {
  console.log('Button clicked');
  event.stopPropagation(); // Prevents bubbling to parent
});
```

## Event Delegation

Event delegation uses event bubbling to handle events at a higher level:

```html
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
  document.getElementById('myList').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      console.log('List item clicked:', event.target.textContent);
    }
  });
  
  // Add new items dynamically
  const newItem = document.createElement('li');
  newItem.textContent = 'Item 4';
  document.getElementById('myList').appendChild(newItem);
  // New item will work without adding a new event listener
</script>
```

## Custom Events

### Creating and Dispatching Custom Events
```javascript
// Create event
const myEvent = new CustomEvent('myCustomEvent', {
  detail: { // Custom data
    message: 'Hello from custom event',
    time: new Date()
  },
  bubbles: true,
  cancelable: true
});

// Listen for event
document.addEventListener('myCustomEvent', function(event) {
  console.log('Custom event received:', event.detail.message);
});

// Dispatch event
document.dispatchEvent(myEvent);
```

### Event Constructor Types
- `Event`: Basic event
- `CustomEvent`: Event with custom data
- `MouseEvent`: Mouse-related events
- `KeyboardEvent`: Keyboard-related events

## Best Practices

### 1. Use Event Delegation
```javascript
// Instead of adding listeners to each element
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// Use delegation on a common parent
document.getElementById('container').addEventListener('click', function(event) {
  if (event.target.classList.contains('item')) {
    handleClick(event);
  }
});
```

### 2. Throttle and Debounce Events
```javascript
// Throttle: Execute at most once every X milliseconds
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func.apply(this, args);
  };
}

window.addEventListener('resize', throttle(function() {
  console.log('Resize event throttled');
}, 200));

// Debounce: Execute after event stops firing for X milliseconds
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

window.addEventListener('resize', debounce(function() {
  console.log('Resize event debounced');
}, 200));
```

### 3. Use Passive Event Listeners for Performance
```javascript
// Improves scrolling performance
document.addEventListener('touchstart', function(event) {
  // Handler logic
}, { passive: true });
```

### 4. Clean Up Event Listeners
```javascript
// Remove event listeners when no longer needed
function setup() {
  const button = document.getElementById('myButton');
  button.addEventListener('click', handleClick);
  
  // Later, when cleaning up
  button.removeEventListener('click', handleClick);
}
```

### 5. Use Event Constants
```javascript
// Instead of string literals
const EVENTS = {
  CLICK: 'click',
  KEYDOWN: 'keydown',
  // ...
};

element.addEventListener(EVENTS.CLICK, handler);
```

## Browser Compatibility

Most modern event handling features work in all modern browsers. For older browsers like IE, consider:

1. Using polyfills for `addEventListener` and `removeEventListener`
2. Feature detection before using newer event APIs
3. Using a library like jQuery for cross-browser event handling

## Common Pitfalls

1. **Memory leaks**: Forgetting to remove event listeners
2. **Too many event listeners**: Performance issues with many elements
3. **Event handler conflicts**: Multiple libraries modifying events
4. **Default behavior**: Forgetting to prevent default when needed

## Conclusion

JavaScript events are fundamental to creating interactive web applications. Understanding event types, propagation, delegation, and best practices will help you write more efficient and maintainable code. Always consider performance implications and clean up event listeners when they're no longer needed.


### JavaScript String methods :
--------------------------------

// JavaScript String Methods - One File with Examples

// 1. Length
let str = "Hello World";
console.log("Length:", str.length); // 11

// 2. charAt()
console.log("charAt(1):", str.charAt(1)); // e

// 3. charCodeAt()
console.log("charCodeAt(0):", str.charCodeAt(0)); // 72 (H)

// 4. at()
console.log("at(-1):", str.at(-1)); // d

// 5. concat()
console.log("concat:", str.concat("!!!")); // Hello World!!!

// 6. includes()
console.log("includes('World'):", str.includes("World")); // true

// 7. endsWith()
console.log("endsWith('World'):", str.endsWith("World")); // true

// 8. startsWith()
console.log("startsWith('Hello'):", str.startsWith("Hello")); // true

// 9. indexOf()
console.log("indexOf('o'):", str.indexOf("o")); // 4

// 10. lastIndexOf()
console.log("lastIndexOf('o'):", str.lastIndexOf("o")); // 7

// 11. match()
console.log("match(/o/g):", str.match(/o/g)); // [ 'o', 'o' ]

// 12. matchAll()
console.log("matchAll(/o/g):", [...str.matchAll(/o/g)]);

// 13. padStart()
console.log("padStart(15, '*'):", str.padStart(15, '*'));

// 14. padEnd()
console.log("padEnd(15, '-'):", str.padEnd(15, '-'));

// 15. repeat()
console.log("repeat(3):", "Hi ".repeat(3));

// 16. replace()
console.log("replace('World','JS'):", str.replace("World", "JS"));

// 17. replaceAll()
console.log("replaceAll('o','0'):", str.replaceAll("o", "0"));

// 18. search()
console.log("search('World'):", str.search("World")); // 6

// 19. slice()
console.log("slice(0,5):", str.slice(0, 5)); // Hello

// 20. split()
console.log("split(' '):", str.split(" ")); // [ 'Hello', 'World' ]

// 21. substring()
console.log("substring(0,5):", str.substring(0, 5)); // Hello

// 22. toLowerCase()
console.log("toLowerCase():", str.toLowerCase()); // hello world

// 23. toUpperCase()
console.log("toUpperCase():", str.toUpperCase()); // HELLO WORLD

// 24. trim()
let spaced = "   JS Trim   ";
console.log("trim():", spaced.trim()); // 'JS Trim'

// 25. trimStart()
console.log("trimStart():", spaced.trimStart());

// 26. trimEnd()
console.log("trimEnd():", spaced.trimEnd());

// 27. valueOf()
console.log("valueOf():", str.valueOf());

// 28. toString()
console.log("toString():", str.toString());

// 29. localeCompare()
console.log("localeCompare('Hello'):", str.localeCompare("Hello"));

// 30. normalize()
let accented = "café";
console.log("normalize():", accented.normalize("NFD"));

// 31. fromCharCode()
console.log("fromCharCode(72,69,76,76,79):", String.fromCharCode(72,69,76,76,79)); // HELLO

// 32. raw()
console.log("String.raw`Hello\\nWorld`:", String.raw`Hello\nWorld`);

// 33. codePointAt()
console.log("codePointAt(0):", str.codePointAt(0));

// 34. fromCodePoint()
console.log("fromCodePoint(128512):", String.fromCodePoint(128512)); // 😀

// 35. startsWith() & endsWith() revisited
console.log("startsWith('He'):", str.startsWith("He"));
console.log("endsWith('ld'):", str.endsWith("ld"));


### **Error Handling in JavaScript** 📘:
---------------------------------------------

# 🛠️ Error Handling in JavaScript

JavaScript provides mechanisms to handle runtime errors gracefully, so the program doesn’t crash unexpectedly and can recover or give useful messages.

---

## 🔹 1. Types of Errors in JavaScript

1. **Syntax Errors**

   * Occur when the code violates JavaScript grammar rules.
   * Example:

     ```js
     console.log("Hello"  // Missing closing parenthesis
     ```

2. **Runtime Errors**

   * Occur while the program is running.
   * Example:

     ```js
     let x = y + 5; // ReferenceError: y is not defined
     ```

3. **Logical Errors**

   * Code runs without crashing, but gives incorrect results.
   * Example:

     ```js
     let total = 10 * 5; // intended to divide, not multiply
     ```

---

## 🔹 2. Handling Errors with `try...catch`

JavaScript provides `try...catch` to safely handle exceptions.

```js
try {
  let result = 10 / 0;
  console.log("Result:", result);

  throw new Error("Custom error message");
} catch (error) {
  console.error("Error caught:", error.message);
}
```

✔️ Code inside `try` runs normally.
✔️ If an error occurs, `catch` executes.

---

## 🔹 3. `finally` Block

* Always executes, regardless of whether an error occurred.
* Used for cleanup (e.g., closing files, releasing resources).

```js
try {
  console.log("Start process");
  throw new Error("Something went wrong!");
} catch (err) {
  console.log("Error:", err.message);
} finally {
  console.log("Process ended.");
}
```

---

## 🔹 4. Throwing Custom Errors

You can **manually throw errors** using `throw`.

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero not allowed!");
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (err) {
  console.error("Error:", err.message);
}
```

---

## 🔹 5. Error Object Properties

When an error is caught, it is represented by the **Error object**.
Common properties:

* `name` → Error type (e.g., `ReferenceError`)
* `message` → Description of the error
* `stack` → Call stack at the point error occurred

```js
try {
  JSON.parse("Invalid JSON");
} catch (err) {
  console.log("Name:", err.name);
  console.log("Message:", err.message);
  console.log("Stack:", err.stack);
}
```

---

## 🔹 6. Types of Built-in Errors

1. **EvalError** – errors related to `eval()`
2. **RangeError** – number out of range
3. **ReferenceError** – invalid variable reference
4. **SyntaxError** – code syntax issue
5. **TypeError** – invalid type operation
6. **URIError** – `encodeURI()` or `decodeURI()` issue

Example:

```js
try {
  let num = 1;
  num.toUpperCase(); // TypeError
} catch (e) {
  console.log(e.name); // "TypeError"
}
```

---

## 🔹 7. Best Practices

✅ Use `try...catch` only for risky code (e.g., network requests, parsing JSON).
✅ Avoid silent failures—log or display meaningful error messages.
✅ Use custom error classes for better handling.
✅ Validate input before executing risky operations.

---


### Regular Expressions :
----------------------------

Regular Expressions in JavaScript are powerful for pattern matching, searching, validation, and string manipulation.

Practical Examples

✅ Validate Email:

let emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
console.log(emailRegex.test("test@mail.com")); // true


✅ Validate Phone:

let phoneRegex = /^\d{10}$/;
console.log(phoneRegex.test("9876543210")); // true


✅ Extract Numbers:

let str = "Order number: 12345, amount: 678";
console.log(str.match(/\d+/g)); // ["12345", "678"]