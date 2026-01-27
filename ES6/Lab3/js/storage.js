import { url } from "./api.js";
var result = document.getElementById("result");

export async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const instructors = data.users;

  const randomIndex = Math.floor(Math.random() * instructors.length);
  const instructor = instructors[randomIndex];

  console.log(instructor);
  result.innerHTML = `
      <h3>Assigned Instructor</h3>
      <p><strong>Name:</strong> ${instructor.firstName}${instructor.lastName}</p>
      <p><strong>Email:</strong> ${instructor.email}</p>
      <p><strong>Company:</strong> ${instructor.company.name}</p>
    `;
}
