const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, adminOnly } = require('../middleware/authMiddleware');

router.post('/create', auth, adminOnly, async (req, res) => {
    try {
        const { name, members } = req.body;
        const newProject = new Project({
            name,
            members,
            createdBy: req.user.id
        });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;