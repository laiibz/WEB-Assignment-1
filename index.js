const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;

// POST /addTask
app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).json({ error: 'taskName is required' });
    }
    const task = { id: currentId++, taskName };
    tasks.push(task);
    res.status(201).json(task);
});

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE /task/:id
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: `Task ${taskId} deleted` });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
