const users = [
  { id: "1", name: "Sara", email: "sara@iti.com" },
  { id: "2", name: "Ahmed", email: "ahmed@iti.com" },
];

const posts = [
  {
    id: "1",
    title: "GraphQL intro",
    content: "GQL is a query language",
    authorId: "1",
  },
  {
    id: "102",
    title: "React Tips",
    content: "Use functional components",
    authorId: "1",
  },
];

const comments = [
  { id: "501", text: "Great post!", authorId: "2", postId: "101" },
  { id: "502", text: "Thanks!", authorId: "1", postId: "101" },
];

module.exports = { users, posts, comments };
