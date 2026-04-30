const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { auth, adminOnly } = require('../middleware/authMiddleware');

// Create Task route
router.post('/', auth, adminOnly, async (req, res) => {
    try {
        const { title, description, dueDate, project } = req.body;
        
        const newTask = new Task({
            title,
            description,
            assignedTo: req.user.id, 
            dueDate,
            project
        });
        
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error("Task creation error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Get tasks (Admin sees all, Member sees all tasks or project specific tasks)
router.get('/my-tasks', auth, async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'Admin') {
            tasks = await Task.find({}); // Admin ko sabhi tasks dikhayega
        } else {
            // Yahan hum condition hata rahe hain taaki Member ko bhi Admin ke banaye gaye tasks show ho sakein
            tasks = await Task.find(); 
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Update Task Status route
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;