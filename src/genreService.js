import axios from "axios"

let genres = [
  { id: "aaa", name: "action" },
  { id: "ccc", name: "comedy" },
  { id: "bbb", name: "romance" },
  { id: "eee", name: "adventure" },
];

function getGenres() {
  let res = axios
  .post("http://localhost:4000/graphql", {"query": "{genres{id, name}}"})

 return res
}

export { getGenres };
