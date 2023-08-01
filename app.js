const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const { task, time } = req.body;
  const newTask = {
    name: task,
    time: time,
    id: Date.now(),
    createdAt: new Date().getTime(),
  };
  tasks.push(newTask);
  tasks.sort((a, b,c) => a.createdAt - b.createdAt);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const { taskId } = req.body;
  tasks = tasks.filter((task) => task.id !== Number(taskId));
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
