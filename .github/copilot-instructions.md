# Copilot Instructions for ITI MERN Project

## Project Overview

This is an educational training repository for MERN stack and JavaScript fundamentals. It contains structured labs and demos organized by topic progression: HTML/CSS → Vanilla JavaScript → ES6+ → Advanced JavaScript patterns. **Not a production codebase** — focus on code clarity and educational patterns.

## Directory Structure & Purpose

- **Html&Css/** — Basic markup and styling labs
- **Js/** — Vanilla JavaScript fundamentals (days 1-8, Labs 4-8)
  - Each lab folder contains `index.html` and `js/main.js`
  - Demos show patterns before labs apply them
- **ES6/** — Modern JavaScript (Classes, Proxies, Maps, Sets, Mixins)
- **advancedJs/** — Advanced patterns (closures, XHR requests, form handling)
- **Day 1 - Intro & Prompt Engineering/** — Project kickoff materials

## Code Patterns & Conventions

### File Organization

- **Single HTML file per exercise** — `index.html` with embedded or linked `js/main.js`
- **JSON data files** — Store test data (e.g., `books.json`, `Data.json`) in `js/` folder
- **CSS** — Either embedded in HTML `<style>` tags or separate `css/style.css`

### JavaScript Patterns

#### 1. **XHR/Fetch for API Calls** (Labs 1, 5)

```javascript
// XMLHttpRequest pattern (frequently used, NOT modern fetch)
function makeRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 400
        ? resolve(JSON.parse(xhr.response))
        : reject(new Error(`Status ${xhr.status}`));
    xhr.onerror = () => reject(new Error("Network Error"));
    if (data) xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data ? JSON.stringify(data) : null);
  });
}
```

Reference: [advancedJs/Lab1/js/main.js](advancedJs/Lab1/js/main.js#L1), [ES6/Lab3/js/main.js](ES6/Lab3/js/main.js#L1)

#### 2. **DOM Manipulation & Event Handling** (Labs 4-8)

- **Query elements**: `document.getElementById()`, `document.querySelector()`
- **Event listeners**: Use `addEventListener()` on individual elements or event delegation
- **Event types**: `focus`, `blur`, `submit`, `click`, `readystatechange`
- **Form validation**: Combine HTML5 attributes (`required`, `minlength`, `pattern`) with JavaScript handlers
- **Inline event handlers**: Avoid `onclick="func()"` in production; labs use inline for simplicity

Reference: [Js/Lab7_Js/js/main.js](Js/Lab7_Js/js/main.js#L1) (comprehensive form validation)

#### 3. **ES6 Classes & Mixins** (ES6/Lab1)

```javascript
// Class definition + Mixin pattern
class Course {
  constructor(name) {
    this.name = name;
  }
}
const canStart = {
  startCourse() {
    return `Course ${this.name} has started`;
  },
};
Object.assign(Course.prototype, canStart); // Attach mixin
```

#### 4. **Proxy & Immutability** (ES6/Lab1)

- Use `Proxy` handlers to intercept property changes
- Return `false` in `set` trap to prevent modification, log warning via `console.log()`

#### 5. **Collections** (ES6/Lab1)

- **Set**: For unique course objects — `new Set()`, `.add()`, `.forEach()`
- **Map**: For key-value pairs with object keys

#### 6. **Local Storage** (Js/day5)

- Store JSON strings: `localStorage.setItem("key", JSON.stringify(data))`
- Retrieve: `JSON.parse(localStorage.getItem("key"))`

### Common Bugs & Gotchas

- **XMLHttpRequest readyState**: Check `readyState == 4 && status == 200` before parsing
- **Form submission**: Use `event.preventDefault()` in submit handlers
- **Event handler scope**: `this` context differs in arrow vs regular functions
- **XHR error handling**: Network errors != HTTP errors (both need separate handlers)

## How to Add New Labs

1. Create folder: `Topic/LabN/`
2. Create: `LabN/index.html` and `LabN/js/main.js`
3. **Add comments before code** (labs include step descriptions as comments)
4. No build process — files run directly in browser (use `live-server` or similar)

## Development Workflow

- **No npm/build**: Labs are vanilla HTML/JS, run directly in browser
- **Testing**: Manual testing in browser DevTools (F12)
- **No test suites** — exercises validate via console output and DOM changes
- **Local server**: Use `live-server` or Python's `http.server` for CORS-free local requests

## Key Files for Reference

- Form validation patterns: [Js/Lab7_Js/js/main.js](Js/Lab7_Js/js/main.js)
- XHR with promises: [ES6/Lab3/js/main.js](ES6/Lab3/js/main.js)
- Data handling: [advancedJs/Lab1/js/books.json](advancedJs/Lab1/js/books.json)
- DOM/event binding: [Js/Lab7_Js/js/dom.js](Js/Lab7_Js/js/dom.js)
