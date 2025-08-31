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
			>>Select a framework:
				-->  React
			>>Select a variant:
				--> JavaScript
			>> Done. Now run:
				-->cd my-project-react
				-->npm install
				-->npm run dev



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

Here are **clear notes on Component Styling in React** 👇

---

## 📌 Ways to Style Components in React :
------------------------------------------

### **1. Inline Styling**

* Styles written directly in the JSX element.
* Uses a JavaScript object (`{}`) with camelCase properties.

```jsx
function App() {
  return (
    <h1 style={{ color: "blue", fontSize: "24px" }}>Hello React</h1>
  );
}
```

✅ Good for quick styles.
❌ Not reusable, messy for large apps.

---

### **2. CSS Stylesheets**

* Create a `.css` file and import it into the component.

```css
/* App.css */
.title {
  color: green;
  font-size: 24px;
}
```

```jsx
import "./App.css";

function App() {
  return <h1 className="title">Hello React</h1>;
}
```

✅ Clean, reusable, familiar.
❌ Class names may conflict in large projects.

---

### **3. CSS Modules**

* A safer way where styles are scoped to the component (no global conflicts).
* File name: `Component.module.css`

```css
/* App.module.css */
.title {
  color: red;
  font-size: 24px;
}
```

```jsx
import styles from "./App.module.css";

function App() {
  return <h1 className={styles.title}>Hello React</h1>;
}
```

✅ Avoids name conflicts.
✅ Good for medium/large apps.

---

### **4. Styled Components (CSS-in-JS)**

* Uses `styled-components` library.
* Write CSS inside JS and attach it to a component.

```bash
npm install styled-components
```

```jsx
import styled from "styled-components";

const Title = styled.h1`
  color: purple;
  font-size: 24px;
`;

function App() {
  return <Title>Hello React</Title>;
}
```

✅ Scoped styles, dynamic (can pass props).
❌ Adds dependency, bigger bundle size.

---

### **5. Tailwind CSS (Utility-First CSS Framework)**

* Install Tailwind and use class utilities directly in JSX.

```jsx
function App() {
  return <h1 className="text-blue-500 text-2xl">Hello React</h1>;
}
```

✅ Very fast, highly customizable.
❌ Classes can look messy at first.

---

### **6. Dynamic Styling with Props / State**

* Style changes based on state or props.

```jsx
function Button({ primary }) {
  return (
    <button style={{ backgroundColor: primary ? "blue" : "gray" }}>
      Click Me
    </button>
  );
}
```

---

## ⚡ **Best Practices**

* Use **CSS Modules** or **Tailwind** for scalable projects.
* Keep **inline styles** only for dynamic or small cases.
* For **design systems**, consider `styled-components` or `emotion`.
* Maintain **consistent theme/colors** across components.


## 📌 Props in ReactJS :
------------------------------------------

# 📘 Props in ReactJS

## 🔹 What are Props?

* **Props** (short for *properties*) are used to pass data from a **parent component** to a **child component**.
* Props make components **reusable**.
* Props are **read-only (immutable)** → child components cannot modify them directly.
* They work like **function parameters**.

---

## 🔹 Key Characteristics

1. **Unidirectional Flow** → Props always flow **from parent to child**.
2. **Immutable** → Props cannot be changed by the child component.
3. **Reusable** → You can use the same component with different props.
4. **Type** → Props can be **strings, numbers, booleans, arrays, objects, or functions**.

---

## 🔹 Ways to Use Props

1. **Passing Props**

   * Pass values as attributes in the parent component.
2. **Receiving Props**

   * Access using `props.propertyName` inside the child.
   * Or use **destructuring** for cleaner code.
3. **Default Props**

   * Define fallback values if no prop is passed.
4. **Children Prop**

   * Special `children` prop allows passing JSX content inside a component.
5. **Functions as Props**

   * You can pass functions to child components for handling events.
6. **Spread Operator**

   * You can pass an object as props using `{...objectName}`.

---

## 🔹 Best Practices

* Use **destructuring** in function parameters for cleaner code.
* Define **defaultProps** for safety.
* Pass only **necessary props** (avoid over-passing).
* For larger apps, consider **PropTypes** or **TypeScript** for type-checking.

---

# 📘 Example: Props in React

```jsx
//Child Component
import React from "react";

const Child = (props) => {
  console.log(props);
  console.log(props.children);

  let parentName = props.name;

  return (
    <div>
      <p>Name : {parentName} </p>
      <p>Age : {props.age} </p>
      <p>Children Prop</p>
      {props.children}
    </div>
  );
};

export default Child;

//Parent Component
import React from "react";
import Child from "./Child";

const Parent = () => {
  let parentObj = {
    name: "Sathish",
    age: 25,
  };

  let parentArray = [
    {
      name: "Sathish",
      age: 25,
    },
    {
      name: "Kumar",
      age: 30,
    },
  ];

  return (
    <div>
      <p>Parent Component</p>
      {/* <Child name={parentObj.name} age={parentObj.age} /> */}
      {/* <Child {...parentObj} /> */}
      {/* {parentArray.map((obj, index) => (
        console.log(`Index : ${index} , Obj: ${JSON.stringify(obj)}`),
        <Child key={index} {...obj} />
      ))} */}
      <Child {...parentObj}>
        <p>Name : {parentObj.name} </p>
        <p>Age : {parentObj.age} </p>
      </Child>
    </div>
  );
};

export default Parent;

```

```jsx
import React from "react";

// Child Component
function UserCard({ name, age, role = "User" }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Child Component with children
function Card({ children }) {
  return <div style={{ border: "2px solid blue", padding: "10px" }}>{children}</div>;
}

// Parent Component
function App() {
  const user = { name: "Sathish", age: 25, role: "Developer" };

  // Function as prop
  const greetUser = (name) => alert(`Hello ${name}`);

  return (
    <div>
      <h2>React Props Example</h2>

      {/* Passing props directly */}
      <UserCard name="John" age={30} role="Admin" />

      {/* Using default prop (role will be "User") */}
      <UserCard name="Alice" age={28} />

      {/* Passing props using spread operator */}
      <UserCard {...user} />

      {/* Function as prop */}
      <button onClick={() => greetUser("Sathish")}>Greet User</button>

      {/* Children prop */}
      <Card>
        <h4>Inside Card Component</h4>
        <p>This content is passed using children prop.</p>
      </Card>
    </div>
  );
}

export default App;
```



## 📌 Event Handling in ReactJS :
---------------------------------

## 🔹 What is Event Handling?

* Event handling allows us to respond to user actions like clicks, typing, submitting forms, etc.
* React events are very similar to DOM events but have some differences.

---

## 🔹 Key Points about React Events

1. **CamelCase Naming** → Events use camelCase (`onClick`, `onChange`) instead of lowercase (`onclick`).
2. **Function Reference** → You pass a function, not a string.

   ```jsx
   onClick={handleClick} ✅
   onClick="handleClick()" ❌  
   ```
3. **Synthetic Events** → React wraps native events in a cross-browser wrapper for consistency.
4. **Immutable Event Object** → Events are pooled, so don’t use them asynchronously without persisting.
5. **Prevent Default** → Use `event.preventDefault()` to stop default browser behavior (e.g., form submit reload).

---

## 🔹 Commonly Used React Events

* **Mouse Events**: `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave`.
* **Keyboard Events**: `onKeyDown`, `onKeyUp`, `onKeyPress`.
* **Form Events**: `onChange`, `onSubmit`, `onFocus`, `onBlur`.
* **Touch Events**: `onTouchStart`, `onTouchEnd`.

---

## 🔹 Passing Parameters in Event Handlers

* You can pass extra arguments to event handlers using arrow functions.

---

## 🔹 Best Practices

* Keep event handler functions **small and clear**.
* Use **arrow functions** inside components to avoid binding issues.
* Use `event.preventDefault()` and `event.stopPropagation()` when needed.
* Avoid unnecessary anonymous functions directly in JSX for performance.

---

# 📘 Example: Event Handling in React

```jsx
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  // Click event
  const handleClick = () => {
    alert("Button Clicked!");
  };

  // Change event
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Form submitted with: ${text}`);
  };

  return (
    <div>
      <h2>React Event Handling</h2>

      {/* Click Event */}
      <button onClick={handleClick}>Click Me</button>

      {/* Change + Submit Events */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>

      {/* Counter Example with Click */}
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} disabled={count <= 0}>
        Decrement
      </button>
    </div>
  );
}

export default App;
```


