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



