//  Create a Class called Course with properties: name and duration.
export class Course {
  constructor(Name, Id) {
    this.name = Name;
    this.id = Id;
  }
}

//  Create a Mixin called startCourseMixin that adds a startCourse() method.
const startCourseMixin = {
  startCourse() {
    return `Course ${this.name} has started`;
  },
};
Object.assign(Course.prototype, startCourseMixin);

//  Create a Generator to generate unique course IDs.

function* idGenerator() {
  let id = 101;
  while (true) {
    yield id++;
  }
}
const gen = idGenerator();

//  Use a Set to store all created courses (no duplicates).
const coursesSet = new Set();
coursesSet.add(new Course("Math", gen.next().value));
coursesSet.add(new Course("Physics", gen.next().value));
coursesSet.add(new Course("Chemistry", gen.next().value));
coursesSet.add(new Course("Biology", gen.next().value));

// Use a Map to map each course to its instructor.
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

//  Use a Proxy to prevent changing the course name after creation and validate that duration is
// positive.
const courseHandler = {
  set(Course, prop, value) {
    if (prop === "name") {
      console.log("You are not allowed to change the course name");
      return true;
    } else {
      return false;
    }
  },
};
const proxy = new Proxy(Course, courseHandler);

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
console.log(coursesSet);

console.log("=================================");

// Print instructor name using the Map
for (let [course, instructor] of courseInstructorMap) {
  console.log(`Course: ${course.name}, Instructor: ${instructor}`);
}
