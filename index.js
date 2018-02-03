const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;
const app = express();

const dogs = [
  {
    id: 1,
    type: "Corgi",
    name: "Comodore Fluffy Paws"
  },
  {
    id: 2,
    type: "miniGoldenDoodle",
    name: "Pickles"
  },
  {
    id: 3,
    type: "bostonTerrier",
    name: "charles"
  }
];

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.params);
    console.log(req.headers);
    console.log(req.body);
    next();
});



app.get("/api/dogs", (req, res, next) => {
  res.status(200).json(dogs);
});
//endpoints have methods(get, post, delete), paths (descripton), and a handler (what's gonna happen)
app.get("/api/dogs/:id", (req, res, next) => {
  const selected = dogs.filter(val => val.id === Number(req.params.id))[0];
  console.log(selected);
  if (selected) {
    res.json(selected);
  } else {
    res.status(500).json({ message: "Dog Not Found" });
  }
});

app.post('/api/dogs', (req, res, next) => {
dogs.push(req.body);
res.json(dogs);
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
