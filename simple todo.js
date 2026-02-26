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

function findindex(arr,id){
  for(var i=0;i<arr.length;i++){
    if (arr[i].id===id){
      return i;
    }
  }
  return -1;
}

function removeindex(arr,index){
  const newarray=[];
  for(var i=0;i<arr.length;i++){
    if(i!==index){
      newarray.push(arr[i]);
    }
  }
  return newarray;
}

app.delete("/todos/:id",(req,res)=>{
  const todoindex=findindex(todos,parseInt(req.params.id));
  if(todoindex===-1){
    res.status(404).send();
  }
  else{
    todos=removeindex(todos,todoindex);
    res.status(200).send();

  }

})
// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000)
