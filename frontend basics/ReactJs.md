******************************************************************************************************
					ReactJs Notes by CH Sathish Kumar
******************************************************************************************************

ReactJs Ussages :
-------------------
1. Go to Node WebSite Download and Install (https://nodejs.org/en/download)
	Current LTS (22.18.0) AND NPM (10.9.3)
	>>> node -v
	>>> npm -v
2. Install React App -- Create one Folder open CMD
	>>> npm create vite@latest my-project-react
		>> Select a framework:
			-->  React
		>>Select a variant:
			--> JavaScript
	>>> Done. Now run:
	  >>> cd my-project-react
	  >>> npm install
	  >>> npm run dev



## 📌 What is ReactJs Introduction :
-------------------------------------
1. ReactJS is a JavaScript library for building user interfaces.
2. Developed and maintained by Facebook (Meta).
3. Based on component-based architecture.
4. Uses Virtual DOM for fast UI updates.

## 📌 Project Structure :
-------------------------
src/ → All React code.
main.jsx → Entry file.
App.jsx → Root component.
index.css → Global styles.

1. JSX allows us to write HTML inside JavaScript, making React UI development easier and cleaner.
2. A **.js file** contains standard JavaScript code, while a **.jsx file** allows writing JavaScript with JSX syntax (HTML-like elements inside JavaScript).


## 📌 Components in React :
-----------------------------

### 🔹 What are Components?

* Components are **independent, reusable pieces of UI** in React.
* Each component can have its own **logic, data (state), and UI**.
* React apps are built by combining multiple components.


### 🔹 Types of Components

#### 1. **Functional Components**

* A **JavaScript function** that returns JSX.
* **Stateless (earlier)** but now can use **Hooks** (`useState`, `useEffect`, etc.) for state and lifecycle.
* **Simpler, preferred** way in modern React.

✅ Example:

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

Or with Arrow Function:

```jsx
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;
```

---

#### 2. **Class Components**

* ES6 **class-based components** that extend `React.Component`.
* Can use **state** and **lifecycle methods** directly.
* Heavier than functional components, less common in modern React.

✅ Example:

```jsx
import React, { Component } from "react";

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

---

### 🔹 Key Differences

| Feature              | Functional Component                     | Class Component                          |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| Syntax               | JavaScript function / arrow function     | ES6 Class extending `React.Component`    |
| State Management     | With **Hooks** (`useState`, `useEffect`) | With `this.state` & `this.setState`      |
| Lifecycle Methods    | Achieved using Hooks                     | Uses methods (`componentDidMount`, etc.) |
| Performance          | Lighter, faster                          | Slightly heavier                         |
| Usage (Modern React) | ✅ Preferred                              | 🚫 Less common, legacy support           |

---

✅ **Conclusion**: Use **Functional Components** with **Hooks** in modern React, while Class Components are mainly seen in older codebases.


## 📌 Exports and Imports in React :
------------------------------------

### **1. What are Exports and Imports?**

* In React (and modern JavaScript), **modules** let you split code into separate files for better readability and reusability.
* **Export** → makes functions, variables, components, or objects available for use in other files.
* **Import** → brings those exported items into another file.

---

### **2. Types of Exports**

#### a) **Named Export**

* You can export multiple items from the same file.
* Must use the same name while importing (unless using `as` for aliasing).

```jsx
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

Importing:

```jsx
import { add, subtract } from './utils';
console.log(add(2,3)); // 5
```

Alias:

```jsx
import { add as sum } from './utils';
console.log(sum(2,3)); // 5
```

---

#### b) **Default Export**

* Only one default export per file.
* Can import with any name.

```jsx
// Button.jsx
export default function Button() {
  return <button>Click Me</button>;
}
```

Importing:

```jsx
import MyButton from './Button';  // name can be anything
```

---

### **3. Mixing Default and Named Exports**

```jsx
// math.js
export const multiply = (a, b) => a * b;
export default function divide(a, b) { return a / b; }
```

Importing:

```jsx
import divide, { multiply } from './math';
console.log(divide(10,2)); // 5
console.log(multiply(2,3)); // 6
```

---

### **4. Exporting All from Another File (Re-exports)**

```jsx
// index.js
export * from './math';
export { default as divide } from './math';
```

---

### **5. React Component Example**

```jsx
// Header.jsx
export default function Header() {
  return <h1>Hello, React!</h1>;
}
```

```jsx
// App.jsx
import Header from './Header';

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
export default App;
```

---

✅ **Best Practices:**

* Use **default export** when the file exports only one main thing (like a React component).
* Use **named exports** when exporting multiple utilities or constants.
* Keep import paths relative and consistent.