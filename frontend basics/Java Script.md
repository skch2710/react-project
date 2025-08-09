******************************************************************************************************
					Java Script Notes by CH Sathish Kumar
******************************************************************************************************

VS Code Usages :
---------------- 

1. Open VS Code Terminal: Terminal > New Terminal or press "Ctrl + ~"

2. Run JavaScript file : node JavaScriptEx.js


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



