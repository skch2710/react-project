let person = {
    name: "John",
    age: 30,
    city: "New York"
};
console.log(person);

let sentence = `My name is ${person.name}, I am ${person.age} years old and I live in "${person.city}".`;
console.log(sentence);

document.writeln(sentence);

/*
let numbers = prompt("Enter numbers separated by commas:");
let numbersArray = numbers.split(",").map(Number);
console.log(numbersArray);

document.writeln("You entered the numbers: " + numbersArray.join(", "));
*/

// Array of names and ForEach loop
let names = ["Alice", "Bob", "Charlie"];

for (key in person) {
    console.log(`Key: ${key}, Value: ${person[key]}`);
}

const KEY_NAME = "name";

console.log(`Key Name: ${person[KEY_NAME]}`);
console.log(`Key Name: ${person.name}`);

Object.entries(person).forEach(([key, value]) => {
  if (key === KEY_NAME) {
    console.log(`Key: ${key}, Value: ${value}`);
  }
});

names.forEach((name, index) => {
  console.log(`Index and Name :  ${index}, ${name}`);
});

for (let i = 0; i < names.length; i++) {
    console.log(`Index and Name :  ${i}, ${names[i]}`);
}

for (let i = 0; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(`Even Number: ${i}`);
  }
}

names.push("David"); // Adding a new name to the array
names.unshift("Eve"); // Adding a new name to the beginning of the array
console.log(names);
names.pop(); // Removing the last name from the array
console.log(names);
names.shift(); // Removing the first name from the array

console.log(names);

names.splice(1, 1); // Removing the second name from the array
console.log(names);

/* Functions Concept */

// Function Declaration
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("Alice");

// Function Expression
let farewell = function(name) {
    console.log(`Goodbye, ${name}!`);
};

// Function Invocation
farewell("Alice");

//Arrow Function
let sayHi = (name) => {
    console.log(`Hi, ${name}!`);
};

sayHi("Alice");


let salaries = [3000, 4000, 5000, 6000];

salaries.forEach((salary, index) => {
    console.log(`Salary of employee ${index + 1}: ${salary}`);
});

salaries.forEach((salary) => {
    console.log(`Salary of employee : ${salary}`);
});

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