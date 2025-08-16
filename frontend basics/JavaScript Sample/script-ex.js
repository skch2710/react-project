let person = {
    name: "John",
    age: 30,
    city: "New York"
};
console.log(person);

let sentence = `My name is ${person.name}, I am ${person.age} years old and I live in "${person.city}".`;
console.log(sentence);

document.writeln(sentence);

let numbers = prompt("Enter numbers separated by commas:");
let numbersArray = numbers.split(",").map(Number);
console.log(numbersArray);

document.writeln("You entered the numbers: " + numbersArray.join(", "));


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
    console.log(`Index and Name :  ${index }, ${name}`);
});

for (let i = 0; i < names.length; i++) {
    console.log(`Index and Name :  ${i}, ${names[i]}`);
}

for (let i = 0; i <= 10; i++) {
    if(i % 2 === 0) {
        console.log(`Even Number: ${i}`);
    }
}