const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000)
