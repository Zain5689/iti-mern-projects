// Step 1 — Create a Class
// Create a class called Course.
// The class should have:- A constructor that takes name- A property called name

class Course {
  constructor(name) {
    this.name = name;
  }
}

// Step 2 — Create a Mixin
// Create a mixin object called canStart that contains a method startCourse().
// This method should print:
// "Course [course name] has started"
// Then, attach this mixin to the Course class.

const canStart = {
  startCourse() {
    return `Course ${this.name} has started`;
  },
};
Object.assign(Course.prototype, canStart);

// Step 4 — Store Courses in a Set
// Create a Set called coursesSet.
// Add at least 3 courses to this set.
const coursesSet = new Set();
coursesSet.add(new Course("Math"));
coursesSet.add(new Course("Physics"));
coursesSet.add(new Course("Chemistry"));
coursesSet.add(new Course("Biology"));

// Step 3 — Use Proxy
// You must prevent changing the course name after the object is created.
// If someone tries to change name, print:
// "You are not allowed to change the course name"

const courseHandler = {
  set(coursesSet, prop, value) {
    if (prop === "name") {
      console.log("You are not allowed to change the course name");
      return true;
    } else {
      return false;
    }
  },
};
const proxy = new Proxy(coursesSet, courseHandler);

// Step 5 — Create a Map
// Create a Map called courseInstructorMap.
// Store:- key → course object- value → instructor name
// Add instructors for the 3 courses.

const courseInstructorMap = new Map();
for (let course of coursesSet) {
  let instructorName = "";
  switch (course.name) {
    case "Math":
      instructorName = "Dr. Smith";
      break;
    case "Physics":
      instructorName = "Prof. Johnson";
      break;
    case "Chemistry":
      instructorName = "Dr. Brown";
      break;
    case "Biology":
      instructorName = "Dr. Davis";
      break;
    default:
      instructorName = "TBA";
  }
  courseInstructorMap.set(course, instructorName);
}

// Test Your Code
// 1) Start a course using startCourse()

var course = new Course("History");
console.log(course.startCourse());
console.log("=================================");

// Try to change the course name (should be blocked)
proxy.name = "New History";
console.log(proxy.name);
console.log("=================================");

//  Print all courses from the Set
for (let course of coursesSet) {
  console.log(`Course Name: ${course.name}`);
}
console.log("=================================");

// Print instructor name using the Map
for (let [course, instructor] of courseInstructorMap) {
  console.log(`Course: ${course.name}, Instructor: ${instructor}`);
}
