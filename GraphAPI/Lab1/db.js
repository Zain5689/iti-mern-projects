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
];

const comments = [
  { id: "1", content: "Great start!", authorId: "2", postId: "1" },
];

module.exports = { users, posts, comments };
